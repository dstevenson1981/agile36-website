'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function UnsubscribePage() {
  const params = useParams();
  const router = useRouter();
  const token = typeof params.token === 'string' ? params.token : '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [formError, setFormError] = useState('');
  const ranToken = useRef(false);

  useEffect(() => {
    if (!token || ranToken.current) return;
    ranToken.current = true;

    const run = async () => {
      try {
        const response = await fetch('/api/email/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.success) {
          setEmail(data.email || '');
          setStatus('success');
          return;
        }
        setStatus('error');
      } catch (error) {
        console.error('Error unsubscribing:', error);
        setStatus('error');
      }
    };

    void run();
  }, [token]);

  const handleManualUnsubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = manualEmail.trim();

    if (!emailInput || !emailInput.includes('@')) {
      setFormError('Enter the email address we send to.');
      return;
    }

    setFormError('');
    setStatus('loading');
    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });
      const data = await response.json();
      if (data.success) {
        setEmail(data.email || emailInput);
        setStatus('success');
        return;
      }
      setStatus('error');
      setFormError(data.error || 'Could not unsubscribe. Try again.');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStatus('error');
      setFormError('Could not unsubscribe. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribe</h1>
          <p className="text-gray-600">Manage your email preferences</p>
        </div>

        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your request...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">You are unsubscribed</h2>
            {email && (
              <p className="text-gray-600 mb-4">
                {email} will not get marketing email from Agile36.
              </p>
            )}
            <p className="text-sm text-gray-500 mb-6">
              If you change your mind, email us and we can add you back.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Return to Home
            </button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="text-center py-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Enter your email to unsubscribe
              </h2>
              <p className="text-gray-600 mb-6">
                We could not match that link. Type the address we send to and we will take you off the list.
              </p>
            </div>

            <form onSubmit={handleManualUnsubscribe} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {formError ? (
                <p className="text-sm text-red-600">{formError}</p>
              ) : null}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Unsubscribe
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
