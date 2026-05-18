import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Globe, Link2, Loader2, ExternalLink, Clock, Tag, BarChart2, ShieldCheck, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

const mockWebResult = {
  url: 'https://example.com',
  title: 'موقع نموذجي للتحليل',
  status: 'آمن',
  safe: true,
  loadTime: '1.2 ثانية',
  lastVisit: '01 يناير 2024',
  description: 'هذا الموقع يقدم محتوى تقنياً متنوعاً حول الذكاء الاصطناعي وتقنيات الويب الحديثة. يتميز بتصميم عصري وتجربة مستخدم سلسة.',
  tags: ['تقنية', 'ذكاء اصطناعي', 'أخبار'],
  stats: [
    { label: 'الزيارات الشهرية', value: '1.2M' },
    { label: 'متوسط وقت التصفح', value: '4:32 دقيقة' },
    { label: 'معدل الارتداد', value: '32%' },
    { label: 'الصفحات لكل زيارة', value: '5.8' },
  ],
  recentLinks: [
    { title: 'مقال عن الذكاء الاصطناعي', url: '/ai-article', date: 'منذ يومين' },
    { title: 'دليل تعلم البرمجة', url: '/coding-guide', date: 'منذ أسبوع' },
    { title: 'أخبار التقنية اليوم', url: '/tech-news', date: 'منذ أسبوعين' },
  ]
}

export default function WebTrackPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: { url: '' },
    validationSchema: Yup.object({ url: Yup.string().url('رابط غير صحيح').required('مطلوب') }),
    onSubmit: async () => {
      setLoading(true)
      await new Promise(r => setTimeout(r, 1400))
      setResult(mockWebResult)
      setLoading(false)
    }
  })

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">

      {/* Search bar */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
            <Globe size={18} className="text-sky-500" />
          </div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">تتبع الويب</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 input-base">
              <Link2 size={14} className="text-gray-400 shrink-0" />
              <input name="url" type="text" value={formik.values.url}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                placeholder="https://example.com"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
              />
            </div>
            {formik.touched.url && formik.errors.url && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.url}</p>
            )}
          </div>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 dark:bg-sky-500 text-white text-xs font-bold hover:opacity-90 disabled:opacity-60 transition-all shrink-0">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
            {loading ? 'جاري التحليل...' : 'تتبع'}
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="card flex flex-col gap-3 animate-pulse">
          {[1,2,3].map(i => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-1/4" />
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <>
          {/* Site info */}
          <div className="card flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center shrink-0">
                <Globe size={18} className="text-sky-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{result.title}</p>
                <a href={result.url} className="text-xs text-sky-500 hover:underline flex items-center gap-1 mt-0.5">
                  {result.url} <ExternalLink size={10} />
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-md">{result.description}</p>
              </div>
            </div>
            <div className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0',
              result.safe
                ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-500/10 text-red-500'
            )}>
              {result.safe ? <ShieldCheck size={12} /> : <AlertTriangle size={12} />}
              {result.status}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {result.stats.map(s => (
              <div key={s.label} className="card flex flex-col gap-1 text-center">
                <p className="text-lg font-black text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tags + Load time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-sky-500" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">التصنيفات</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-gray-400" />
                <span className="text-xs text-gray-500">سرعة التحميل: <strong className="text-gray-700 dark:text-gray-300">{result.loadTime}</strong></span>
              </div>
            </div>

            <div className="card flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <BarChart2 size={14} className="text-sky-500" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">آخر الروابط المزارة</h4>
              </div>
              <ul className="flex flex-col gap-2">
                {result.recentLinks.map((link, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{link.title}</span>
                    <span className="text-xs text-gray-400 shrink-0">{link.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
