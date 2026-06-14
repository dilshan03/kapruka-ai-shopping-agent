export default function LoadingState() {
  return (
    <div className="space-y-5">
      <div className="inline-flex items-center gap-2 bg-white border border-red-100 text-[#C91508] rounded-full px-5 py-3 text-sm shadow-sm">
        <span className="animate-pulse">●●●</span>
        Finding the perfect gifts for you...
      </div>

      <div className="flex gap-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="w-[260px] h-[400px] rounded-[28px] bg-white border border-red-50 shadow-lg p-4 animate-pulse"
          >
            <div className="h-[170px] bg-gray-100 rounded-2xl" />
            <div className="h-4 bg-gray-100 rounded mt-5 w-3/4" />
            <div className="h-3 bg-gray-100 rounded mt-3 w-1/2" />
            <div className="h-3 bg-gray-100 rounded mt-8 w-full" />
            <div className="h-3 bg-gray-100 rounded mt-2 w-2/3" />
            <div className="h-8 bg-gray-100 rounded mt-10 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}