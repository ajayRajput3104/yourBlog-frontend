import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../../services/PostService";
import fileService from "../../services/FileService";
import { Button } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowUp, Calendar, User, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthor = post && user ? post?.author._id === user?.id : false;

  useEffect(() => {
    if (slug) {
      postService.getPostBySlug(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    const fileId = post?.featuredImage?.id;
    postService
      .deletePost(post._id)
      .then((success) => {
        if (success) {
          fileService.deleteFile(fileId);
          navigate("/all-posts");
        }
      })
      .catch((err) => {
        console.error("Error deleting post:", err.message);
      });
  };

  return post ? (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto gap-10 px-6">
        {/* Left Sidebar (Image + Meta) */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className=" bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Featured Image */}
            <Link
              to={`/image/${encodeURIComponent(
                post.featuredImage.id.split("/").pop()
              )}`}
              state={{ post }}
              className="md:w-1/2 w-full group flex items-center justify-center bg-gray-950"
            >
              <div className="w-full h-80 bg-gray-900 flex items-center justify-center rounded-xl overflow-hidden shadow-lg relative">
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Meta Info (Right) */}
            <div className="p-6 md:w-1/2 w-full flex flex-col">
              <div className="flex-grow">
                <h1
                  className="text-2xl font-extrabold text-gray-100 leading-snug truncate cursor-pointer"
                  title={post.title}
                >
                  {/* {post.title.split(" ").slice(0, 10).join(" ")}
                  {post.title.split(" ").length > 10 && " ..."} */}
                  {[post.title]}
                </h1>
              </div>
                {/* Author +Date +meta */}
                <div className="mt-auto flex flex-col gap-2 text-gray-400 text-sm">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    {post?.author?.username || "Unknown Author"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  {/*Votes */}
                  <span className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-green-400" />
                    {post?.meta?.votes ?? 0} vote
                  </span>
                  {/*FAVOURITES(LIKES) */}
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    {post?.meta?.favs ?? 0} like
                  </span>
                </div>

              {/* Edit/Delete */}
              {isAuthor && (
                <div className="flex gap-3 pt-6 border-t border-gray-800 mt-6">
                  <Link to={`/edit-post/${post.slug}`}>
                    <Button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full px-4 py-2 shadow-md transition">
                      ✏️ Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={deletePost}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white rounded-full px-4 py-2 shadow-md transition"
                  >
                    🗑 Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Column (Content) */}
        <motion.div
          className="mt-6 col-span-2 prose prose-invert prose-lg max-w-none leading-relaxed text-gray-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {typeof post.content === "string" ? (
            parse(post.content)
          ) : (
            <p>Invalid Content</p>
          )}
        </motion.div>
      </div>
    </div>
  ) : null;
}
