import { Search, User, Clock, Bot, Video, FileText, Globe } from 'lucide-react'

function PlaceholderPage({ icon: Icon, title, color = 'sky' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div className={`w-20 h-20 rounded-3xl bg-${color}-50 dark:bg-${color}-500/10 flex items-center justify-center`}>
        <Icon size={36} className={`text-${color}-400`} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-sm text-gray-400 max-w-xs">هذه الصفحة قيد التطوير وستكون متاحة قريباً</p>
      <div className="flex gap-1 mt-2">
        {[0,1,2].map(i => (
          <div key={i} className={`w-2 h-2 rounded-full bg-sky-400 animate-bounce`}
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}

export const BotPage = () => <PlaceholderPage icon={Bot} title="البوت التفاعلي" />
export const VideoPage = () => <PlaceholderPage icon={Video} title="محلل الفيديو" />
export const DocsPage = () => <PlaceholderPage icon={FileText} title="محلل المستندات" />
export const WebTrackPage = () => <PlaceholderPage icon={Globe} title="تتبع الويب" />
