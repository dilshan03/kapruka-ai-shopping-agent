const prompts = [
  "🎂 Birthday Gift",
  "🌹 Flowers",
  "🍫 Chocolates",
  "🎁 Anniversary",
  "🚚 Same Day Delivery",
];

export default function SuggestedPrompts({ onPromptClick }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onPromptClick(prompt)}
          className="px-4 py-2 rounded-full bg-white border border-red-100 text-xs text-[#C91508] shadow-sm hover:bg-red-50 transition whitespace-nowrap"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}