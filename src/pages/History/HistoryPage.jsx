import { useState, useRef, useEffect } from 'react'
import {
  Search, Send, Globe, Link2, Mic,
  Clock, ChevronDown, Bot, Maximize2
} from 'lucide-react'
import clsx from 'clsx'

// ─── Mock history list ───
const mockHistory = [
  { id: 1, title: 'مقدمة في الذكاء الاصطناعي', date: '01 يناير 2020', time: '06:36 مساء' },
  { id: 2, title: 'مقدمة في الذكاء الاصطناعي', date: '01 يناير 2020', time: '06:36 مساء' },
  { id: 3, title: 'مقدمة في الذكاء الاصطناعي', date: '01 يناير 2020', time: '06:36 مساء' },
  { id: 4, title: 'مقدمة في الذكاء الاصطناعي', date: '01 يناير 2020', time: '06:36 مساء' },
  { id: 5, title: 'مقدمة في الذكاء الاصطناعي', date: '01 يناير 2020', time: '06:36 مساء' },
]

// ─── Mock messages per chat ───
const mockMessages = [
  {
    id: 1, role: 'assistant',
    content: `هذا النص هو مثال
نص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من موقع النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.

• إذا كانت تحتاج إلى أكثر من الفقرات
• يتيح لك موقع النص العربي زيادة عدد الفقرات كما تريد
• النص لن يبدو مشوهاً وذا بعض أخطاء لغوية
• موقع النص العربي مفيد`,
  },
  {
    id: 2, role: 'user',
    content: 'للمواقع على وجه الخصوص، حيث يحتاج الميميل في كثير من الأحيان أن يطلع على صورة حقيقية لتصميم المواقع.',
  },
  {
    id: 3, role: 'assistant',
    content: `هذا النص هو مثال
نص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من موقع النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.`,
  },
]

// ─── Message bubble ───
function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={clsx('flex gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div className={clsx(
        'max-w-[75%] flex flex-col',
        isUser ? 'items-end' : 'items-start'
      )}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-white dark:text-gray-900 text-xs font-black leading-none">ا</span>
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

// ─── Input bar ───
function InputBar({ value, onChange, onSend, disabled }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() }
  }
  return (
    <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-dark-sidebar shrink-0">
      <div className="flex items-end gap-3 bg-gray-50 dark:bg-dark-card rounded-2xl px-4 py-3 border border-gray-200 dark:border-white/5 focus-within:border-sky-400 transition-colors">
        <button className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-sky-500 flex items-center justify-center text-white shrink-0">
          <Mic size={14} />
        </button>
        <textarea
          rows={1}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="كيف يمكنني مساعدتك اليوم؟"
          className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none resize-none max-h-28 leading-relaxed"
          style={{ minHeight: '24px' }}
        />
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 transition-colors">
            <Globe size={12} />
            موقع الويب
          </button>
          <button className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-500 transition-colors">
            <Link2 size={14} />
          </button>
          <button
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className={clsx(
              'w-8 h-8 rounded-xl flex items-center justify-center transition-all',
              value.trim()
                ? 'bg-gray-900 dark:bg-sky-500 text-white hover:opacity-90 hover:scale-105'
                : 'bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed'
            )}
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ───
export default function HistoryPage() {
  const [selected, setSelected] = useState(mockHistory[0])
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const filtered = mockHistory.filter(h =>
    h.title.includes(search) || search === ''
  )

  const selectChat = (chat) => {
    setSelected(chat)
    setMessages(mockMessages)
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { id: Date.now(), role: 'user', content: input }
    const loadingMsg = { id: Date.now() + 1, role: 'assistant', content: '', loading: true }
    setMessages(prev => [...prev, userMsg, loadingMsg])
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setMessages(prev =>
      prev.map(m => m.id === loadingMsg.id
        ? { ...m, content: 'شكراً على سؤالك! يمكنني مساعدتك في هذا الموضوع بشكل مفصل.', loading: false }
        : m
      )
    )
    setLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-white/5">

      {/* ── Right: Chat view ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
          <div ref={bottomRef} />
        </div>
        <InputBar value={input} onChange={setInput} onSend={sendMessage} disabled={loading} />
      </div>

      {/* ── Left: History panel ── */}
      <div className="w-72 shrink-0 flex flex-col border-s border-gray-100 dark:border-white/5 bg-white dark:bg-dark-sidebar">

        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">المحادثات والرسائل</span>
          </div>

          {/* Search + filter row */}
          <div className="flex items-center gap-2">
            {/* Bot filter */}
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-sky-400 transition-colors shrink-0">
              <Bot size={12} className="text-sky-400" />
              اسم البوت
              <ChevronDown size={11} />
            </button>

            {/* Search input */}
            <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-white/5 rounded-xl px-3 py-2">
              <Search size={12} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن اسم المحادثة..."
                className="bg-transparent text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* History list */}
        <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-gray-100 dark:divide-white/5">
          {filtered.map(chat => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={clsx(
                'w-full text-start px-4 py-3 transition-colors flex items-start justify-between gap-2 group',
                selected?.id === chat.id
                  ? 'bg-sky-50 dark:bg-sky-500/10'
                  : 'hover:bg-gray-50 dark:hover:bg-white/5'
              )}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <p className={clsx(
                  'text-xs font-semibold truncate',
                  selected?.id === chat.id
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-gray-800 dark:text-gray-200'
                )}>
                  {chat.title}
                </p>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={10} />
                  <span className="text-xs">{chat.date} • {chat.time}</span>
                </div>
              </div>

              {/* تعميق badge */}
              <span className={clsx(
                'shrink-0 text-xs font-semibold px-2 py-1 rounded-lg transition-all',
                'bg-sky-50 dark:bg-sky-500/10 text-sky-500 border border-sky-200 dark:border-sky-500/20',
                'opacity-0 group-hover:opacity-100',
                selected?.id === chat.id && 'opacity-100'
              )}>
                تعميق
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
