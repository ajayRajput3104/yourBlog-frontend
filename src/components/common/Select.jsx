import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-gray-800 text-gray-100 
          border border-gray-700 placeholder-gray-400 
          outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
          w-full transition duration-200 ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-gray-800 text-gray-100"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
