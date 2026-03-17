import { useState } from 'react';
import {
  Upload,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Sparkles,
  BookOpen,
  RotateCcw,
  Bell,
  Users,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer,
} from 'recharts';
import { Layout } from '../components/Layout';
import { students, classScoreHistory, subjectAnalysis, aiActions } from '../data/mockData';

type SortKey = 'name' | 'score' | 'submission' | 'attendance';
type SortDir = 'asc' | 'desc';

const riskStyle = {
  high:   { dot: '#EF4444', label: '要支援',  bg: '#FEF2F2', text: '#991B1B' },
  medium: { dot: '#F59E0B', label: '注意',    bg: '#FFFBEB', text: '#92400E' },
  low:    { dot: '#10B981', label: '良好',    bg: '#ECFDF5', text: '#065F46' },
};

const actionConfig: Record<string, { icon: React.ElementType; label: string }> = {
  remedial: { icon: BookOpen, label: '補習推薦' },
  resubmit: { icon: RotateCcw, label: '再提出' },
  contact: { icon: Bell, label: '保護者連絡' },
  reteach: { icon: Users, label: '再説明単元' },
};

export function GradeIntelligence() {
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const sorted = [...students].sort((a, b) => {
    const va = a[sortKey] as number | string;
    const vb = b[sortKey] as number | string;
    if (typeof va === 'number' && typeof vb === 'number') return sortDir === 'asc' ? va - vb : vb - va;
    return sortDir === 'asc'
      ? String(va).localeCompare(String(vb), 'ja')
      : String(vb).localeCompare(String(va), 'ja');
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3" style={{ color: '#d4d4d4' }} />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-black" />
      : <ChevronDown className="w-3 h-3 text-black" />;
  };

  const classAvg = Math.round(students.reduce((s, st) => s + st.score, 0) / students.length);

  return (
    <Layout title="AI成績管理" subtitle="成績を次の指導行動につなげる">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Stats */}
        <div
          className="rounded-xl px-6 py-4 flex items-center gap-8"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          {[
            { label: 'クラス平均', value: `${classAvg}点` },
            { label: '先月比', value: '+3点' },
            { label: '要支援生徒', value: `${students.filter((s) => s.risk === 'high').length}名` },
            { label: '提出率', value: '82%' },
          ].map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-8">
              {i > 0 && <div className="w-px h-8" style={{ backgroundColor: '#e5e5e5' }} />}
              <div>
                <div className="text-xs font-medium mb-0.5" style={{ color: '#a3a3a3' }}>{label}</div>
                <div className="text-xl font-semibold text-black">{value}</div>
              </div>
            </div>
          ))}
          <div className="ml-auto">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#0a0a0a' }}
            >
              <Upload className="w-3.5 h-3.5" />
              CSVインポート
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2 rounded-xl p-5"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <h3 className="text-sm font-semibold text-black mb-5">クラス平均推移</h3>
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={classScoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e5e5', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  cursor={{ stroke: '#f5f5f5', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="classA" name="2年A組" stroke="#111111" strokeWidth={1.5} dot={{ r: 2.5, fill: '#111111' }} />
                <Line type="monotone" dataKey="classB" name="2年B組" stroke="#d4d4d4" strokeWidth={1.5} dot={{ r: 2.5, fill: '#d4d4d4' }} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <h3 className="text-sm font-semibold text-black mb-5">分野別正答率</h3>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={subjectAnalysis} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="subject" type="category" tick={{ fontSize: 11, fill: '#525252' }} width={38} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v}%`]}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e5e5' }}
                />
                <Bar dataKey="correct" name="正答率" fill="#111111" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Action Proposals */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #f5f5f5' }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#111111' }} />
              <h3 className="text-sm font-semibold text-black">AIアクション提案</h3>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}
            >
              {aiActions.length}件
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 p-5">
            {aiActions.map((action, i) => {
              const { icon: Icon, label } = actionConfig[action.type];
              return (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#111111' }}
                    >
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-black mb-1">{label}</div>
                      <p className="text-xs leading-relaxed mb-2.5" style={{ color: '#737373' }}>{action.reason}</p>
                      {action.students.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {action.students.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-2 py-0.5 rounded font-medium"
                              style={{ backgroundColor: '#111111', color: '#ffffff' }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="text-xs px-3 py-1.5 rounded-lg text-white font-medium flex-shrink-0 transition-opacity hover:opacity-80"
                      style={{ backgroundColor: '#0a0a0a' }}
                    >
                      実行
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grade Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #f5f5f5' }}
          >
            <h3 className="text-sm font-semibold text-black">生徒別成績一覧</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: '#a3a3a3' }}>2年A組 · {students.length}名</span>
              <button
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ border: '1px solid #e5e5e5', color: '#525252' }}
              >
                <Upload className="w-3 h-3" />エクスポート
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #f5f5f5' }}>
                  {(['name', 'score', 'submission', 'attendance'] as SortKey[]).map((key) => {
                    const labels: Record<SortKey, string> = { name: '氏名', score: 'テスト点', submission: '提出率', attendance: '出席率' };
                    return (
                      <th
                        key={key}
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide cursor-pointer select-none"
                        style={{ color: '#a3a3a3' }}
                        onClick={() => toggleSort(key)}
                      >
                        <div className="flex items-center gap-1">
                          {labels[key]}
                          <SortIcon col={key} />
                        </div>
                      </th>
                    );
                  })}
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: '#a3a3a3' }}>前回比</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: '#a3a3a3' }}>状態</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s) => {
                  const diff = s.score - s.prev;
                  const rs = riskStyle[s.risk as keyof typeof riskStyle];
                  return (
                    <tr
                      key={s.id}
                      className="transition-colors cursor-pointer hover:bg-neutral-50"
                      style={{ borderBottom: '1px solid #f5f5f5' }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                            style={{ backgroundColor: '#0a0a0a' }}
                          >
                            {s.name[0]}
                          </div>
                          <span className="text-sm font-medium text-black">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-sm font-semibold ${s.score < 60 ? 'text-red-600' : 'text-black'}`}>
                          {s.score}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${s.submission}%`,
                                backgroundColor: s.submission < 70 ? '#525252' : '#111111',
                              }}
                            />
                          </div>
                          <span className="text-xs" style={{ color: '#525252' }}>{s.submission}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm" style={{ color: '#525252' }}>{s.attendance}%</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          {diff >= 0
                            ? <TrendingUp className="w-3.5 h-3.5" style={{ color: '#111111' }} />
                            : <TrendingDown className="w-3.5 h-3.5" style={{ color: '#737373' }} />}
                          <span className="text-sm" style={{ color: diff >= 0 ? '#111111' : '#737373' }}>
                            {diff >= 0 ? '+' : ''}{diff}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: rs.bg, color: rs.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: rs.dot }} />
                          {rs.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
