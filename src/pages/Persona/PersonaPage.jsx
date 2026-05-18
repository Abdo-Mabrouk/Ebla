import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Send, ThumbsUp, ThumbsDown, Copy, RefreshCw,
  Share2, Globe, Link2, Mic, User, Bot,
  Play, RotateCcw
} from 'lucide-react'
import clsx from 'clsx'

// ─── Mock initial messages ───
const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: `هذا النص هو مثال
نص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من موقع النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.

• إذا كانت تحتاج إلى أكثر من الفقرات
• يتيح لك موقع النص العربي زيادة عدد الفقرات كما تريد
• النص لن يبدو مشوهاً وذا بعض أخطاء لغوية
• موقع النص العربي مفيد`,
  },
  {
    id: 2,
    role: 'user',
    content: 'للواقع على وجه الخصوص، حيث يحتاج الميميل في كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الواقع.',
  },
  {
    id: 3,
    role: 'assistant',
    content: `هذا النص هو مثال
نص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من موقع النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.`,
  },
]

// ─── Message actions bar ───
function MessageActions() {
  const [liked, setLiked] = useState(null)
  return (
    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={() => setLiked(true)}
        className={clsx('w-6 h-6 rounded-lg flex items-center justify-center transition-colors',
          liked === true ? 'text-green-500 bg-green-50 dark:bg-green-500/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')}
      >
        <ThumbsUp size={11} />
      </button>
      <button
        onClick={() => setLiked(false)}
        className={clsx('w-6 h-6 rounded-lg flex items-center justify-center transition-colors',
          liked === false ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')}
      >
        <ThumbsDown size={11} />
      </button>
      <button className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <Copy size={11} />
      </button>
      <button className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <RefreshCw size={11} />
      </button>
      <button className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <Share2 size={11} />
      </button>
    </div>
  )
}

// ─── Message bubble ───
function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={clsx('flex gap-2 group', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Bubble */}
      <div className={clsx(
        'max-w-[75%] flex flex-col',
        isUser ? 'items-end' : 'items-start'
      )}>
        {/* إيبلا badge للـ assistant */}
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

        {/* Actions on assistant messages */}
        {!isUser && !msg.loading && <MessageActions />}
      </div>
    </div>
  )
}

// ─── Left persona panel ───
function PersonaPanel() {
  return (
    <div className="w-64 shrink-0 flex flex-col border-e border-gray-100 dark:border-white/5 bg-white dark:bg-dark-sidebar">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">الشخصية الافتراضية</span>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Avatar area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        {/* Avatar circle */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400/20 to-blue-600/20 border-2 border-sky-400/30 flex items-center justify-center">
          <User size={36} className="text-sky-400" />
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <Play size={16} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <Mic size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Input bar ───
function InputBar({ value, onChange, onSend, disabled }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-dark-sidebar shrink-0">
      <div className="flex items-end gap-3 bg-gray-50 dark:bg-dark-card rounded-2xl px-4 py-3 border border-gray-200 dark:border-white/5 focus-within:border-sky-400 transition-colors">
        {/* Mic */}
        <button className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-sky-500 flex items-center justify-center text-white shrink-0">
          <Mic size={14} />
        </button>

        {/* Input */}
        <textarea
          rows={1}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="كيف يمكنني مساعدتك اليوم؟"
          className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none resize-none max-h-28 leading-relaxed"
          style={{ minHeight: '24px' }}
        />

        {/* Attachments */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-sky-400 hover:text-sky-500 transition-colors">
            <Globe size={12} />
            موقع الويب
          </button>
          <button className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Link2 size={14} />
          </button>
          {/* Send */}
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
export default function PersonaPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const mockReplies = [
    'بالطبع! يمكنني مساعدتك في ذلك. الشخصية الرقمية هي تمثيل افتراضي لك أو لعلامتك التجارية في الفضاء الرقمي.',
    'سؤال رائع! دعني أشرح لك هذا الأمر بشكل مبسط وواضح حتى تتمكن من الاستفادة منه بشكل كامل.',
    'فهمت ما تقصده. يمكنني توليد محتوى يناسب شخصيتك الرقمية ويعكس أسلوبك الخاص في التواصل.',
  ]

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { id: Date.now(), role: 'user', content: input }
    const loadingMsg = { id: Date.now() + 1, role: 'assistant', content: '', loading: true }
    setMessages(prev => [...prev, userMsg, loadingMsg])
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)]
    setMessages(prev =>
      prev.map(m => m.id === loadingMsg.id ? { ...m, content: reply, loading: false } : m)
    )
    setLoading(false)
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-white/5">

      {/* Left: Persona panel */}
      <PersonaPanel />

      {/* Right: Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <InputBar
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          disabled={loading}
        />
      </div>
    </div>
  )
}
