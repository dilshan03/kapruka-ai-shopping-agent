export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}>
      <div
        className={`max-w-2xl rounded-[24px] px-6 py-4 text-sm leading-6 shadow-sm ${isUser
            ? "bg-[#C91508] text-white rounded-tr-md"
            : "bg-white text-gray-800 border border-red-50 rounded-tl-md"
          }`}
      >
        {content}
      </div>
    </div>
  );
}