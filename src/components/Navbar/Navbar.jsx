import { Bell, Sun, Moon, Search, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { t } = useTranslation();
  const { dark, setDark, toggleLang, lang } = useTheme();
  const { user } = useAuth();

  return (
    <header className="pb-6 flex items-center justify-between px-6  py-0 sticky top-0 z-40">
      {/* Right side: avatar + bell + dark + lang */}
      <div className="flex items-center justify-between w-full gap-3">
        {/* Left side: Search */}
        <div className="flex items-center gap-2 bg-[#FFFFFF4D]  dark:border-white/5 border border-[#FFFFFF] dark:bg-dark-card rounded-xl px-4 py-2 w-[500px]">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder={t("ابحث عن أي شيء........")}
            className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none w-full"
          />
          <span className="text-xs inline-flex items-center text-gray-400 bg-gray-200 dark:bg-white/10 px-1.5 py-0.5 rounded-md font-mono whitespace-nowrap">
            Cmd + K
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-semibold bg-[#FFFFFF4D] dark:bg-dark-card dark:border-white/5 border border-[#FFFFFF] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <Languages size={14} />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          {/* Dark/Light toggle */}
          <button
            role="switch"
            aria-checked={dark}
            onClick={() => setDark(!dark)}
            className={`relative w-16 h-8 rounded-full border transition-all duration-250 cursor-pointer shrink-0
    ${dark ? "bg-gray-800 border-gray-700" : "bg-[#FFFFFF4D] border border-[#FFFFFF]"}`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-[26px] h-[26px] rounded-full flex items-center justify-center text-sm transition-all duration-[250ms]
      ${
        dark
          ? "translate-x-8 bg-gray-100 text-gray-700"
          : "translate-x-0 bg-gray-800 text-gray-100"
      }`}
            >
              {dark ? <Moon size={14} /> : <Sun size={14} />}
            </span>
          </button>
          {/* Bell */}
          <button className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#FFFFFF4D] dark:bg-dark-card dark:border-white/5 border border-[#FFFFFF] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-sky-400 rounded-full" />
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer ring-2 ring-sky-400/30">
            {user?.name?.[0] || "A"}
          </div>
        </div>
      </div>
    </header>
  );
}
