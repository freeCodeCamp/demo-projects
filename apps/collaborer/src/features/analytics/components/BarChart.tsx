import './bar-chart.css';

export type BarChartDatum = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartDatum[];
  ariaLabel: string;
};

const CHART_WIDTH = 560;
const CHART_HEIGHT = 220;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 32;
const BAR_GAP = 24;
const MIN_BAR_HEIGHT = 2;

// A single hue for every bar, not a categorical palette — each bar is
// already identified by its x-axis label, so color isn't doing identity
// work here. That sidesteps needing a colorblind-safety palette check
// entirely (a single hue is trivially safe) — see the dataviz skill.
export function BarChart({ data, ariaLabel }: BarChartProps) {
  const maxValue = Math.max(1, ...data.map(datum => datum.value));
  const plotHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const barWidth = (CHART_WIDTH - BAR_GAP * (data.length + 1)) / data.length;

  return (
    <div className='bar-chart'>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role='img'
        aria-label={ariaLabel}
        className='bar-chart-svg'
      >
        <line
          x1={0}
          y1={CHART_HEIGHT - PADDING_BOTTOM}
          x2={CHART_WIDTH}
          y2={CHART_HEIGHT - PADDING_BOTTOM}
          className='bar-chart-baseline'
        />

        {data.map((datum, index) => {
          const barHeight = Math.max(
            (datum.value / maxValue) * plotHeight,
            MIN_BAR_HEIGHT
          );
          const x = BAR_GAP + index * (barWidth + BAR_GAP);
          const y = CHART_HEIGHT - PADDING_BOTTOM - barHeight;

          return (
            <g key={datum.label} className='bar-chart-bar' tabIndex={0}>
              <title>{`${datum.label}: ${datum.value}`}</title>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                className='bar-chart-fill'
              />
              <text
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor='middle'
                className='bar-chart-value'
              >
                {datum.value}
              </text>
              <text
                x={x + barWidth / 2}
                y={CHART_HEIGHT - PADDING_BOTTOM + 18}
                textAnchor='middle'
                className='bar-chart-label'
              >
                {datum.label}
              </text>
            </g>
          );
        })}
      </svg>

      <table className='bar-chart-table'>
        <caption className='sr-only'>Exact counts</caption>
        <thead>
          <tr>
            <th scope='col'>Category</th>
            <th scope='col'>Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(datum => (
            <tr key={datum.label}>
              <td>{datum.label}</td>
              <td>{datum.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
