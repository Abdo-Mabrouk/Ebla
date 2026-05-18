import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, BarChart2, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const mockData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 12 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 40 },
  { month: "May", value: 60 },
  { month: "Jun", value: 30 },
  { month: "Jul", value: 50 },
  { month: "Aug", value: 65 },
  { month: "Sep", value: 70 },
  { month: "Oct", value: 75 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 85 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-sky-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
        إجمالي البيانات
        <br />
        <span className="text-base">{payload[0].value} MB</span>
      </div>
    );
  }
  return null;
};

export default function DataChart() {
  const { t } = useTranslation();
  const data = [
    { day: "Mon", like: 40, dislike: 25, neutral: 15 },
    { day: "Tue", like: 25, dislike: 18, neutral: 10 },
    { day: "Wed", like: 50, dislike: 30, neutral: 20 },
    { day: "Thu", like: 55, dislike: 28, neutral: 18 },
    { day: "Fri", like: 80, dislike: 45, neutral: 25 },
    { day: "Sat", like: 60, dislike: 35, neutral: 20 },
    { day: "Sun", like: 10, dislike: 20, neutral: 30 },
  ];
  return (
    <div className="card space-y-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="size-11 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
            <BarChart2 size={18} />
          </div>
          <div className="text-xl font-medium text-[#08101C] dark:text-white">
            {t("تتبع بيانات الإحصائيات")}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-sm font-normal text-[#8794A5] dark:text-gray-400">
            {t("إجمالي البيانات")}
          </p>
          <p className="text-3xl font-medium text-[#08101C] dark:text-white text-end">
            500 MB
          </p>
          <div className="flex items-center justify-center gap-1 text-[14px] font-medium w-24 py-3 rounded-full bg-[#39AD4B1A] dark:bg-green-500/10 text-[#39AD4B] dark:text-green-400">
            4.43% <TrendingDown className="rotate-180" size={12} />
          </div>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={mockData}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v} MB`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#38BDF8"
            strokeWidth={2.5}
            fill="url(#colorValue)"
            dot={{ fill: "#38BDF8", strokeWidth: 0, r: 4 }}
            activeDot={{
              r: 6,
              fill: "#38BDF8",
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
    </div>
  );
}
