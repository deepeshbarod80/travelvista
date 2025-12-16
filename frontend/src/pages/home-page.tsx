import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import Header from '@/layouts/header-layout';
import Footer from '@/layouts/footer-layout';
import axiosInstance from '@/helpers/axios-instance';
import { createSlug } from '@/utils/slug-generator';
import formatPostTime from '@/utils/format-post-time';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [allPostsRes, featuredRes] = await Promise.all([
          axiosInstance.get('/api/posts'),
          axiosInstance.get('/api/posts/featured'),
        ]);
        setPosts(allPostsRes.data);
        setFeaturedPosts(featuredRes.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    const slug = createSlug(post.title);
    navigate(`/details-page/${slug}/${post._id}`, { state: { post } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Discover the
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                World
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Embark on extraordinary journeys through our curated collection of travel stories.
              From hidden gems to iconic destinations, let wanderlust guide your next adventure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() =>
                  document.getElementById('featured-posts')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Start Exploring
              </button>
              <button
                onClick={() =>
                  document.getElementById('all-posts')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              >
                View All Posts <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section id="featured-posts" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Adventures
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Handpicked stories that will inspire your next journey
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="mb-4 h-64 rounded-2xl bg-gray-300 dark:bg-gray-700"></div>
                    <div className="mb-2 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <article
                  key={post._id}
                  className={`group transform cursor-pointer transition-all duration-300 hover:scale-105 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                  onClick={() => handlePostClick(post)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={post.imageLink}
                      alt={post.title}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        index === 0 ? 'h-80 lg:h-96' : 'h-64'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <h3
                        className={`mb-2 font-bold text-white ${
                          index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                        }`}
                      >
                        {post.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-200">{post.description}</p>
                      <div className="flex items-center text-sm text-gray-300">
                        <span>{post.authorName}</span>
                        <span className="mx-2">•</span>
                        <span>{formatPostTime(post.timeOfPost)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/50 py-16 backdrop-blur-sm dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Countries Explored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Travel Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">5★</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section id="all-posts" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              All Adventures
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our complete collection of travel experiences
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array(12)
                  .fill(0)
                  .map((_, index) => <PostCardSkeleton key={index} />)
              : posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Never Miss an Adventure</h2>
            <p className="mt-4 text-lg text-blue-100">
              Subscribe to get the latest travel stories and destination guides delivered to your
              inbox
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full px-6 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
