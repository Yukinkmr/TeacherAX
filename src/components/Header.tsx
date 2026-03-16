import { useState, useRef, useEffect } from 'react';
import { Bell, Search, BookOpen, BarChart2, GraduationCap, Users, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentTeacher } from '../data/mockData';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const searchTargets = [
  { label: 'ホーム', to: '/', keywords: ['ホーム', 'home', 'ダッシュボード'] },
  { label: 'AI授業準備', to: '/ai-lesson-prep', keywords: ['授業', '準備', '教材', '板書', '小テスト', 'ドラフト', 'prep'] },
  { label: 'AI成績管理', to: '/ai-grade', keywords: ['成績', '点数', '評価', 'グレード', 'grade', 'テスト'] },
  { label: 'AI先生コーチング', to: '/ai-coaching', keywords: ['コーチング', 'ロープレ', 'スキル', '成長', 'coaching'] },
  { label: 'AI生徒記録', to: '/ai-student', keywords: ['生徒', '記録', 'カルテ', 'student', 'pulse'] },
];

const notifications = [
  {
    id: 1,
    icon: BookOpen,
    iconColor: '#6366F1',
    iconBg: '#EEF2FF',
    title: '授業ドラフト生成完了',
    body: '「二次方程式」の授業設計ドラフトが完成しました。',
    time: '5分前',
    read: false,
  },
  {
    id: 2,
    icon: Users,
    iconColor: '#EF4444',
    iconBg: '#FEF2F2',
    title: '要支援アラート',
    body: '佐藤 悠斗 — 3週連続で提出物遅延。面談を推奨します。',
    time: '1時間前',
    read: false,
  },
  {
    id: 3,
    icon: BarChart2,
    iconColor: '#F59E0B',
    iconBg: '#FFFBEB',
    title: '成績分析レポート更新',
    body: '中間テストの成績CSV取り込みが完了しました。',
    time: '昨日',
    read: false,
  },
  {
    id: 4,
    icon: GraduationCap,
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
    title: 'AIロープレ推薦',
    body: '「保護者対応ロープレ」の新しいセッションが届いています。',
    time: '2日前',
    read: true,
  },
  {
    id: 5,
    icon: CheckCircle2,
    iconColor: '#a3a3a3',
    iconBg: '#f5f5f5',
    title: '学習コンテンツ修了',
    body: '「効果的な発問の設計」を修了しました。',
    time: '3日前',
    read: true,
  },
];

export function Header({ title, subtitle }: HeaderProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<number>>(new Set([4, 5]));

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  const suggestions = query.trim()
    ? searchTargets.filter(
        (t) =>
          t.label.includes(query) ||
          t.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : focused
    ? searchTargets
    : [];

  const handleSelect = (to: string) => {
    navigate(to);
    setQuery('');
    setFocused(false);
  };

  const markAllRead = () => setReadIds(new Set(notifications.map((n) => n.id)));

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className="h-14 bg-white flex items-center justify-between px-6 sticky top-0 z-20"
      style={{ borderBottom: '1px solid #e5e5e5' }}
    >
      {/* Left: Page title */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <h1 className="text-sm font-semibold text-black whitespace-nowrap">{title}</h1>
        {subtitle && (
          <>
            <span style={{ color: '#d4d4d4' }}>/</span>
            <p className="text-sm whitespace-nowrap" style={{ color: '#737373' }}>{subtitle}</p>
          </>
        )}
      </div>

      {/* Right: Search + Bell + User */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* Search */}
        <div ref={searchRef} className="relative" style={{ width: '260px' }}>
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            style={{ color: '#a3a3a3' }}
          />
          <input
            type="text"
            placeholder="フリーワード検索…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') { setQuery(''); setFocused(false); }
              if (e.key === 'Enter' && suggestions.length > 0) handleSelect(suggestions[0].to);
            }}
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg outline-none transition-colors"
            style={{
              backgroundColor: '#f5f5f5',
              color: '#111111',
              border: `1px solid ${focused ? '#d4d4d4' : 'transparent'}`,
            }}
          />

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && focused && (
            <div
              className="absolute left-0 right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              {!query.trim() && (
                <div className="px-3 pt-2.5 pb-1">
                  <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#c4c4c4' }}>
                    ページ
                  </span>
                </div>
              )}
              {suggestions.map((s) => (
                <button
                  key={s.to}
                  onMouseDown={() => handleSelect(s.to)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <Search className="w-3 h-3 flex-shrink-0" style={{ color: '#a3a3a3' }} />
                  <span className="text-sm text-black">{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bell + Notification panel */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative p-1.5 rounded-lg transition-colors hover:bg-neutral-100"
            style={{ color: notifOpen ? '#111111' : '#737373' }}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span
                className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: '#EF4444', fontSize: '9px', lineHeight: 1 }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden z-50 animate-fade-slide-up"
              style={{
                width: '360px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid #f5f5f5' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-black">通知</span>
                  {unreadCount > 0 && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full font-medium text-white"
                      style={{ backgroundColor: '#EF4444', fontSize: '10px' }}
                    >
                      {unreadCount}件未読
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs transition-colors hover:text-black"
                      style={{ color: '#737373' }}
                    >
                      すべて既読
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="p-1 rounded-lg transition-colors hover:bg-neutral-100"
                    style={{ color: '#a3a3a3' }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="overflow-y-auto" style={{ maxHeight: '380px' }}>
                {notifications.map((n, i) => {
                  const Icon = n.icon;
                  const isRead = readIds.has(n.id);
                  return (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-neutral-50"
                      style={{
                        borderBottom: i < notifications.length - 1 ? '1px solid #f5f5f5' : 'none',
                        opacity: isRead ? 0.6 : 1,
                      }}
                      onClick={() => setReadIds((prev) => new Set([...prev, n.id]))}
                    >
                      {/* Icon */}
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: n.iconBg }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: n.iconColor }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-black">{n.title}</span>
                          <span className="text-xs flex-shrink-0" style={{ color: '#a3a3a3' }}>{n.time}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#525252' }}>{n.body}</p>
                      </div>

                      {/* Unread dot */}
                      {!isRead && (
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ backgroundColor: '#EF4444' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2.5 pl-3" style={{ borderLeft: '1px solid #e5e5e5' }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            {currentTeacher.avatar}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-black leading-tight">{currentTeacher.name}</div>
            <div className="text-xs leading-tight" style={{ color: '#737373' }}>
              {currentTeacher.subject} · {currentTeacher.grade}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
