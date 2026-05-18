import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  MessageCircle,
  Search,
  User,
  Clock,
  Bot,
  Video,
  FileText,
  Globe,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/chat", label: "المحادثة", icon: MessageCircle },
  { to: "/smart-search", label: "البحث الذكي", icon: Search },
  { to: "/persona", label: "الشخصية الرقمية", icon: User },
  { to: "/history", label: "سجل المحادثات", icon: Clock },
  { to: "/bot", label: "البوت التفاعلي", icon: Bot },
  { to: "/video", label: "محلل الفيديو", icon: Video },
  { to: "/docs", label: "محلل المستندات", icon: FileText },
  { to: "/web-track", label: "تتبع الويب", icon: Globe },
];

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="min-w-56 h-full! shrink-0  sticky top-0 flex flex-col bg-[#E2E7EE] dark:bg-dark-sidebar  dark:border-white/5  gap-1">
      {/* Logo */}
      <div className="bg-[#FFFFFF4D]  dark:bg-[#1a1d27]/50  h-full p-2 rounded-3xl border-2 border-[#FFFFFF]  ">
        <div className="px-3 mb-6 flex items-center">
          <span className="text-3xl font-black text-start text-[#08101C] dark:text-white">
            ايبلا
          </span>
        </div>
        {/* Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                clsx("sidebar-link", isActive && "active")
              }
            >
              <Icon size={17} />
              <span>{t(label)}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
