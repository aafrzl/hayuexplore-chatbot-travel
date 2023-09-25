"use client";

export default function TypingAnimation() {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-orange-600"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-orange-600 delay-75"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-orange-600 delay-150"></div>
    </div>
  );
}
