"use client";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/2646392-hd_1920_1080_30fps.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl px-6 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn leading-tight">
          VerseVault
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fadeIn delay-200">
          Discover, Share, and Engage with Inspiring Blogs.
        </p>
        <button
          className="btn glass px-6 py-3 text-lg font-semibold hover:scale-105 transition-transform"
          onClick={() => (window.location.href = "/blogs")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
