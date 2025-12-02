"use client";

import { useEffect, useState } from "react";

interface CouponDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponCode: string;
}

export default function CouponDisplayModal({
  isOpen,
  onClose,
  couponCode,
}: CouponDisplayModalProps) {
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg mb-4">
              <span className="text-sm font-medium">YEAR END MEGA SALE</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Coupon Code
            </h2>
            <p className="text-gray-600 text-sm">
              Use this code at checkout to get $100 OFF
            </p>
          </div>

          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
            <div className="text-4xl font-bold text-red-600 mb-2 tracking-wider">
              {couponCode}
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Code
                </>
              )}
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Expires in:</span>{" "}
              <span className="text-red-600 font-bold text-lg">
                {formatTime(timeRemaining)}
              </span>
            </p>
            <p className="text-xs text-gray-600">
              This code is valid for 30 minutes from now
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

