import { Link } from "react-router-dom";

function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Link to={`/post/${post.slug}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:border-indigo-400 transition-all">
        {/* IMAGE */}
        <div className="h-48 w-full overflow-hidden">
          <img
            src={post.featuredImage?.url}
            alt={post.title}
            className="h-full w-full object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold text-white line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-gray-400">
            By{" "}
            <span className="text-indigo-400 font-medium">
              {post.author?.username || "Unknown"}
            </span>{" "}
            · {formattedDate}
          </p>

          {/* META INFO */}
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>💬 {post.comments?.length || 0}</span>
            <span>👍 {post.meta?.votes || 0}</span>
            <span>⭐ {post.meta?.favs || 0}</span>
          </div>

          {/* BUTTON */}
          <div className="pt-3">
            <span className="inline-block px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
