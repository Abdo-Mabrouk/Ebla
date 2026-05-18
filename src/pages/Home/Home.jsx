import StatsCards from "../../components/Cards/StatsCards";
import DataChart from "../../components/Charts/DataChart";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const performanceData = [
  { day: "Mon", like: 40, dislike: 25, neutral: 15 },
  { day: "Tue", like: 25, dislike: 18, neutral: 10 },
  { day: "Wed", like: 50, dislike: 30, neutral: 20 },
  { day: "Thu", like: 55, dislike: 28, neutral: 18 },
  { day: "Fri", like: 80, dislike: 45, neutral: 25 },
  { day: "Sat", like: 60, dislike: 35, neutral: 20 },
  { day: "Sun", like: 0, dislike: 0, neutral: 0 },
];

function SentimentCard() {
  const { t } = useTranslation();
  const sentimentData = [
    { label: t("محايد"), pct: 15, count: 500, color: "#94a3b8" },
    { label: t("لم يعجب به"), pct: 35, count: 500, color: "#6366f1" },
    { label: t("اعجب به"), pct: 55, count: 500, color: "#22c55e" },
  ];
  return (
    <div className="bg-white/90 dark:bg-[#1a1d27] rounded-2xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-lg">📊</span>
          <span className="text-base font-medium text-[#000000] dark:text-white">
            {t("تحليل المشاعر")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-[#000000] dark:text-white">
            64%
          </span>
          <span className="text-sm font-normal text-[#666666] dark:text-white leading-tight">
            {t(" اعجاب المستخدم")}
          </span>
        </div>
      </div>

      {/* Bar */}
      <div className="flex gap-1.5 h-9 rounded-full overflow-hidden">
        {[...sentimentData].reverse().map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-center text-white text-xs font-semibold rounded-full"
            style={{ width: `${s.pct}%`, background: s.color }}
          >
            {s.pct}%
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        {[...sentimentData].reverse().map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-sm text-[#909CAD] dark:text-white ">
              {s.label}
            </span>
            <span className="text-xm font-bold text-[#08101C] dark:text-white">
              {s.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceCard() {
  const { t } = useTranslation();
  return (
    <div className="bg-white/90 dark:bg-[#1a1d27] rounded-2xl p-5 flex flex-col justify-between gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400  bg-[#F0F4FA] size-11 rounded-full dark:bg-dark-sidebar flex items-center justify-center">
            🕐
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-white">
            {t("أداء الروبوت")}
          </span>
        </div>
        <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-white border border-[#F0F4FA] rounded-full p-2.5">
          {t("▾ آخر 7 أيام")}
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={performanceData} barSize={40} barCategoryGap="30%">
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />
          <YAxis hide />
          <Bar dataKey="like" stackId="a" fill="#1e3a8a" />
          <Bar dataKey="dislike" stackId="a" fill="#3b82f6" />
          <Bar
            dataKey="neutral"
            stackId="a"
            fill="#bfdbfe"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-between rounded-3xl gap-4 bg-[#F0F4FA] py-2 px-7">
        {[
          { color: "#bfdbfe", label: t("محايد") },
          { color: "#3b82f6", label: t("لم يعجب به") },
          { color: "#1e3a8a", label: t("اعجب به") },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: l.color }}
            />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const mockStats = {
    reports: { label: t("إجمالي التقارير"), value: "125" },
    links: { label: t("إجمالي الروابط"), value: "178,125" },
    members: { label: t("إجمالي الأعضاء"), value: "40", new: 35 },
    activeMembers: { label: t("الأعضاء النشطون"), value: "15", new: 5 },
  };

  return (
    <div className="flex flex-col gap-5 bg-[#FFFFFF59] dark:bg-[#1a1d27]/50 p-4 rounded-3xl">
      <StatsCards stats={mockStats} />
      <DataChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PerformanceCard />
        <div className="space-y-4">
          <SentimentCard />
          <SentimentCard />
        </div>
      </div>
    </div>
  );
}
