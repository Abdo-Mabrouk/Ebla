import { useState, useTransition } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Search,
  Globe,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Mic,
} from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

// ─── Mock results ───
const mockResults = [
  {
    id: 1,
    title: "ما هي الذكاء الاصطناعي؟",
    snippet:
      "الذكاء الاصطناعي (AI) هو تقنية تهدف إلى محاكاة الذكاء البشري في الآلات لتمكينها من التفكير والتعلم واتخاذ القرارات بشكل مستقل. يُستخدم في مجالات متنوعة مثل التعرف على الصوت، ومعالجة اللغة الطبيعية، والروبوتات، وأنظمة اتخاذ القرار.",
    source: "wikipedia.org",
    tag: "تصفية",
  },
  {
    id: 2,
    title: "سجل الدردشة",
    snippet:
      "لوريم إبسوم دولور سيت أميت، كونسيكتيتور أديبيسكينج إليت. فيستيبولوم موليس تورك دكتوم. موريز فيناسيس، فيليس فيناسيس أليكت أسينيله، نولا نيسي فيناسي لوبيو، فيت باندريت موريز إبسوم زيد سابين.",
    source: "docs.example.com",
    tag: null,
  },
  {
    id: 3,
    title: "مقدمة في الذكاء الاصطناعي",
    snippet:
      "الذكاء الاصطناعي هو توليفة أنظمة كبيرة مصممة لإكمال الوظائف المعرفية البشرية. تستخدم هذه الأنظمة الأنظمة العصبية الاصطناعية والشبكات العصبية الاصطناعية لتعزيز اتخاذ القرار وأتمتة العمليات المعقدة.",
    source: "ai-research.io",
    tag: null,
  },
  {
    id: 4,
    title: "تاريخ الذكاء الاصطناعي وتطوره",
    snippet:
      "بدأ مجال الذكاء الاصطناعي في الخمسينيات مع أعمال آلان تورينج وجون مكارثي. منذ ذلك الحين، شهد المجال تطوراً هائلاً من خلال ظهور الشبكات العصبية العميقة وتقنيات التعلم الآلي الحديثة.",
    source: "history.tech",
    tag: null,
  },
  {
    id: 5,
    title: "تطبيقات الذكاء الاصطناعي في الحياة اليومية",
    snippet:
      "يدخل الذكاء الاصطناعي في كثير من تطبيقات حياتنا اليومية مثل المساعدات الصوتية وأنظمة التوصيات في منصات البث والتجارة الإلكترونية والسيارات ذاتية القيادة والرعاية الصحية.",
    source: "techlife.net",
    tag: null,
  },
];

const ITEMS_PER_PAGE = 3;
const TOTAL = 74;

// ─── Result card ───
function ResultCard({ result }) {
  return (
    <div className="p-6 rounded-3xl overflow-hidden space-y-4 hover:dark:bg-[#1a1d27] hover:bg-white flex flex-col gap-2 bg-transparent transition-all cursor-pointer group">
      {/* Top row */}
      <div className="flex items-center justify-between w-full gap-2">
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white transition-colors">
          {result.title}
        </h3>
        <div className="size-8 rounded-full border border-[#08101C] flex items-center justify-center">
          <ArrowUpRight
            size={15}
            className="text-gray-300 transition-colors rotate-[280deg]"
          />
        </div>
      </div>
      {/* Snippet */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
        {result.snippet}
      </p>
    </div>
  );
}

// ─── Pagination ───
function Pagination({ current, total, onChange }) {
  const pages = [1, "...", 5, 6, 7, 8, "...", 12];
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <p className="text-[#A2ACBA] font-normal text-sm">{t("النتيجه")}</p>
        <p className="text-[#A2ACBA] font-normal text-sm">{t("250")}</p>
        <p className="text-[#A2ACBA] font-normal text-sm">{t("من")}</p>
        <p className="text-[#0F0F0F] dark:text-white font-normal text-sm">
          {t("2")}
        </p>
        <p className="text-[#A2ACBA] font-normal text-sm">{t("الي")}</p>
        <p className="text-[#0F0F0F] dark:text-white font-normal text-sm">
          {t("30")}
        </p>
      </div>
      <div className="flex items-center gap-5 w-fit!">
        <button
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black text-xs font-semibold text-white dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-sky-400 hover:text-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={14} />
          {t("السابق")}
        </button>
        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span
                key={`dots-${i}`}
                className="w-8 text-center text-xs text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onChange(p)}
                className={clsx(
                  "w-8 h-8 rounded-xl text-xs font-semibold transition-all",
                  p === current
                    ? "bg-gray-900 dark:bg-sky-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5",
                )}
              >
                {p}
              </button>
            ),
          )}
        </div>
        <button
          onClick={() => onChange(current + 1)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-black hover:text-white hover:bg-black transition-all"
        >
          {t("التالي")}
          <ChevronLeft size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function SmartSearchPage() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(6);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { query: "" },
    validationSchema: Yup.object({
      query: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      setResults(mockResults);
      setSearched(true);
      setLoading(false);
    },
  });

  return (
    <div className="bg-[#FFFFFF59] dark:bg-dark-card p-6 rounded-[32px]">
      <div className="flex flex-col gap-5 ">
        {/* Search bar card */}
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center gap-3 bg-[#FFFFFFCC]  dark:bg-dark-sidebar rounded-full p-4">
            {/* Input */}
            <div className="flex-1 flex items-center gap-2">
              <input
                name="query"
                type="text"
                value={formik.values.query}
                onChange={formik.handleChange}
                placeholder={t("ما هو الذكاء الاصطناعي")}
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none"
              />
            </div>
            {/* Source badge */}
            <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 dark:border-white/10 rounded-full px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <Globe size={12} />
              {t(" موقع الويب")}
              <ChevronRight size={10} className="rotate-90" />
            </button>
            {/* Submit */}
            <button className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center text-white shrink-0">
              <Mic size={15} />
            </button>
          </div>
        </form>

        {/* Results count */}
        {searched && !loading && (
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <p className="text-base px-4 bg-[#FFFFFF] rounded-full font-medium  text-gray-700 dark:text-gray-300">
                {TOTAL}
              </p>
              <p className="text-[#8794A5] text-[12px] font-normal ">
                {t("نتيجة بحث")}
              </p>
            </div>
            <div className="px-4 py-2 border border-[#1E6DD6] rounded-full cursor-pointer flex items-center gap-3">
              <Filter className=" text-[#1E6DD6]" size={16} />
              <p className="text-sm font-medium text-[#1E6DD6]">{t("تصفيه")}</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card flex flex-col gap-3 animate-pulse">
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-1/4" />
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-lg w-2/3" />
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-full" />
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-4/5" />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            <div className="flex flex-col gap-3">
              {results.map((r) => (
                <ResultCard key={r.id} result={r} />
              ))}
            </div>
            <Pagination current={page} total={12} onChange={setPage} />
          </>
        )}

        {/* Empty state before search */}
        {!searched && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
              <Search size={28} className="text-sky-400" />
            </div>
            <p className="text-sm text-gray-400">
              {t("ابحث عن أي موضوع وسيقوم الذكاء الاصطناعي بتحليل النتائج")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
