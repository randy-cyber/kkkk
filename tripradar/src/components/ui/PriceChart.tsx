import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PricePoint } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

interface PriceChartProps {
  data: PricePoint[]
  height?: number
  showAxis?: boolean
  /** show the dashed forecast line for predicted values */
  showForecast?: boolean
}

interface TooltipEntry {
  value?: number
  dataKey?: string | number
}
interface ChartTooltipProps {
  active?: boolean
  label?: string | number
  payload?: TooltipEntry[]
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const price = payload[0]?.value ?? 0
  const predicted = payload.find((p) => p.dataKey === 'predicted')?.value
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs shadow-2xl">
      <p className="mb-1 font-semibold text-slate-200">{label}</p>
      <p className="tabular-nums text-brand-300">{formatPrice(price)}</p>
      {predicted ? (
        <p className="tabular-nums text-grape-400">forecast {formatPrice(predicted)}</p>
      ) : null}
    </div>
  )
}

export function PriceChart({
  data,
  height = 220,
  showAxis = true,
  showForecast = true,
}: PriceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: showAxis ? 0 : 8, bottom: 0 }}>
        <defs>
          <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
        {showAxis && (
          <XAxis
            dataKey="t"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'rgba(226,232,240,0.5)', fontSize: 11 }}
            dy={6}
          />
        )}
        {showAxis && (
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            tick={{ fill: 'rgba(226,232,240,0.5)', fontSize: 11 }}
            tickFormatter={(v) => `$${v}`}
          />
        )}
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.18)' }} />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#22d3ee"
          strokeWidth={2.5}
          fill="url(#priceFill)"
          dot={false}
          activeDot={{ r: 4, fill: '#67e8f9', stroke: '#06070d', strokeWidth: 2 }}
        />
        {showForecast && (
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#c084fc"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            connectNulls
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}

/** Compact inline sparkline (no axes) for cards. */
export function Sparkline({ data, height = 44 }: { data: PricePoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke="#22d3ee"
          strokeWidth={2}
          fill="url(#sparkFill)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
