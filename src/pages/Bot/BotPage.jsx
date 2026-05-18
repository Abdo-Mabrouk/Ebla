import { useState, useRef, useEffect } from 'react'
import {
  Send, Globe, Link2, Mic, ChevronLeft, ChevronRight,
  Calendar, User, Briefcase, FileText, Save, X, ChevronDown
} from 'lucide-react'
import clsx from 'clsx'

const mockEmployees = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: ['أحمد مبروك', 'هدى كد عادل', 'فاطمة حمزة العمارى', 'على عد الله مره', 'أسلم عبد الفتاح الصوفى', 'عبدالرحمن محسن الجميله'][i % 6],
  email: 'shra.sng@gmail.com',
  admin: ['باتريس المنى', 'وائل آل نوى الطفل', 'حسن على الزهران', 'خاله على السهولى'][i % 4],
  dept: 'IT',
  date: '15 أكتوبر 2024',
}))

const ROWS_PER_PAGE = 6
const leaveTypes = ['إجازة مرضية', 'إجازة سنوية', 'إجازة طارئة', 'إجازة بدون راتب']

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={clsx('flex gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div className={clsx('max-w-[78%] flex flex-col', isUser ? 'items-end' : 'items-start')}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-white dark:text-gray-900 text-xs font-black">ا</span>
            </div>
            <span className="text-xs font-bold text-gray-900 dark:text-white">ايبلا</span>
          </div>
        )}
        <div className={clsx(
          'px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line',
          isUser
            ? 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-tr-sm'
            : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm'
        )}>
          {msg.content}
          {msg.loading && (
            <span className="inline-flex gap-1 ms-2">
              {[0,1,2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce"
                  style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function InputBar({ value, onChange, onSend, disabled }) {
  return (
    <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-dark-sidebar shrink-0">
      <div className="flex items-end gap-3 bg-gray-50 dark:bg-dark-card rounded-2xl px-4 py-3 border border-gray-200 dark:border-white/5 focus-within:border-sky-400 transition-colors">
        <button className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-sky-500 flex items-center justify-center text-white shrink-0">
          <Mic size={14} />
        </button>
        <textarea rows={1} value={value} onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() } }}
          placeholder="كيف يمكنني مساعدتك اليوم؟"
          className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none resize-none max-h-28 leading-relaxed"
          style={{ minHeight: '24px' }}
        />
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 transition-colors">
            <Globe size={12} />موقع الويب
          </button>
          <button className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-500 transition-colors">
            <Link2 size={14} />
          </button>
          <button onClick={onSend} disabled={disabled || !value.trim()}
            className={clsx('w-8 h-8 rounded-xl flex items-center justify-center transition-all',
              value.trim() ? 'bg-gray-900 dark:bg-sky-500 text-white hover:opacity-90' : 'bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed'
            )}>
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

function TablePanel({ onRowClick }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(mockEmployees.length / ROWS_PER_PAGE)
  const rows = mockEmployees.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">سجل البيانات المتاحة</span>
        <div className="flex items-center gap-1.5">
          <button className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
            <X size={12} />
          </button>
          <button className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
              {['اسم الموظف', 'القسم', 'اسم الأديم', 'تاريخ البداية'].map(h => (
                <th key={h} className="px-3 py-2.5 text-end text-gray-500 dark:text-gray-400 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} onClick={() => onRowClick(row)}
                className="border-b border-gray-50 dark:border-white/5 hover:bg-sky-50 dark:hover:bg-sky-500/5 cursor-pointer transition-colors group">
                <td className="px-3 py-2.5 text-end">
                  <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{row.name}</div>
                  <div className="text-gray-400 mt-0.5">{row.email}</div>
                </td>
                <td className="px-3 py-2.5 text-end text-gray-600 dark:text-gray-400">{row.dept}</td>
                <td className="px-3 py-2.5 text-end">
                  <div className="text-gray-700 dark:text-gray-300">{row.admin}</div>
                  <div className="text-gray-400 mt-0.5">{row.email}</div>
                </td>
                <td className="px-3 py-2.5 text-end text-gray-600 dark:text-gray-400 whitespace-nowrap">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-sky-400 disabled:opacity-40 transition-colors">
            <ChevronRight size={11} />التالي
          </button>
          <div className="flex items-center gap-0.5 mx-1">
            {pages.slice(0, 4).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={clsx('w-7 h-7 rounded-lg text-xs font-semibold transition-all',
                  p === page ? 'bg-gray-900 dark:bg-sky-500 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                )}>{p}</button>
            ))}
          </div>
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-sky-400 disabled:opacity-40 transition-colors">
            السابق<ChevronLeft size={11} />
          </button>
        </div>
        <span className="text-xs text-gray-400">
          من 1 إلى {Math.min(page * ROWS_PER_PAGE, mockEmployees.length)} من إجمالي {mockEmployees.length} نتيجة
        </span>
      </div>
    </div>
  )
}

function FormPanel({ employee, onClose }) {
  const [form, setForm] = useState({
    leaveType: 'إجازة مرضية',
    employeeName: employee?.name || 'عادل',
    dept: employee?.dept || 'IT',
    startDate: '01 يناير 2020',
    endDate: '01 يناير 2020',
    note: 'إجازة طارئة',
  })
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">سجل البيانات المتاحة</span>
        <button onClick={onClose} className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5">
          <X size={12} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* نوع الإجازة */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">نوع الإجازة</label>
          <div className="relative">
            <select value={form.leaveType} onChange={e => set('leaveType', e.target.value)}
              className="input-base appearance-none ps-8 text-sm w-full">
              {leaveTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown size={13} className="absolute inset-y-0 start-3 my-auto text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* اسم الموظف */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">اسم الموظف</label>
          <div className="relative">
            <input value={form.employeeName} onChange={e => set('employeeName', e.target.value)}
              className="input-base ps-9 text-sm" />
            <User size={13} className="absolute inset-y-0 start-3 my-auto text-gray-400" />
          </div>
        </div>

        {/* القسم */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">القسم</label>
          <div className="relative">
            <input value={form.dept} onChange={e => set('dept', e.target.value)}
              className="input-base ps-9 text-sm" />
            <Briefcase size={13} className="absolute inset-y-0 start-3 my-auto text-gray-400" />
          </div>
        </div>

        {/* التواريخ */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">تاريخ البداية</label>
            <div className="relative">
              <input value={form.startDate} onChange={e => set('startDate', e.target.value)}
                className="input-base ps-9 text-sm" />
              <Calendar size={13} className="absolute inset-y-0 start-3 my-auto text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">تاريخ النهاية</label>
            <div className="relative">
              <input value={form.endDate} onChange={e => set('endDate', e.target.value)}
                className="input-base ps-9 text-sm" />
              <Calendar size={13} className="absolute inset-y-0 start-3 my-auto text-gray-400" />
            </div>
          </div>
        </div>

        {/* التعليق */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">التعليق</label>
          <div className="relative">
            <input value={form.note} onChange={e => set('note', e.target.value)}
              className="input-base ps-9 text-sm" />
            <FileText size={13} className="absolute inset-y-0 start-3 my-auto text-gray-400" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-white/5">
        <button className="w-full py-3 rounded-xl bg-gray-900 dark:bg-sky-500 text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Save size={14} />حفظ
        </button>
      </div>
    </div>
  )
}

export default function BotPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: `هذا النص هو مثال\nنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من موقع النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.\n\n• إذا كانت تحتاج إلى أكثر من الفقرات\n• يتيح لك موقع النص العربي زيادة عدد الفقرات كما تريد\n• النص لن يبدو مشوهاً وذا بعض أخطاء لغوية\n• موقع النص العربي مفيد` },
    { id: 2, role: 'user', content: 'للمواقع على وجه الخصوص، حيث يحتاج الميميل في كثير من الأحيان.' },
    { id: 3, role: 'assistant', content: `هذا النص هو مثال\nنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من موقع النص العربي.` },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { id: Date.now(), role: 'user', content: input }
    const loadingMsg = { id: Date.now() + 1, role: 'assistant', content: '', loading: true }
    setMessages(prev => [...prev, userMsg, loadingMsg])
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setMessages(prev => prev.map(m => m.id === loadingMsg.id
      ? { ...m, content: 'فهمت طلبك! يمكنني مساعدتك في إدارة بيانات الموظفين والإجازات بشكل فعّال.', loading: false }
      : m
    ))
    setLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-white/5">
      {/* Left: table or form */}
      <div className="w-[420px] shrink-0 flex flex-col border-e border-gray-100 dark:border-white/5 bg-white dark:bg-dark-sidebar">
        {selectedEmployee
          ? <FormPanel employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
          : <TablePanel onRowClick={setSelectedEmployee} />
        }
      </div>

      {/* Right: Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
          <div ref={bottomRef} />
        </div>
        <InputBar value={input} onChange={setInput} onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  )
}
