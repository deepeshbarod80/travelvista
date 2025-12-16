function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
          alt="Travel landscape"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Journey Beyond
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Horizons
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-200">
            Dive into the world of travel with stories that transport you to far-off lands.
            Adventure awaits around every corner. It's time to explore the world!
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-10 py-4 text-lg font-semibold text-gray-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/25">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
            <button className="group flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-yellow-400">
              Explore Stories
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute left-10 top-20 h-20 w-20 animate-pulse rounded-full bg-yellow-400/20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl delay-1000"></div>
      <div className="absolute left-1/4 top-1/2 h-16 w-16 animate-pulse rounded-full bg-blue-400/20 blur-xl delay-500"></div>
    </div>
  );
}

export default Hero;
