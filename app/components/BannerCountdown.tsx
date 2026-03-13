"use client";

import { useState, useEffect } from "react";

/**
 * Countdown to end of today (midnight) in the user's local timezone.
 * Shows "Ends in Xh Xm" or "Ends in Xm Xs" or "Ended" after midnight.
 */
export default function BannerCountdown() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const ms = tomorrow.getTime() - now.getTime();
      if (ms <= 0) {
        setTimeLeft(null);
        setEnded(true);
        return;
      }

      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
      setEnded(false);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (ended) {
    return <span className="opacity-90">Ended</span>;
  }
  if (!timeLeft) {
    return <span className="opacity-90">Ends today</span>;
  }
  return (
    <span className="opacity-90">
      Ends today — <span className="font-bold tabular-nums">{timeLeft} left</span>
    </span>
  );
}
