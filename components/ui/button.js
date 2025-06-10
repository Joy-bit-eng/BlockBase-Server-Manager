// components/ui/button.js
export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl px-4 py-2 font-semibold text-white shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
