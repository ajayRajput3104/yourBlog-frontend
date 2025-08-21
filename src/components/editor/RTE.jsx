import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import env from "../../utils/env";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={env.tinymceApiKey}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: #e5e7eb; }",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
