import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Send,
  Plus,
  MessageCircle,
  Search,
  Trash2,
  ChevronRight,
  Sparkles,
  Bot,
  User,
  FileText,
  Image,
  Link,
  Mic,
  PanelLeftOpen,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import clsx from "clsx";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const mockChats = [
  { id: 1, title: "ما هو الذكاء الاصطناعي؟", time: "منذ 2 دقيقة" },
  { id: 2, title: "اشرح لي React Hooks", time: "منذ ساعة" },
  { id: 3, title: "كيف أبني API بـ Node.js", time: "أمس" },
  { id: 4, title: "مقارنة بين Python و JavaScript", time: "أمس" },
  { id: 5, title: "ما هي أفضل مكتبات CSS", time: "منذ 3 أيام" },
];

const mockResponses = [
  "هذا سؤال رائع! الذكاء الاصطناعي هو مجال من مجالات علوم الحاسب يهدف إلى محاكاة القدرات الإدراكية البشرية.",
  "بالطبع، يمكنني مساعدتك في ذلك. دعني أشرح لك الأمر بشكل مبسط وواضح.",
  "فكرة ممتازة! إليك ما تحتاج معرفته حول هذا الموضوع المثير للاهتمام.",
  "سؤال ذكي جداً! الإجابة تعتمد على عدة عوامل، دعني أوضح لك كل منها.",
];

// ─── Message Bubble (chat view) ───
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={clsx(
        "flex gap-3 items-start",
        isUser ? "flex-row" : "flex-row-reverse",
      )}
    >
      {/* Avatar */}
      <div
        className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold",
          isUser
            ? "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
            : "bg-gray-100 dark:bg-white/10 text-gray-500",
        )}
      >
        {isUser ? "أ" : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div
        className={clsx(
          "max-w-[75%] px-5 py-4 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-[#FFFFFF] dark:bg-dark-card text-gray-800 dark:text-gray-200 rounded-2xl rounded-tr-sm"
            : "bg-[#FFFFFF4D] dark:bg-dark-card border border-[#FFFFFFB2] dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm shadow-sm",
        )}
      >
        {msg.content}
        {msg.loading && (
          <span className="inline-flex gap-1 ms-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Input Bar (shared) ───
export function InputBar({ value, onChange, onSend, disabled, isEmpty }) {
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className={clsx(
        "w-full",
        isEmpty
          ? "max-w-2xl mx-auto"
          : " p-4",
      )}
    >
      <div
        className={`flex flex-col items-end gap-3 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm focus-within:border-sky-300 dark:focus-within:border-sky-500/50 transition-colors ${isEmpty ? "px-4 py-3" : "px-4 py-3"}`}
      >
        {/* Input */}
        <textarea
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t("كيف يمكنني مساعدتك اليوم؟")}
          className="flex-1 bg-transparent w-full text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none resize-none max-h-32 leading-relaxed text-right"
          style={{ minHeight: "24px" }}
        />

        <div className="flex items-center justify-between w-full">
          {/* Right actions */}
          <div className="flex items-center  gap-2 ">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <Link size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <Image size={14} />
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <Globe size={12} />
              {t(" موقع الويب")}
              <ChevronRight size={10} className="rotate-90" />
            </button>
          </div>
          {/* Mic button */}
          <button className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-gray-800 flex items-center justify-center text-white shrink-0">
            <Mic size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ───
function EmptyState({ onSend, input, onChange }) {
  const { t } = useTranslation();
  const quickActions = [
    { icon: Globe, label: t("محلل الفيديو"), path: "/video" },
    { icon: FileText, label: t("البوت التفاعلي"), path: "/bot" },
    { icon: Image, label: t("محلل المستندات"), path: "/docs" },
    { icon: Link, label: t("تتبع الويب"), path: "/web-track" },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 text-center">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold gradient-text leading-tight">
          {t("ذكاء اصطناعي يفكر، يتعلم، ويحل")}
        </h1>
        <p className="text-base text-[#8794A5] font-medium dark:text-white">
          {t("  ذكي، سريع، دقيق - شريكك المدعوم بالذكاء الاصطناعي")}
        </p>
      </div>

      {/* Input */}
      <div className="w-full max-w-2xl">
        <InputBar
          value={input}
          onChange={onChange}
          onSend={onSend}
          isEmpty={true}
        />
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-2xl">
        {quickActions.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            className="flex flex-col items-start gap-6 relative min-h-36 p-4 rounded-2xl bg-[#FFFFFF80] dark:bg-dark-card border border-gray-200 dark:border-white/10 hover:border-sky-300 dark:hover:border-sky-500/50 hover:shadow-md transition-all group text-right"
            onClick={() => {
              navigate(path);
            }}
          >
            <div className="absolute end-2 top-2 size-10 border border-[#FFFFFF] rounded-full flex items-center justify-center">
              <ArrowUpRight
                size={20}
                className=" rotate-[270deg] block  text-[#8794A5] dark:text-gray-600 group-hover:text-sky-400 transition-colors"
              />
            </div>
            <div className="flex flex-col justify-between  h-full items-start gap-2 w-full">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                <Icon size={15} className="text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-sm font-medium text-[#08101C] dark:text-gray-400">
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const content = text || input;
    if (!content.trim() || loading) return;

    const userMsg = { id: Date.now(), role: "user", content };
    const loadingMsg = {
      id: Date.now() + 1,
      role: "assistant",
      content: "",
      loading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const reply =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];
    setMessages((prev) =>
      prev.map((m) =>
        m.id === loadingMsg.id ? { ...m, content: reply, loading: false } : m,
      ),
    );
    setLoading(false);
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden rounded-2xl dark:border-white/5 relative">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Empty state OR messages */}
        {isEmpty ? (
          <EmptyState
            onSend={() => sendMessage()}
            input={input}
            onChange={setInput}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input في الأسفل لما يكون في messages */}
            <div>
              <InputBar
                value={input}
                onChange={setInput}
                onSend={() => sendMessage()}
                disabled={loading}
                isEmpty={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
