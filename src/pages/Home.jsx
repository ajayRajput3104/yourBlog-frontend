import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import postService from "../services/PostService";
import {PostCard } from "../components";
import { motion } from "framer-motion";
import { ArrowRight, PenLine, BookOpen, Users } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      setPosts([]);
      return;
    }

    setLoading(true);

    postService
      .getPostAll()
      .then((res) => {
        if (res && Array.isArray(res)) {
          setPosts(res);
        } else {
          setPosts([]); // fallback if response is unexpected
        }
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setPosts([]); // ensure posts is always an array
      })
      .finally(() => setLoading(false));
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Share Ideas. Inspire Others.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A modern platform to write, discover, and connect with passionate
            readers. Join now and be part of a growing community of
            storytellers.
          </motion.p>
          <div className="flex gap-4 justify-center mt-10">
            <motion.button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold flex items-center shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-xl font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </div>
        </section>

        {/* Trusted Row */}
        <section className="py-10 px-6 text-center">
          <p className="text-gray-400 mb-6 uppercase tracking-wider text-sm">
            Trusted by readers worldwide
          </p>
          <div className="flex justify-center gap-12 opacity-70 flex-wrap">
            <span className="text-xl font-bold">OpenAI</span>
            <span className="text-xl font-bold">Google</span>
            <span className="text-xl font-bold">IBM</span>
            <span className="text-xl font-bold">Spotify</span>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <PenLine className="w-10 h-10 text-indigo-400" />,
              title: "Write Without Limits",
              desc: "Use our distraction-free editor to focus on ideas, not formatting.",
            },
            {
              icon: <BookOpen className="w-10 h-10 text-purple-400" />,
              title: "Discover Great Stories",
              desc: "Browse trending posts and follow topics that matter to you.",
            },
            {
              icon: <Users className="w-10 h-10 text-pink-400" />,
              title: "Connect with Readers",
              desc: "Build an audience and connect with like-minded thinkers.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="bg-slate-900/60 rounded-2xl p-8 shadow-xl border border-slate-800 hover:border-indigo-500 transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {f.icon}
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700">
          <h2 className="text-3xl font-bold mb-4">
            Start your writing journey today
          </h2>
          <p className="text-gray-200 mb-6">
            Create an account in seconds. It’s free, forever.
          </p>
          <motion.button
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Sign Up for Free
          </motion.button>
        </section>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Your Blog Hub
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Share ideas, explore posts, and connect with a growing community of
          writers & readers.
        </motion.p>
        <motion.button
          className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold flex items-center mx-auto shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get Started <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      </section>

      {/* Trusted Row */}
      <section className="py-10 px-6 text-center">
        <p className="text-gray-400 mb-6 uppercase tracking-wider text-sm">
          Trusted by readers worldwide
        </p>
        <div className="flex justify-center gap-12 opacity-70 flex-wrap">
          <span className="text-xl font-bold">OpenAI</span>
          <span className="text-xl font-bold">Google</span>
          <span className="text-xl font-bold">IBM</span>
          <span className="text-xl font-bold">Spotify</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          {
            icon: <PenLine className="w-10 h-10 text-indigo-400" />,
            title: "Write Freely",
            desc: "Express yourself with a clean editor that helps you focus on your words.",
          },
          {
            icon: <BookOpen className="w-10 h-10 text-purple-400" />,
            title: "Discover Posts",
            desc: "Explore trending topics, categories, and featured stories from the community.",
          },
          {
            icon: <Users className="w-10 h-10 text-pink-400" />,
            title: "Engage & Connect",
            desc: "Comment, like, and follow your favorite writers to stay updated.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="bg-slate-900/60 rounded-2xl p-8 shadow-xl border border-slate-800 hover:border-indigo-500 transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {f.icon}
            <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-10">
          ✨ Latest Posts
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700">
        <h2 className="text-3xl font-bold mb-4">Ready to start writing?</h2>
        <p className="text-gray-200 mb-6">
          Join now and share your first post with the world.
        </p>
        <motion.button
          className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Create Your Account
        </motion.button>
      </section>
    </div>
  );
}

export default Home;
