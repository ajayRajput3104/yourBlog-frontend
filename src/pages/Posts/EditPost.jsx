import { useEffect, useState } from "react";
import {PostForm } from "../../components";
import postService from "../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postService.getPostBySlug(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
