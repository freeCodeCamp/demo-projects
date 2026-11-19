import './pie-chart.css';

export type PieChartSlice = {
  label: string;
  value: number;
  // A CSS color value (usually a `var(--...)` design-system token) — unlike
  // BarChart/LineChart, color here does real identity work (there are only
  // ever 2 slices, each a distinct semantic state), so it's chosen
  // deliberately per call site rather than defaulted.
  color: string;
};

type PieChartProps = {
  data: PieChartSlice[];
  // Renders as a donut instead of a solid pie — the same underlying wedges,
  // just with a center hole painted over them.
  hollow?: boolean;
  ariaLabel: string;
};

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 90;
const HOLE_RADIUS = 45;

function polarToCartesian(angleDeg: number): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER + RADIUS * Math.sin(angleRad)
  };
}

function describeWedge(startAngle: number, endAngle: number): string {
  const start = polarToCartesian(endAngle);
  const end = polarToCartesian(startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

// Exactly 2 slices per instance (per the dataviz skill, a pie/donut past 2-3
// slices becomes hard to read — this app never uses one for more than that).
export function PieChart({ data, hollow = false, ariaLabel }: PieChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  let cumulativeAngle = 0;
  const slices = data.map(slice => {
    const angle = total > 0 ? (slice.value / total) * 360 : 0;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    return {
      ...slice,
      startAngle,
      endAngle: cumulativeAngle,
      percent: total > 0 ? Math.round((slice.value / total) * 100) : 0
    };
  });

  return (
    <div className='pie-chart'>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role='img'
        aria-label={ariaLabel}
        className='pie-chart-svg'
      >
        {total === 0 ? (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            className='pie-chart-empty'
          />
        ) : (
          slices.map(slice => {
            if (slice.value === 0) return null;
            // A slice covering the full circle degenerates in the arc-path
            // formula (its start and end points coincide) — draw a plain
            // circle instead when the other slice is empty.
            if (slice.value === total) {
              return (
                <circle
                  key={slice.label}
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill={slice.color}
                >
                  <title>{`${slice.label}: ${slice.value} (100%)`}</title>
                </circle>
              );
            }
            return (
              <path
                key={slice.label}
                d={describeWedge(slice.startAngle, slice.endAngle)}
                fill={slice.color}
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percent}%)`}</title>
              </path>
            );
          })
        )}
        {hollow && (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={HOLE_RADIUS}
            className='pie-chart-hole'
          />
        )}
      </svg>

      <ul className='pie-chart-legend'>
        {slices.map(slice => (
          <li key={slice.label}>
            <span
              className='pie-chart-swatch'
              style={{ backgroundColor: slice.color }}
              aria-hidden='true'
            />
            {slice.label}: {slice.value} ({slice.percent}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
