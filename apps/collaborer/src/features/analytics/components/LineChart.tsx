import './line-chart.css';

export type LineChartDatum = {
  // An ISO date string — formatted for display, but kept as the raw value so
  // the table fallback can show the exact date.
  label: string;
  value: number;
};

type LineChartProps = {
  data: LineChartDatum[];
  ariaLabel: string;
};

const CHART_WIDTH = 560;
const CHART_HEIGHT = 220;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 32;
const PADDING_X = 24;
const MARKER_RADIUS = 4;

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
}

// A single hue, thin 2px line, and >=8px-diameter markers per the dataviz
// skill's mark spec. Only a handful of points (a rolling 8-period window),
// so every point gets a marker and a native hover tooltip rather than a
// permanent value label at each point (which the skill's "selective
// labeling" guidance would flag as clutter for a chart like this).
export function LineChart({ data, ariaLabel }: LineChartProps) {
  const maxValue = Math.max(1, ...data.map(datum => datum.value));
  const plotHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const plotWidth = CHART_WIDTH - PADDING_X * 2;
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  const points = data.map((datum, index) => ({
    ...datum,
    x: PADDING_X + index * stepX,
    y: CHART_HEIGHT - PADDING_BOTTOM - (datum.value / maxValue) * plotHeight
  }));

  const pathD = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className='line-chart'>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role='img'
        aria-label={ariaLabel}
        className='line-chart-svg'
      >
        <line
          x1={PADDING_X}
          y1={CHART_HEIGHT - PADDING_BOTTOM}
          x2={CHART_WIDTH - PADDING_X}
          y2={CHART_HEIGHT - PADDING_BOTTOM}
          className='line-chart-baseline'
        />

        <path d={pathD} fill='none' className='line-chart-line' />

        {points.map(point => (
          <g key={point.label} className='line-chart-point' tabIndex={0}>
            <title>{`${formatShortDate(point.label)}: ${point.value}`}</title>
            <circle
              cx={point.x}
              cy={point.y}
              r={MARKER_RADIUS}
              className='line-chart-marker'
            />
          </g>
        ))}

        {points.map(point => (
          <text
            key={`label-${point.label}`}
            x={point.x}
            y={CHART_HEIGHT - PADDING_BOTTOM + 18}
            textAnchor='middle'
            className='line-chart-axis-label'
          >
            {formatShortDate(point.label)}
          </text>
        ))}
      </svg>

      <table className='line-chart-table'>
        <caption className='sr-only'>Exact values by period</caption>
        <thead>
          <tr>
            <th scope='col'>Period starting</th>
            <th scope='col'>Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(datum => (
            <tr key={datum.label}>
              <td>{formatShortDate(datum.label)}</td>
              <td>{datum.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
