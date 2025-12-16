import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { createSlug } from '@/utils/slug-generator';
import { TestProps } from '@/types/test-props';

export default function PostCard({ post, testId = 'postcard' }: { post: Post } & TestProps) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <article
      className="group transform cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      data-testid={testId}
      onClick={() => navigate(`/details-page/${slug}/${post._id}`, { state: { post } })}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={post.imageLink}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Travel
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {post.authorName}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {formatPostTime(post.timeOfPost)}
            </div>
          </div>

          <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 3).map((category, index) => (
              <CategoryPill key={`${category}-${index}`} category={category} />
            ))}
          </div>

          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
            <span>Read more</span>
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>
      </div>
    </article>
  );
}
