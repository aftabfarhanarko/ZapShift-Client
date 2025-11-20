import { useState, useEffect } from "react";

const Loding = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000); // 2000ms = 2 seconds

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, []);
  if (!showLoading) return null;

  return (
    <div className=" min-h-screen items-center flex justify-center">
      <div className="flex flex-col items-center justify-center py-6">
        {/* Spinner */}
        <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>

        {/* Loading text with bouncing dots */}
        <div className="text-lg font-semibold text-gray-700 flex gap-1 mt-2">
          <span>Loading</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </div>
      </div>
    </div>
  );
};

export default Loding;
