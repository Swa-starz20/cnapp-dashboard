export default function DonutChart({ total, totalLabel, segments = [] }) {
  const size = 128;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const sumValues = segments.reduce((acc, seg) => acc + seg.value, 0);

  const arcs = segments.reduce(
    (acc, seg) => {
      const percent = sumValues > 0 ? seg.value / sumValues : 0;
      const dashLength = percent * circumference;
      const dashOffset = -acc.cumulative * circumference;
      acc.items.push({
        ...seg,
        dashLength,
        dashOffset,
      });
      acc.cumulative += percent;
      return acc;
    },
    { cumulative: 0, items: [] }
  ).items;

  return (
    <div className="flex items-center gap-6 w-full my-auto">
      {/* Left: SVG Donut */}
      <div className="relative shrink-0 w-[124px] h-[124px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full -rotate-90"
          role="img"
          aria-label={`Donut chart showing ${total} ${totalLabel}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          {arcs.map((arc) =>
            arc.value > 0 ? (
              <circle
                key={arc.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arc.dashLength} ${circumference}`}
                strokeDashoffset={arc.dashOffset}
                className="transition-all duration-500"
              />
            ) : null
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-base font-bold text-[#0F172A] leading-tight">
            {total}
          </span>
          <span className="text-[11px] text-slate-500 font-medium leading-tight">
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Right: Legend */}
      <ul className="flex flex-col gap-2 text-xs text-slate-700 min-w-0">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-[2px] shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="truncate font-medium">
              {seg.label} ({seg.value})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
