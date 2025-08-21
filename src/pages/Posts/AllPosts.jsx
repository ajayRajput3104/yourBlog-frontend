import { useState, useEffect } from "react";
import postService from "../../services/PostService";
import { PostCard } from "../../components";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        const result = await postService.getPostAll();
        if (isMounted) {
          if (Array.isArray(result)) {
            setPosts(result);
          }
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

   if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-950 text-gray-300">
        <Loader2 className="animate-spin w-10 h-10 text-purple-400" />
        <p className="mt-4 text-gray-400">Fetching posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-950">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-200">
          No posts yet
        </h1>
        <p className="mt-2 text-gray-400">Start the journey by sharing your first story.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-16 bg-gray-950 min-h-screen">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Explore All Posts
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
