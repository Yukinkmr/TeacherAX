import { useState } from 'react';
import {
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Mic,
  BookOpen,
  Users,
  TrendingDown,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { studentProfiles, nextActions, classHeatmap } from '../data/mockData';

type Student = typeof studentProfiles[0];

const riskStyle = {
  high:   { dot: '#EF4444', label: '要支援',   bg: '#FEF2F2', text: '#991B1B' },
  medium: { dot: '#F59E0B', label: '注意観察', bg: '#FFFBEB', text: '#92400E' },
  low:    { dot: '#10B981', label: '良好',     bg: '#ECFDF5', text: '#065F46' },
};

const priorityDot: Record<string, string> = {
  urgent: '#111111',
  high: '#525252',
  medium: '#a3a3a3',
};

const heatBg = (v: number) => {
  if (v >= 90) return '#111111';
  if (v >= 80) return '#404040';
  if (v >= 70) return '#737373';
  if (v >= 60) return '#a3a3a3';
  return '#d4d4d4';
};

const tabLabels = ['概要', '成績', '提出物', '面談メモ', '活動履歴'];

export function StudentPulse() {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('概要');
  const [filterRisk, setFilterRisk] = useState<string | null>(null);

  const filtered = studentProfiles.filter((s) => {
    const matchSearch = !search || s.name.includes(search);
    const matchRisk = !filterRisk || s.risk === filterRisk;
    return matchSearch && matchRisk;
  });

  return (
    <Layout title="AI生徒記録" subtitle="生徒とクラスの状態を把握し、次にすべきことを知る">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Stats */}
        <div
          className="rounded-xl px-6 py-4 flex items-center gap-8"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          {[
            { label: 'クラス人数', value: `${studentProfiles.length}名`, icon: Users },
            { label: '要支援', value: `${studentProfiles.filter((s) => s.risk === 'high').length}名`, icon: AlertCircle },
            { label: '注意観察', value: `${studentProfiles.filter((s) => s.risk === 'medium').length}名`, icon: TrendingDown },
            { label: '面談待ち', value: '2名', icon: Calendar },
          ].map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-8">
              {i > 0 && <div className="w-px h-8" style={{ backgroundColor: '#e5e5e5' }} />}
              <div>
                <div className="text-xs font-medium mb-0.5" style={{ color: '#a3a3a3' }}>{label}</div>
                <div className="text-xl font-semibold text-black">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Student List */}
          <div
            className="col-span-3 rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #f5f5f5' }}>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#a3a3a3' }} />
                <input
                  type="text"
                  placeholder="生徒名で検索"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 text-sm rounded-lg outline-none"
                  style={{ backgroundColor: '#f5f5f5', color: '#111111' }}
                />
              </div>
              <div className="flex gap-2">
                {[null, 'high', 'medium', 'low'].map((risk) => (
                  <button
                    key={String(risk)}
                    onClick={() => setFilterRisk(risk)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                    style={filterRisk === risk
                      ? { backgroundColor: '#0a0a0a', color: '#ffffff' }
                      : { backgroundColor: '#f5f5f5', color: '#525252' }
                    }
                  >
                    {risk === null ? 'すべて' : riskStyle[risk as keyof typeof riskStyle].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y" style={{ borderColor: '#f5f5f5' }}>
              {filtered.map((student) => {
                const rs = riskStyle[student.risk as keyof typeof riskStyle];
                const isSelected = selectedStudent?.id === student.id;
                return (
                  <div
                    key={student.id}
                    onClick={() => { setSelectedStudent(student); setActiveTab('概要'); }}
                    className="px-5 py-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-neutral-50"
                    style={isSelected ? { backgroundColor: '#fafafa', borderLeft: '2px solid #111111' } : {}}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                      style={{ backgroundColor: '#0a0a0a' }}
                    >
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-black">{student.name}</span>
                        <span
                          className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: rs.bg, color: rs.text }}
                        >
                          <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: rs.dot }} />
                          {rs.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: '#a3a3a3' }}>テスト {student.score}点</span>
                        <span className="text-xs" style={{ color: '#a3a3a3' }}>提出率 {student.submissionRate}%</span>
                      </div>
                    </div>
                    {student.nextAction && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0"
                        style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}
                      >
                        {student.nextAction}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#d4d4d4' }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-5">
            {/* Next Actions */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
            >
              <div
                className="flex items-center gap-2 px-5 py-4"
                style={{ borderBottom: '1px solid #f5f5f5' }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                <h3 className="text-sm font-semibold text-black">次アクション提案</h3>
              </div>
              <div className="divide-y" style={{ maxHeight: '260px', overflowY: 'auto', borderColor: '#f5f5f5' }}>
                {nextActions.map((action) => {
                  return (
                    <div key={action.id} className="px-5 py-3.5 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: priorityDot[action.priority] }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-black">{action.student}</span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded font-medium"
                            style={{ backgroundColor: '#f5f5f5', color: '#525252', fontSize: '10px' }}
                          >
                            {action.action}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#737373' }}>{action.detail}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-2.5 h-2.5" style={{ color: '#d4d4d4' }} />
                          <span className="text-xs" style={{ color: '#a3a3a3' }}>{action.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Class Heatmap */}
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
            >
              <h3 className="text-sm font-semibold text-black mb-4">週別クラス状態</h3>
              <div className="space-y-3">
                {classHeatmap.map((row) => (
                  <div key={row.name}>
                    <div className="text-xs mb-1.5" style={{ color: '#737373' }}>{row.name}</div>
                    <div className="flex gap-1">
                      {(['week1', 'week2', 'week3', 'week4'] as const).map((wk, i) => (
                        <div
                          key={i}
                          className="flex-1 h-7 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{ backgroundColor: heatBg(row[wk]) }}
                        >
                          {row[wk]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-1">
                  {[90, 75, 65, 50].map((v) => (
                    <div key={v} className="w-3 h-3 rounded-sm" style={{ backgroundColor: heatBg(v) }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: '#a3a3a3' }}>高 → 低</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Detail */}
        {selectedStudent && (
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid #f5f5f5' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  {selectedStudent.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-black">{selectedStudent.name}</h3>
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: riskStyle[selectedStudent.risk as keyof typeof riskStyle].bg,
                        color: riskStyle[selectedStudent.risk as keyof typeof riskStyle].text,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ backgroundColor: riskStyle[selectedStudent.risk as keyof typeof riskStyle].dot }} />
                      {riskStyle[selectedStudent.risk as keyof typeof riskStyle].label}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#a3a3a3' }}>
                    {selectedStudent.activities.join(' · ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-colors"
                  style={{ border: '1px solid #e5e5e5', color: '#525252' }}
                >
                  <Mic className="w-3.5 h-3.5" />音声メモ
                </button>
                <button
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg text-white"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />面談設定
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: '#a3a3a3' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom: '1px solid #f5f5f5' }}>
              {tabLabels.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-3 text-sm font-medium border-b-2 transition-colors"
                  style={{
                    borderColor: activeTab === tab ? '#111111' : 'transparent',
                    color: activeTab === tab ? '#111111' : '#737373',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="px-5 py-5">
              {activeTab === '概要' && (
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#a3a3a3' }}>スコア</h4>
                    {[
                      { label: 'テスト点', value: `${selectedStudent.score}点` },
                      { label: '提出率', value: `${selectedStudent.submissionRate}%` },
                      { label: '最終面談', value: selectedStudent.lastInterview },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-2.5"
                        style={{ borderBottom: '1px solid #f5f5f5' }}
                      >
                        <span className="text-sm" style={{ color: '#737373' }}>{label}</span>
                        <span className="text-sm font-medium text-black">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#a3a3a3' }}>所見メモ</h4>
                    <p
                      className="text-sm leading-relaxed p-3.5 rounded-lg"
                      style={{ backgroundColor: '#fafafa', color: '#525252', border: '1px solid #f5f5f5' }}
                    >
                      {selectedStudent.memo}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#a3a3a3' }}>推奨アクション</h4>
                    {selectedStudent.nextAction ? (
                      <div
                        className="p-3.5 rounded-lg"
                        style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5' }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#111111' }} />
                          <span className="text-sm font-semibold text-black">{selectedStudent.nextAction}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#737373' }}>{selectedStudent.memo}</p>
                      </div>
                    ) : (
                      <div
                        className="p-3.5 rounded-lg flex items-center gap-2"
                        style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5' }}
                      >
                        <CheckCircle2 className="w-4 h-4" style={{ color: '#d4d4d4' }} />
                        <span className="text-sm" style={{ color: '#737373' }}>現時点で緊急アクション不要</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === '成績' && (
                <div className="space-y-2">
                  {['第1回定期テスト: 82点', '小テスト (5月): 74点', '中間テスト: ' + selectedStudent.score + '点', '模試 (10月): 71点'].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                    >
                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#a3a3a3' }} />
                      <span className="text-sm text-black">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === '提出物' && (
                <div className="space-y-2">
                  {[
                    { name: '数学ノート (11月)', status: '提出済', date: '11/10' },
                    { name: 'ワークシート vol.3', status: '未提出', date: '─' },
                    { name: '夏休み課題', status: '提出済', date: '9/1' },
                    { name: 'ワークシート vol.2', status: '遅延提出', date: '10/25' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                    >
                      <span className="text-sm text-black">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: '#a3a3a3' }}>{item.date}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{
                            backgroundColor: item.status === '提出済' ? '#f5f5f5' : item.status === '未提出' ? '#0a0a0a' : '#f5f5f5',
                            color: item.status === '提出済' ? '#525252' : item.status === '未提出' ? '#ffffff' : '#737373',
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === '面談メモ' && (
                <div className="space-y-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                  >
                    <p className="text-xs mb-2" style={{ color: '#a3a3a3' }}>前回の面談（{selectedStudent.lastInterview}）</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#525252' }}>{selectedStudent.memo}</p>
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors"
                    style={{ border: '2px dashed #e5e5e5', color: '#737373' }}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    音声メモを追加（30秒で記録）
                  </button>
                </div>
              )}

              {activeTab === '活動履歴' && (
                <div className="space-y-2">
                  {[...selectedStudent.activities.map((a) => ({ name: a, note: '参加中' })),
                    { name: '文化祭準備委員', note: '10月' },
                    { name: '体育大会', note: '9月' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                    >
                      <Users className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#a3a3a3' }} />
                      <span className="text-sm text-black flex-1">{item.name}</span>
                      <span className="text-xs" style={{ color: '#a3a3a3' }}>{item.note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
