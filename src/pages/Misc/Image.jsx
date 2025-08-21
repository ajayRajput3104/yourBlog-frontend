import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Minus, RotateCcw, ArrowLeft } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ImageView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;

  if (!post?.featuredImage) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No image data available
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-gray-950 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Image with Zoom + Controls */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        centerOnInit
        wheel={{ step: 0.2 }} // makes touchpad scroll zoom smoother & stronger
        doubleClick={{ disabled: true }} // disable accidental dbl-click zoom
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-3 z-50">
              <button
                onClick={() => zoomOut(0.2)} // zoom out by step 0.2
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => zoomIn(0.2)} // zoom in by step 0.2
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center items-center">
              <TransformComponent>
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg"
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
