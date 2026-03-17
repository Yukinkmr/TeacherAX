import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, BarChart2, GraduationCap, Users } from 'lucide-react';
import { Layout } from '../components/Layout';
import { todayActions, recentActivities, currentTeacher } from '../data/mockData';

const modules = [
  {
    to: '/ai-lesson-prep',
    icon: BookOpen,
    label: 'AI授業準備',
    desc: '授業設計をゼロからではなくたたき台から始める',
    stat: '今日のドラフト準備完了',
  },
  {
    to: '/ai-grade',
    icon: BarChart2,
    label: 'AI成績管理',
    desc: '成績を管理で終わらせず、次の指導行動につなげる',
    stat: '3件のアクション提案あり',
  },
  {
    to: '/ai-coaching',
    icon: GraduationCap,
    label: 'AI先生コーチング',
    desc: '授業力・対人力を数値で把握し、次の成長へ',
    stat: 'AIロープレ推薦セッションあり',
  },
  {
    to: '/ai-student',
    icon: Users,
    label: 'AI生徒記録',
    desc: '生徒とクラスの状態を把握し、次に何をすべきか分かる',
    stat: '要支援生徒 3名',
  },
];

const urgencyStyle: Record<string, { dot: string; label: string }> = {
  urgent: { dot: '#111111', label: '至急' },
  high: { dot: '#737373', label: '優先' },
  medium: { dot: '#d4d4d4', label: '通常' },
};

const moduleRouteMap: Record<string, string> = {
  prep: '/ai-lesson-prep',
  grade: '/ai-grade',
  growth: '/ai-coaching',
  pulse: '/ai-student',
};

export function Dashboard() {
  const navigate = useNavigate();
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const days = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <Layout title="ホーム">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Greeting */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase mb-1.5" style={{ color: '#a3a3a3' }}>
            {dateStr}（{days[today.getDay()]}）· {currentTeacher.school}
          </p>
          <h2 className="text-2xl font-semibold text-black tracking-tight">
            {currentTeacher.name}先生、おはようございます
          </h2>
          <p className="mt-1 text-sm" style={{ color: '#737373' }}>
            今日のAIアクション提案が{todayActions.length}件あります
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Today's Actions */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-black">今日のAIアクション提案</h3>
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ backgroundColor: '#f5f5f5', color: '#525252' }}
              >
                {todayActions.length}件
              </span>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #e5e5e5', backgroundColor: '#ffffff' }}
            >
              {todayActions.map((action, i) => {
                const u = urgencyStyle[action.priority];
                return (
                  <div
                    key={action.id}
                    className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors group"
                    style={{
                      borderBottom: i < todayActions.length - 1 ? '1px solid #f5f5f5' : 'none',
                    }}
                    onClick={() => navigate(moduleRouteMap[action.type] ?? '/')}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: u.dot }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-black leading-relaxed">{action.title}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs" style={{ color: '#a3a3a3' }}>{action.time}</span>
                        <span
                          className="text-xs font-medium"
                          style={{ color: '#525252' }}
                        >
                          {action.label}
                        </span>
                        <span
                          className="text-xs ml-auto"
                          style={{ color: '#a3a3a3' }}
                        >
                          {u.label}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className="w-3.5 h-3.5 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#737373' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-black">直近のアクティビティ</h3>
            </div>
            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div
                    className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0"
                    style={{ backgroundColor: '#d4d4d4' }}
                  />
                  <div>
                    <p className="text-sm text-black leading-relaxed">{act.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#a3a3a3' }}>{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div>
          <h3 className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#a3a3a3' }}>
            モジュール
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modules.map(({ to, icon: Icon, label, desc, stat }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className="text-left p-5 rounded-xl bg-white transition-all duration-150 hover:shadow-md group"
                style={{ border: '1px solid #e5e5e5' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#f5f5f5' }}
                >
                  <Icon className="w-4 h-4" style={{ color: '#111111' }} />
                </div>
                <div className="text-sm font-semibold text-black mb-1.5">{label}</div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#737373' }}>{desc}</p>
                <div
                  className="flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: '#a3a3a3' }}
                >
                  <span>{stat}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
