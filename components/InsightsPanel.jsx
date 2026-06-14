export default function InsightsPanel({ context }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">
          Conversation Stage
        </p>

        <div className="space-y-3 text-xs">
          <StageItem active label="Recipient Identified" />
          <StageItem active label="Budget Established" />
          <StageItem active label="Delivery Location Set" />
          <StageItem label="Product Selection" />
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">
          Context Extraction
        </p>

        <div className="grid gap-3">
          <InfoCard label="Recipient" value={context.recipient} />
          <InfoCard label="Occasion" value={context.occasion} />
          <InfoCard label="Budget" value={context.budget} />
          <InfoCard label="City" value={context.city} />
          <InfoCard label="Stage" value={context.stage} />
        </div>
      </div>
    </div>
  );
}

function StageItem({ label, active }) {
  return (
    <div className="flex items-center gap-2">
      <span className={active ? "text-green-600" : "text-red-300"}>
        {active ? "●" : "○"}
      </span>
      <span className={active ? "text-gray-700" : "text-gray-400"}>
        {label}
      </span>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-[#FAF8F7] rounded-2xl p-4">
      <p className="text-[10px] uppercase text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}