export default function StackedProgressBar({ total, totalLabel, segments = [] }) {
  const sumValues = segments.reduce((acc, seg) => acc + seg.value, 0);

  return (
    <div className="flex flex-col justify-center w-full my-auto">
      {/* Top Metric */}
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-[15px] font-bold text-[#0F172A]">{total}</span>
        <span className="text-xs text-slate-600 font-medium">{totalLabel}</span>
      </div>

      {/* Horizontal Multi-Segment Rounded Stacked Bar */}
      <div className="w-full h-3.5 rounded-full bg-slate-200 overflow-hidden flex">
        {sumValues > 0 ? (
          segments.map((seg) => {
            if (seg.value <= 0) return null;
            const widthPercent = (seg.value / sumValues) * 100;
            return (
              <div
                key={seg.label}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: seg.color,
                }}
                title={`${seg.label}: ${seg.value}`}
                className="h-full transition-all duration-500"
              />
            );
          })
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
      </div>

      {/* Bottom 2x2 Legend Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs text-slate-700">
            <span
              className="w-2.5 h-2.5 rounded-[2px] shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="font-medium truncate">
              {seg.label} ({seg.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
