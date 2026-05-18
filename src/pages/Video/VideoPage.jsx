import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Video, Link2, Upload, Play, Loader2, FileVideo, Clock, Tag } from 'lucide-react'
import clsx from 'clsx'

const mockAnalysis = {
  title: 'مقدمة في الذكاء الاصطناعي',
  duration: '12:34',
  summary: 'هذا الفيديو يتناول مفهوم الذكاء الاصطناعي من الأساسيات، ويشرح كيف تعمل خوارزميات التعلم الآلي والشبكات العصبية الاصطناعية في تطبيقات الحياة اليومية.',
  tags: ['ذكاء اصطناعي', 'تعلم آلي', 'تقنية', 'برمجة'],
  keyPoints: [
    'تعريف الذكاء الاصطناعي وتاريخه',
    'أنواع التعلم الآلي الثلاثة الرئيسية',
    'تطبيقات الذكاء الاصطناعي في الصناعة',
    'مستقبل الذكاء الاصطناعي والتحديات',
  ],
  timestamps: [
    { time: '00:00', label: 'مقدمة' },
    { time: '02:15', label: 'تاريخ الذكاء الاصطناعي' },
    { time: '05:40', label: 'أنواع التعلم الآلي' },
    { time: '09:10', label: 'التطبيقات العملية' },
  ]
}

export default function VideoPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('url')

  const formik = useFormik({
    initialValues: { url: '' },
    validationSchema: Yup.object({ url: Yup.string().url('رابط غير صحيح').required('مطلوب') }),
    onSubmit: async () => {
      setLoading(true)
      await new Promise(r => setTimeout(r, 1500))
      setResult(mockAnalysis)
      setLoading(false)
    }
  })

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">

      {/* Upload card */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
            <Video size={18} className="text-sky-500" />
          </div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">محلل الفيديو</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-xl mb-4 w-fit">
          {[{ id: 'url', label: 'رابط' }, { id: 'upload', label: 'رفع ملف' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={clsx('px-4 py-1.5 rounded-lg text-xs font-semibold transition-all',
                tab === t.id ? 'bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
              )}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'url' ? (
          <form onSubmit={formik.handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 input-base">
                <Link2 size={14} className="text-gray-400 shrink-0" />
                <input name="url" type="text" value={formik.values.url}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-transparent w-full text-sm focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                />
              </div>
              {formik.touched.url && formik.errors.url && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.url}</p>
              )}
            </div>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 dark:bg-sky-500 text-white text-xs font-bold hover:opacity-90 disabled:opacity-60 transition-all shrink-0">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {loading ? 'جاري التحليل...' : 'تحليل'}
            </button>
          </form>
        ) : (
          <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-sky-400 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <Upload size={20} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">اسحب الفيديو هنا أو اضغط للرفع</p>
            <p className="text-xs text-gray-400">MP4, AVI, MOV — بحد أقصى 500MB</p>
          </div>
        )}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="card flex flex-col gap-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-lg w-1/3" />
          <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-full" />
          <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-4/5" />
          <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-lg w-2/3" />
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <>
          {/* Summary */}
          <div className="card flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{result.title}</h3>
                <div className="flex items-center gap-1 text-gray-400 mt-1">
                  <Clock size={11} />
                  <span className="text-xs">{result.duration}</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center shrink-0">
                <FileVideo size={16} className="text-sky-500" />
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{result.summary}</p>
            <div className="flex flex-wrap gap-2">
              {result.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">
                  <Tag size={10} />{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key points + timestamps */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">النقاط الرئيسية</h4>
              <ul className="flex flex-col gap-2">
                {result.keyPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">الطوابع الزمنية</h4>
              <ul className="flex flex-col gap-2">
                {result.timestamps.map((ts, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-sky-500 shrink-0">{ts.time}</span>
                    <span className="text-gray-600 dark:text-gray-400">{ts.label}</span>
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
