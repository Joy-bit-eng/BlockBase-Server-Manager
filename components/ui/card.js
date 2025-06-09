// components/ui/card.js
export default function Card({ children }) {
  return (
    <div className="p-6 bg-gray-800 rounded shadow-md">
      {children}
    </div>
  );
}
