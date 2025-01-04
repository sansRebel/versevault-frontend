export default function AboutPage() {
    return (
      <div className="min-h-screen bg-base-100">
        <section className="py-16 px-4 lg:px-24">
          {/* Introduction Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">About VerseVault</h1>
            <p className="text-lg text-gray-600">
              VerseVault is a platform for sharing, discovering, and exploring blogs that spark
              inspiration and creativity. Join a community of thinkers, writers, and creators.
            </p>
          </div>
  
          {/* Features Section */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-base-200 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">Share Your Thoughts</h2>
              <p>
                Publish your blogs and share your thoughts with the world. VerseVault gives you
                a voice.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">Explore Inspiring Content</h2>
              <p>
                Discover blogs on topics you love. From tech to travel, VerseVault has something
                for everyone.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">Connect with Creators</h2>
              <p>
                Engage with a community of like-minded individuals. Like, comment, and share your
                favorite blogs.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
  