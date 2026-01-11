import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_API_KEY = 'd5caac85-4135-480c-8aa7-6314d9ea4808';
const INDEXNOW_KEY_FILE = 'd5caac85-4135-480c-8aa7-6314d9ea4808.txt';
const INDEXNOW_API_URL = 'https://api.indexnow.org/indexnow';
const HOST = 'learn.agile36.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY_FILE}`;

// Sitemap URLs to fetch for learn.agile36.com
const SITEMAP_URLS = [
  'https://learn.agile36.com/sitemap.xml',
];

/**
 * Parse XML sitemap and extract all <loc> URLs
 */
function extractUrlsFromSitemap(xml: string): string[] {
  const urls: string[] = [];
  // Match all <loc>...</loc> tags
  const locRegex = /<loc>(.*?)<\/loc>/gi;
  let match;
  
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (url) {
      urls.push(url);
    }
  }
  
  return urls;
}

/**
 * Fetch and parse a sitemap URL
 */
async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  try {
    console.log(`Fetching sitemap: ${sitemapUrl}`);
    const response = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IndexNowBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const urls = extractUrlsFromSitemap(xml);
    console.log(`Extracted ${urls.length} URLs from ${sitemapUrl}`);
    return urls;
  } catch (error) {
    console.error(`Error fetching sitemap ${sitemapUrl}:`, error);
    throw error;
  }
}

/**
 * Submit URLs to IndexNow API
 */
async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; message: string; batchResults?: any[] }> {
  // IndexNow supports up to 10,000 URLs per request
  const BATCH_SIZE = 10000;
  const batches: string[][] = [];
  
  // Split URLs into batches if needed
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  const results = [];
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const payload = {
      host: HOST,
      key: INDEXNOW_API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };

    try {
      console.log(`Submitting batch ${i + 1}/${batches.length} with ${batch.length} URLs to IndexNow...`);
      console.log(`Payload:`, JSON.stringify(payload, null, 2));
      
      const response = await fetch(INDEXNOW_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text().catch(() => '');
      console.log(`IndexNow response status: ${response.status}`);
      console.log(`IndexNow response body: ${responseText}`);

      if (response.ok || response.status === 202) {
        // 200 OK or 202 Accepted are both success
        results.push({
          batch: i + 1,
          success: true,
          status: response.status,
          urlCount: batch.length,
          response: responseText || 'Success',
        });
        console.log(`Batch ${i + 1} submitted successfully (${response.status})`);
      } else {
        results.push({
          batch: i + 1,
          success: false,
          status: response.status,
          error: responseText || 'Unknown error',
          urlCount: batch.length,
        });
        console.error(`Batch ${i + 1} failed: ${response.status} - ${responseText}`);
      }
    } catch (error: any) {
      results.push({
        batch: i + 1,
        success: false,
        error: error?.message || 'Unknown error',
        urlCount: batch.length,
      });
      console.error(`Error submitting batch ${i + 1}:`, error);
    }
  }

  const successCount = results.filter(r => r.success).length;
  const totalBatches = batches.length;
  
  if (successCount === totalBatches) {
    return {
      success: true,
      message: `Successfully submitted ${urls.length} URLs in ${totalBatches} batch(es)`,
      batchResults: results,
    };
  } else {
    return {
      success: false,
      message: `Partially successful: ${successCount}/${totalBatches} batches succeeded`,
      batchResults: results,
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Starting IndexNow submission process for learn.agile36.com...');
    
    // Fetch all sitemaps
    const allUrls: string[] = [];
    const sitemapResults = [];

    for (const sitemapUrl of SITEMAP_URLS) {
      try {
        const urls = await fetchSitemapUrls(sitemapUrl);
        allUrls.push(...urls);
        sitemapResults.push({
          sitemap: sitemapUrl,
          success: true,
          urlCount: urls.length,
        });
      } catch (error: any) {
        sitemapResults.push({
          sitemap: sitemapUrl,
          success: false,
          error: error?.message || 'Unknown error',
          urlCount: 0,
        });
      }
    }

    // Remove duplicates
    const uniqueUrls = Array.from(new Set(allUrls));
    console.log(`Total unique URLs found: ${uniqueUrls.length}`);

    // Filter URLs to only include those from the specified host (learn.agile36.com)
    // IndexNow requires all URLs to belong to the host specified in the request
    const filteredUrls = uniqueUrls.filter(url => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname === HOST;
      } catch {
        return false;
      }
    });

    console.log(`Filtered URLs for ${HOST}: ${filteredUrls.length} (removed ${uniqueUrls.length - filteredUrls.length} from other domains)`);

    if (filteredUrls.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No URLs found for the specified host',
          stats: {
            totalUrlsFound: uniqueUrls.length,
            filteredUrls: filteredUrls.length,
            sitemapsProcessed: sitemapResults.length,
            sitemapResults,
          },
        },
        { status: 400 }
      );
    }

    // Submit to IndexNow
    const submissionResult = await submitToIndexNow(filteredUrls);

    return NextResponse.json({
      success: submissionResult.success,
      message: submissionResult.message,
      stats: {
        totalUrlsFound: uniqueUrls.length,
        filteredUrls: filteredUrls.length,
        submittedUrls: filteredUrls.length,
        sitemapsProcessed: sitemapResults.length,
        sitemapResults,
      },
      batchResults: submissionResult.batchResults,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit to IndexNow',
        error: error?.message || 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
















