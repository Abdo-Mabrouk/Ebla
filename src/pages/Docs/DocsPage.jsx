import { useState } from 'react'
import { Upload, FileText, Loader2, Tag, List, AlignLeft, Download } from 'lucide-react'
import clsx from 'clsx'

const mockDocResult = {
  name: 'تقرير_الذكاء_الاصطناعي.pdf',
  pages: 12,
  words: 3840,
  summary: 'هذا المستند يتناول تقرير شامل حول استخدامات الذكاء الاصطناعي في قطاعات الأعمال المختلفة، مع دراسة حالة لعدد من الشركات الرائدة في هذا المجال.',
  tags: ['أعمال', 'تقنية', 'ذكاء اصطناعي', 'تقرير'],
  sections: [
    { title: 'ملخص تنفيذي', page: 1 },
    { title: 'الذكاء الاصطناعي في الأعمال', page: 3 },
    { title: 'دراسات الحالة', page: 6 },
    { title: 'التوصيات', page: 10 },
    { title: 'الخاتمة', page: 12 },
  ],
  keyInsights: [
    '72% من الشركات تستخدم الذكاء الاصطناعي في عملياتها',
    'توفير 40% من الوقت في العمليات الروتينية',
    'زيادة الإنتاجية بنسبة 35% في المتوسط',
  ]
}

export default function DocsPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const analyze = async (file) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setResult(mockDocResult)
    setLoading(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) analyze(file)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) analyze(file)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">

      {/* Upload zone */}
      {!result && !loading && (
        <div className="card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
              <FileText size={18} className="text-sky-500" />
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">محلل المستندات</h2>
          </div>

          <label
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={clsx(
              'border-2 border-dashed rounded-2xl p-14 flex flex-col items-center gap-4 cursor-pointer transition-all',
              dragging
                ? 'border-sky-400 bg-sky-50 dark:bg-sky-500/5'
                : 'border-gray-200 dark:border-white/10 hover:border-sky-400'
            )}
          >
            <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
              dragging ? 'bg-sky-100 dark:bg-sky-500/20' : 'bg-gray-100 dark:bg-white/5'
            )}>
              <Upload size={24} className={dragging ? 'text-sky-500' : 'text-gray-400'} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {dragging ? 'أفلت الملف هنا' : 'اسحب المستند هنا أو اضغط للرفع'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX, TXT — بحد أقصى 50MB</p>
            </div>
            <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFile} />
          </label>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="card flex flex-col items-center gap-4 py-12">
          <Loader2 size={32} className="text-sky-500 animate-spin" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">جاري تحليل المستند...</p>
          <div className="w-48 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <>
          {/* File info */}
          <div className="card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                <FileText size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{result.name}</p>
                <p className="text-xs text-gray-400">{result.pages} صفحة • {result.words.toLocaleString()} كلمة</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setResult(null); setLoading(false) }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 border border-gray-200 dark:border-white/10 hover:border-sky-400 hover:text-sky-500 transition-colors"
              >
                تحليل مستند جديد
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gray-900 dark:bg-sky-500 text-white hover:opacity-90 transition-opacity">
                <Download size={12} />
                تصدير
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="card flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <AlignLeft size={14} className="text-sky-500" />
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">الملخص</h4>
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

          {/* Sections + Insights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <List size={14} className="text-sky-500" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">فهرس المحتوى</h4>
              </div>
              <ul className="flex flex-col gap-2">
                {result.sections.map((s, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 dark:text-gray-300">{s.title}</span>
                    <span className="text-gray-400 font-mono">ص {s.page}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-sky-500" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">أبرز الإحصائيات</h4>
              </div>
              <ul className="flex flex-col gap-3">
                {result.keyInsights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                    {insight}
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
