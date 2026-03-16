import { useState } from 'react';
import {
  Mic, Upload, Play, CheckCircle2, Clock, Star,
  Video, TrendingUp, Award, MessageSquare, ChevronRight, Sparkles, Users,
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { Layout } from '../components/Layout';
import { skillData, skillScoreTrend, learningContents, roleplays, lessonFeedback } from '../data/mockData';

const progressColor = (p: number) => p === 100 ? '#111111' : p > 0 ? '#525252' : '#e5e5e5';

export function GrowthStudio() {
  const [activeRoleplay, setActiveRoleplay] = useState<number | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [analyzingAudio, setAnalyzingAudio] = useState(false);

  const handleAudioAnalyze = () => {
    setAnalyzingAudio(true);
    setTimeout(() => { setAnalyzingAudio(false); setShowFeedback(true); }, 2000);
  };

  const totalCompleted = learningContents.filter((c) => c.progress === 100).length;

  return (
    <Layout title="AI先生コーチング" subtitle="授業力・対人力を見える化し、次の成長につなげる">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Stats */}
        <div
          className="rounded-xl px-6 py-4 flex items-center gap-8"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          {[
            { label: 'ロープレ実施（今月）', value: '2回' },
            { label: `学習コンテンツ（修了 ${totalCompleted}/${learningContents.length}）`, value: `${Math.round((totalCompleted / learningContents.length) * 100)}%` },
            { label: '授業分析（今月）', value: '1回' },
            { label: 'スキルスコア（総合）', value: '73' },
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

        {/* Row 1: Radar + Trend Chart */}
        <div className="grid grid-cols-3 gap-6">
          {/* Skill Radar — col 1 */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: '#737373' }} />
              <h3 className="text-sm font-semibold text-black">スキル可視化</h3>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={skillData}>
                <PolarGrid stroke="#e5e5e5" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#525252' }} />
                <Radar
                  name="スキル"
                  dataKey="A"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  dot={{ fill: '#6366F1', r: 3 }}
                />
                <Tooltip
                  formatter={(v) => [`${v}点`]}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e5e5' }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {skillData.slice(0, 3).map((s, i) => {
                const barColors = ['#6366F1', '#10B981', '#F59E0B'];
                return (
                  <div key={s.subject} className="flex items-center gap-3">
                    <span className="text-xs w-20 truncate" style={{ color: '#737373' }}>{s.subject}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
                      <div className="h-full rounded-full" style={{ width: `${s.A}%`, backgroundColor: barColors[i] }} />
                    </div>
                    <span className="text-xs font-medium text-black w-6 text-right">{s.A}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Score Trend — col 2-3 */}
          <div
            className="col-span-2 rounded-xl p-5"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                <h3 className="text-sm font-semibold text-black">スキル推移</h3>
              </div>
              <div className="flex items-center gap-4">
                {[
                  { label: '総合点', color: '#6366F1' },
                  { label: '授業設計力', color: '#10B981' },
                  { label: '発問・対話力', color: '#F59E0B' },
                  { label: '学級経営力', color: '#a3a3a3' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-xs" style={{ color: '#a3a3a3' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={skillScoreTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v}点`]}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e5e5', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                  labelStyle={{ color: '#111111', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="total" name="総合点" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 3, fill: '#6366F1' }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="授業設計力" stroke="#10B981" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="発問対話力" stroke="#F59E0B" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="学級経営力" stroke="#a3a3a3" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[
                { label: '今月の総合点', value: '73点', delta: '+1', up: true },
                { label: '最高スキル', value: '授業設計力', delta: '80点', up: null },
                { label: '成長中', value: '発問・対話力', delta: '+7 (4月比)', up: true },
                { label: '改善優先', value: '保護者対応力', delta: '58点', up: false },
              ].map(({ label, value, delta, up }) => (
                <div
                  key={label}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                >
                  <div className="text-xs mb-1" style={{ color: '#a3a3a3' }}>{label}</div>
                  <div className="text-sm font-semibold text-black">{value}</div>
                  <div
                    className="text-xs mt-0.5 font-medium"
                    style={{ color: up === true ? '#10B981' : up === false ? '#EF4444' : '#737373' }}
                  >
                    {delta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Roleplay + Feedback */}
        <div className="grid grid-cols-3 gap-6">
          {/* AI Roleplay — col 1 */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div
              className="flex items-center gap-2 px-5 py-4"
              style={{ borderBottom: '1px solid #f5f5f5' }}
            >
              <MessageSquare className="w-3.5 h-3.5" style={{ color: '#737373' }} />
              <h3 className="text-sm font-semibold text-black">AIロープレ</h3>
            </div>

            {activeRoleplay === null ? (
              <div className="p-4 space-y-2">
                {roleplays.map((rp) => {
                  const isNew = !rp.completedAt;
                  return (
                    <div
                      key={rp.id}
                      className="rounded-xl p-4 cursor-pointer transition-colors hover:bg-neutral-50"
                      style={{
                        border: `1px solid ${isNew ? '#111111' : '#f5f5f5'}`,
                        backgroundColor: isNew ? '#fafafa' : '#ffffff',
                      }}
                      onClick={() => setActiveRoleplay(rp.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: isNew ? '#0a0a0a' : '#f5f5f5' }}
                        >
                          <MessageSquare className={`w-3.5 h-3.5 ${isNew ? 'text-white' : ''}`} style={isNew ? {} : { color: '#a3a3a3' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-medium text-black">{rp.title}</span>
                            {isNew && (
                              <span
                                className="text-xs px-1.5 py-0.5 rounded font-medium"
                                style={{ backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '10px' }}
                              >
                                推薦
                              </span>
                            )}
                          </div>
                          <p className="text-xs mb-2" style={{ color: '#737373' }}>{rp.scenario}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs flex items-center gap-1" style={{ color: '#a3a3a3' }}>
                              <Clock className="w-3 h-3" />{rp.duration}
                            </span>
                            {rp.score && (
                              <span className="text-xs flex items-center gap-0.5 font-medium" style={{ color: '#525252' }}>
                                <Star className="w-3 h-3" />{rp.score}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#d4d4d4' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-5">
                <div
                  className="rounded-xl overflow-hidden mb-4"
                  style={{ backgroundColor: '#0a0a0a', aspectRatio: '16/9' }}
                >
                  <div className="h-full flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#1f1f1f' }}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-xs font-medium">AI生徒（田中 太郎）</p>
                    <p className="text-xs" style={{ color: '#525252' }}>「先生、この問題わかりません」</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#f5f5f5' }}
                  >
                    <Video className="w-4 h-4" style={{ color: '#525252' }} />
                  </button>
                  <button
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: '#0a0a0a' }}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveRoleplay(null)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: '#737373' }}
                  >
                    <span className="text-xs font-bold">終</span>
                  </button>
                </div>
                <p className="text-center text-xs mt-3" style={{ color: '#a3a3a3' }}>00:02:34</p>
              </div>
            )}
          </div>

          {/* Lesson Audio Feedback — col 2-3 */}
          <div
            className="col-span-2 rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div
              className="flex items-center gap-2 px-5 py-4"
              style={{ borderBottom: '1px solid #f5f5f5' }}
            >
              <Mic className="w-3.5 h-3.5" style={{ color: '#737373' }} />
              <h3 className="text-sm font-semibold text-black">授業フィードバック</h3>
            </div>
            <div className="p-5">
              {!showFeedback ? (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed" style={{ color: '#737373' }}>
                    授業音声をアップロードするとAIが発話量・発問数・対話バランスを分析します。
                  </p>
                  <div
                    className="rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all"
                    style={{
                      border: `2px dashed ${uploadedAudio ? '#111111' : '#e5e5e5'}`,
                      backgroundColor: uploadedAudio ? '#fafafa' : 'transparent',
                    }}
                    onClick={() => setUploadedAudio(true)}
                  >
                    {uploadedAudio ? (
                      <>
                        <CheckCircle2 className="w-7 h-7" style={{ color: '#111111' }} />
                        <p className="text-sm font-medium text-black">音声を読み込みました</p>
                        <p className="text-xs" style={{ color: '#a3a3a3' }}>授業_20251118.mp3</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-7 h-7" style={{ color: '#d4d4d4' }} />
                        <p className="text-sm" style={{ color: '#737373' }}>音声ファイルをアップロード</p>
                        <p className="text-xs" style={{ color: '#a3a3a3' }}>MP3 / M4A / WAV</p>
                      </>
                    )}
                  </div>
                  {uploadedAudio && (
                    <button
                      onClick={handleAudioAnalyze}
                      disabled={analyzingAudio}
                      className="w-full py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-80 disabled:opacity-50"
                      style={{ backgroundColor: '#0a0a0a' }}
                    >
                      {analyzingAudio ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          分析中…
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          フィードバックを受け取る
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs" style={{ color: '#a3a3a3' }}>{lessonFeedback.date} · {lessonFeedback.unit}</p>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5" style={{ color: '#737373' }}>
                      <span>先生 {lessonFeedback.speakingTime}%</span>
                      <span>生徒 {lessonFeedback.studentTalkTime}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden flex" style={{ backgroundColor: '#f5f5f5' }}>
                      <div className="h-full" style={{ width: `${lessonFeedback.speakingTime}%`, backgroundColor: '#111111' }} />
                      <div className="h-full flex-1" style={{ backgroundColor: '#d4d4d4' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                    >
                      <div className="text-xl font-bold text-black">{lessonFeedback.questionCount}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#a3a3a3' }}>発問数</div>
                    </div>
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                    >
                      <div className="text-xl font-bold text-black">B+</div>
                      <div className="text-xs mt-0.5" style={{ color: '#a3a3a3' }}>総合評価</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-black mb-2">良かった点</p>
                    {lessonFeedback.highlights.map((h, i) => (
                      <p key={i} className="text-xs mb-1.5 pl-3 leading-relaxed" style={{ borderLeft: '2px solid #111111', color: '#525252' }}>{h}</p>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black mb-2">改善ポイント</p>
                    {lessonFeedback.improvements.map((imp, i) => (
                      <p key={i} className="text-xs mb-1.5 pl-3 leading-relaxed" style={{ borderLeft: '2px solid #d4d4d4', color: '#525252' }}>{imp}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Learning Contents */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #f5f5f5' }}
          >
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5" style={{ color: '#737373' }} />
              <h3 className="text-sm font-semibold text-black">学習コンテンツ</h3>
            </div>
            <span className="text-xs" style={{ color: '#a3a3a3' }}>{totalCompleted}/{learningContents.length} 修了</span>
          </div>
          <div>
            {learningContents.map((content, i) => (
              <div
                key={content.id}
                className="px-5 py-4 flex items-center gap-4 cursor-pointer transition-colors hover:bg-neutral-50"
                style={{ borderBottom: i < learningContents.length - 1 ? '1px solid #f5f5f5' : 'none' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: content.progress === 100 ? '#0a0a0a' : '#f5f5f5' }}
                >
                  {content.progress === 100
                    ? <CheckCircle2 className="w-4 h-4 text-white" />
                    : <Play className="w-4 h-4" style={{ color: '#a3a3a3' }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-black truncate">{content.title}</p>
                    {content.badge && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                        style={{ backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '10px' }}
                      >
                        {content.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: '#a3a3a3' }}>{content.category}</span>
                    <span className="text-xs flex items-center gap-0.5" style={{ color: '#a3a3a3' }}>
                      <Clock className="w-3 h-3" />{content.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-24 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${content.progress}%`, backgroundColor: progressColor(content.progress) }}
                      />
                    </div>
                    <span className="text-xs w-7 text-right font-medium" style={{ color: '#525252' }}>{content.progress}%</span>
                  </div>
                  <button
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80"
                    style={content.progress === 100
                      ? { backgroundColor: '#f5f5f5', color: '#525252' }
                      : { backgroundColor: '#0a0a0a', color: '#ffffff' }
                    }
                  >
                    {content.progress === 100 ? '復習' : content.progress > 0 ? '続ける' : '開始'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
