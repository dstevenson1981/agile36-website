import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { NextRequest } from 'next/server';

import { createAgile36McpServer } from '../../mcp/agile36-core';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,DELETE,OPTIONS',
  'access-control-allow-headers':
    'authorization,content-type,last-event-id,mcp-protocol-version,mcp-session-id,x-agile36-mcp-token',
  'access-control-expose-headers': 'mcp-session-id,mcp-protocol-version',
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return withCors(
    Response.json(body, {
      status,
      headers: {
        'cache-control': 'no-store',
      },
    }),
  );
}

function getPresentedToken(request: Request): string | null {
  const authorization = request.headers.get('authorization');
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    return authorization.slice('bearer '.length).trim();
  }

  const headerToken = request.headers.get('x-agile36-mcp-token');
  if (headerToken?.trim()) return headerToken.trim();

  const url = new URL(request.url);
  return url.searchParams.get('key') ?? url.searchParams.get('token') ?? null;
}

function authenticate(request: Request): AuthInfo | Response {
  const requiredToken = process.env.AGILE36_MCP_REMOTE_TOKEN;
  const allowUnauthenticated = process.env.AGILE36_MCP_REMOTE_ALLOW_UNAUTHENTICATED === 'true';

  if (!requiredToken && !allowUnauthenticated && process.env.NODE_ENV === 'production') {
    return jsonResponse(503, {
      error: 'Agile36 MCP remote endpoint is not enabled.',
      requiredEnv: 'AGILE36_MCP_REMOTE_TOKEN',
    });
  }

  if (!requiredToken || allowUnauthenticated) {
    return {
      token: 'unauthenticated-development',
      clientId: 'agile36-remote-development',
      scopes: ['mcp:tools'],
    };
  }

  const presentedToken = getPresentedToken(request);
  if (presentedToken !== requiredToken) {
    return withCors(
      new Response(
        JSON.stringify({
          jsonrpc: '2.0',
          error: {
            code: -32001,
            message:
              'Unauthorized. Provide AGILE36_MCP_REMOTE_TOKEN as a Bearer token, x-agile36-mcp-token header, or ?key= query parameter.',
          },
          id: null,
        }),
        {
          status: 401,
          headers: {
            'content-type': 'application/json',
            'cache-control': 'no-store',
            'www-authenticate': 'Bearer realm="agile36-mcp"',
          },
        },
      ),
    );
  }

  return {
    token: presentedToken,
    clientId: 'agile36-remote-key',
    scopes: ['mcp:tools'],
  };
}

async function handleMcp(request: NextRequest): Promise<Response> {
  const auth = authenticate(request);
  if (auth instanceof Response) return auth;

  const server = createAgile36McpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);
  const response = await transport.handleRequest(request, { authInfo: auth });
  return withCors(response);
}

export async function POST(request: NextRequest): Promise<Response> {
  return handleMcp(request);
}

export async function GET(request: NextRequest): Promise<Response> {
  return handleMcp(request);
}

export async function DELETE(request: NextRequest): Promise<Response> {
  return handleMcp(request);
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
