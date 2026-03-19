import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  GraduationCap,
  Users,
  Settings,
  HelpCircle,
  Zap,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'ホーム', exact: true },
  { to: '/ai-lesson-prep', icon: BookOpen, label: 'AI授業準備' },
  { to: '/ai-grade', icon: BarChart2, label: 'AI成績管理' },
  { to: '/ai-coaching', icon: GraduationCap, label: 'AI先生コーチング' },
  { to: '/ai-student', icon: Users, label: 'AI生徒記録' },
];

const bottomItems = [
  { to: '/settings', icon: Settings, label: '設定' },
  { to: '/help', icon: HelpCircle, label: 'ヘルプ' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-60 flex flex-col z-30 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ borderRight: '1px solid #e5e5e5' }}
    >
      {/* Logo — h-14 to match header */}
      <div
        className="h-14 flex items-center justify-between px-5 flex-shrink-0"
        style={{ borderBottom: '1px solid #e5e5e5' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-black tracking-tight">TEACHER AX</div>
          </div>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg transition-colors hover:bg-neutral-100"
          style={{ color: '#a3a3a3' }}
          aria-label="メニューを閉じる"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-5 pb-1.5">
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#c4c4c4' }}>
          Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            onClick={() => {
              // モバイルではナビ後に閉じる
              if (window.innerWidth < 1024) onClose();
            }}
            className="relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-lg text-sm font-medium overflow-hidden"
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#f5f5f5' : 'transparent',
              color: isActive ? '#111111' : '#a3a3a3',
              transition: 'background-color 200ms ease, color 200ms ease',
            })}
          >
            {({ isActive }) => (
              <>
                {/* Left indicator bar */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full"
                  style={{
                    height: isActive ? '18px' : '0px',
                    backgroundColor: '#111111',
                    transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <Icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{
                    color: isActive ? '#111111' : '#c4c4c4',
                    transition: 'color 200ms ease',
                  }}
                />
                <span className="truncate" style={{ transition: 'color 200ms ease' }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-3 space-y-0.5" style={{ borderTop: '1px solid #e5e5e5' }}>
        {bottomItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ color: '#a3a3a3' }}
          >
            <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#c4c4c4' }} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
