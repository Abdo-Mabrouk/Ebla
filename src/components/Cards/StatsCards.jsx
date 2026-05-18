import {
  TrendingUp,
  TrendingDown,
  Link2,
  FileText,
  Users,
  UserCheck,
} from "lucide-react";
import clsx from "clsx";
import img from "../../Imge/Group 1820547435.svg";
function StatCard({ label, value, change, positive, icon: Icon, sub }) {
  return (
    <div className="card h-[170px] flex flex-col  justify-between gap-3 hover:bg-[#08101C] transition-colors duration-300 group">
      <div className="flex items-center gap-5">
        <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <Icon size={18} />
        </div>
        <div
          className={clsx(
            "flex items-center justify-center gap-1 text-[14px] font-medium w-24 py-3 rounded-full",
            positive
              ? "bg-[#39AD4B1A] dark:bg-green-500/10 text-[#39AD4B] dark:text-green-400"
              : "bg-[#D121211A] dark:bg-red-500/10 text-[#D12121] dark:text-red-400",
          )}
        >
          {change}
          {positive ? <TrendingDown className="rotate-180" size={12} /> : <TrendingUp className="rotate-180" size={12} />}
        </div>
      </div>

      <div className="">
        <div className="text-[32px] font-bold text-[#08101C] group-hover:text-white dark:text-white">
          {value}
        </div>
        <div className="text-base text-[#8794A5] font-normal group-hover:text-white  dark:text-gray-400 mt-0.5">
          {label}
        </div>
      </div>

      {sub && <div className="text-xs text-sky-500 font-semibold">{sub}</div>}
    </div>
  );
}

// Simple number cards (no trend)
function AvatarGroup({ users = [], maxVisible = 4 }) {
  const visible = users.slice(0, maxVisible);
  const overflow = users.length - maxVisible;

  return (
    <div className="flex items-center">
      {visible.map((user, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden flex items-center justify-center -ml-2 first:ml-0 flex-shrink-0"
          style={{ background: user.color || "#e5e7eb" }}
        >
          {user.img ? (
            <img
              src={user.img}
              alt={user.name || ""}
              className="w-10 h-10 object-cover"
            />
          ) : (
            <span className="text-[11px] w-10 h-10 flex items-center justify-center font-medium text-white">
              {(user.name || "?").slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div className="size-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center -ml-2 flex-shrink-0">
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
            +{overflow}
          </span>
        </div>
      )}
    </div>
  );
}
function SimpleCard({ label, value, users = [], maxVisible = 4 }) {
  return (
    <div className="card h-[170px] flex flex-col justify-between gap-3 hover:bg-[#08101C] transition-colors duration-300 group">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-[#08101C] dark:text-gray-400 mt-0.5 group-hover:text-white">
          {label}
        </div>
        <div className="text-[40px] font-medium text-[#08101C] bg-[#F0F4FA] px-5 rounded-2xl">
          {value}
        </div>
      </div>
      {users.length > 0 && (
        <AvatarGroup users={users} maxVisible={maxVisible} />
      )}
    </div>
  );
}

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <SimpleCard
        label={stats.activeMembers.label}
        value={stats.activeMembers.value}
        maxVisible={6}
        users={[
          { name: "Ahmed", img: img },
          { name: "Sara", img: img },
          { name: "Omar", color: "#7F77DD" },
          { name: "Layla", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
        ]}
      />
      <SimpleCard
        label={stats.members.label}
        value={stats.members.value}
        maxVisible={6}
        users={[
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Ahmed", img: img },
          { name: "Sara", img: img },
          { name: "Omar", color: "#7F77DD" },
          { name: "Layla", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
          { name: "Karim", img: img },
        ]}
      />
      <StatCard
        label={stats.links.label}
        value={stats.links.value}
        change="4.43%"
        positive={false}
        icon={Link2}
      />
      <StatCard
        label={stats.reports.label}
        value={stats.reports.value}
        change="4.43%"
        positive={true}
        icon={FileText}
      />
    </div>
  );
}
