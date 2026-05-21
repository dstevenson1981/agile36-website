"use client";

import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#1a237e] via-[#3949ab] to-[#b71c1c]"
          aria-hidden
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a237e] mb-2">
            Memorial Day Sale
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your $100 off code</h2>
          <p className="text-gray-600 text-sm mb-6">
            Apply this code at checkout on any eligible course.
          </p>

          <div className="bg-gradient-to-br from-[#e8eaf6] to-[#ffebee] border-2 border-dashed border-[#1a237e]/30 rounded-lg p-6 mb-4">
            <div className="text-4xl font-bold text-[#b71c1c] mb-2 tracking-wider" translate="no">
              {couponCode}
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#1a237e] transition-colors"
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Expires:</span>{" "}
              <time className="text-[#1a237e] font-bold" dateTime="2026-12-31">
                December 31, 2026
              </time>
            </p>
            <p className="text-xs text-gray-600">
              Memorial Day Sale — $100 off one eligible enrollment. Enter the code in the promo field at checkout.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#1a237e] to-[#b71c1c] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#283593] hover:to-[#c62828] transition-all shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
