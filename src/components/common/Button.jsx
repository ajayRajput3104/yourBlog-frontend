function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium 
        ${bgColor} ${textColor} 
        hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 
        focus:outline-none transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
