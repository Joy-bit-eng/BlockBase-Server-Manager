// components/ui/button.js
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      {children}
    </button>
  );
}
