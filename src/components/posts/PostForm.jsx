import React, { useCallback, useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.jsx";
import postService from "../../services/PostService.js";
import fileService from "../../services/FileService.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import slugify from "slugify";
import { Loader2 } from "lucide-react";

function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const submit = async (data) => {
    try {
      setLoading(true);
      setMessage(post ? "Updating post..." : "Publishing post...");
      let uploadedFile = null;
      //handle file upload if present
      if (data.featuredImage && data.featuredImage.length > 0) {
        uploadedFile = await fileService.uploadFile(data.featuredImage[0]);
        if (!uploadedFile?.url || !uploadedFile?.fileId) {
          throw new Error("File upload failed");
        }
        data.featuredImage = {
          id: uploadedFile.fileId,
          url: uploadedFile.url,
        };
      } else if (!post) {
        throw new Error("Featured image is required for a new post");
      }

      if (post) {
        if (uploadedFile) {
          await fileService.deleteFile(post.featuredImage.id);
        }
        const updatedPost = await postService.updatePost(post._id, {
          ...data,
          featuredImage: uploadedFile ? data.featuredImage : post.featuredImage,
        });
        if (updatedPost) {
          navigate(`/post/${updatedPost.slug}`);
        }
      } else {
        const newPost = await postService.createPost({
          ...data,
          userId: user?.id,
          featuredImage: data.featuredImage,
        });
        if (newPost) {
          navigate(`/post/${newPost.slug}`);
        }
      }
    } catch (error) {
      setMessage(
        "Form Submission Failed: " +
          (err.response?.data?.message || err.message)
      );
      throw new Error(
        error.response?.data?.message || "Form Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return slugify(value, {
        lower: true, // convert to lowercase
        strict: true, // remove special characters
        replacement: "-", // replace spaces and removed chars with hyphen
        trim: true, // trim leading/trailing replacement chars
      });
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && value.title) {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950 bg-opacity-90 z-50">
        <Loader2 className="animate-spin w-16 h-16 text-purple-400" />
        <p className="mt-6 text-lg text-gray-200 font-semibold">{message}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 px-4">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto text-gray-200"
      >
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Title + Slug */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">
              Post Details
            </h2>
            <Input
              label="Title"
              placeholder="Enter your post title..."
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="Auto-generated slug"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }
            />
          </div>

          {/* Content Editor */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">
              Content
            </h2>
            <RTE
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Featured Image */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">
              Featured Image
            </h2>
            <Input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className="cursor-pointer file:mr-3 file:py-1 file:px-3 
                       file:rounded-lg file:border-0 file:bg-indigo-600 
                       file:text-white hover:file:bg-indigo-500 transition"
              {...register("featuredImage", { required: !post })}
            />
            {post?.featuredImage?.url && (
              <div className="mt-4">
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  className="rounded-lg shadow-md max-h-48 object-cover w-full border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">
              Status
            </h2>
            <Select
              options={["active", "inactive"]}
              {...register("status", { required: true })}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            bgColor={
              post
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-indigo-500 to-purple-600"
            }
            className="w-full py-3 rounded-xl font-semibold 
                     hover:from-indigo-600 hover:to-purple-700 
                     transition-all duration-300 shadow-lg"
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
