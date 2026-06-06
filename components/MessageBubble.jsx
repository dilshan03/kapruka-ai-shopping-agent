export default function MessageBubble({ role, content }) {
  return (
    <div
      className={`p-3 rounded-lg max-w-xl ${
        role === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {content}
    </div>
  );
}
