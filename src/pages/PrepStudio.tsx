import { useState, useRef, useEffect } from 'react';
import {
  Search,
  Upload,
  FileText,
  ChevronRight,
  Send,
  Clock,
  Filter,
  Plus,
  Lightbulb,
  AlignLeft,
  MessageSquare,
  Sparkles,
  PenLine,
  ClipboardList,
  Printer,
  CheckSquare,
  Trash2,
  GripVertical,
  X,
  BookOpen,
  AlertTriangle,
  ChevronUp,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { materials, generatedLesson, generatedBoardPlan, generatedQuiz, materialDetails } from '../data/mockData';

// ---------- Editable board plan item ----------
type BoardSection = { label: string; color: string; items: string[] };

function EditableItem({
  value,
  onChange,
  onDelete,
  onEnter,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  autoFocus?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
      const len = ref.current.value.length;
      ref.current.setSelectionRange(len, len);
    }
  }, [autoFocus]);

  // Auto-resize textarea
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value, editing]);

  if (!editing) {
    return (
      <div
        className="group flex items-start gap-2 rounded-lg px-2 py-1 cursor-text hover:bg-black/5 transition-colors"
        onClick={() => setEditing(true)}
      >
        <GripVertical className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-30 transition-opacity" style={{ color: '#737373' }} />
        <p className="flex-1 text-sm text-black leading-relaxed whitespace-pre-wrap break-words">{value}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="opacity-0 group-hover:opacity-60 hover:!opacity-100 flex-shrink-0 mt-0.5 transition-opacity"
        >
          <Trash2 className="w-3 h-3" style={{ color: '#EF4444' }} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-lg px-2 py-1" style={{ outline: '2px solid #6366F1', outlineOffset: '-2px' }}>
      <GripVertical className="w-3.5 h-3.5 mt-1.5 flex-shrink-0 opacity-20" style={{ color: '#737373' }} />
      <textarea
        ref={ref}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => {
          onChange(e.target.value);
          if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
          }
        }}
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setEditing(false);
            onEnter();
          }
          if (e.key === 'Escape') setEditing(false);
          if (e.key === 'Backspace' && value === '') {
            e.preventDefault();
            onDelete();
          }
        }}
        rows={1}
        className="flex-1 text-sm text-black leading-relaxed resize-none outline-none bg-transparent"
        style={{ minHeight: '22px', overflowY: 'hidden' }}
      />
      <button
        onMouseDown={(e) => { e.preventDefault(); onDelete(); }}
        className="flex-shrink-0 mt-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-3 h-3" style={{ color: '#EF4444' }} />
      </button>
    </div>
  );
}
// ---------- end EditableItem ----------

// Tag colours — accent palette kept minimal (4 hues)
const tagColor: Record<string, { bg: string; text: string }> = {
  '方程式':  { bg: '#EEF2FF', text: '#4338CA' },
  '因数分解':{ bg: '#EEF2FF', text: '#4338CA' },
  '関数':    { bg: '#ECFDF5', text: '#065F46' },
  'グラフ':  { bg: '#ECFDF5', text: '#065F46' },
  '文字式':  { bg: '#FFF7ED', text: '#9A3412' },
  '展開':    { bg: '#FFF7ED', text: '#9A3412' },
  '証明':    { bg: '#F5F3FF', text: '#5B21B6' },
  '図形':    { bg: '#F5F3FF', text: '#5B21B6' },
  '確率':    { bg: '#FFF1F2', text: '#9F1239' },
  '場合の数':{ bg: '#FFF1F2', text: '#9F1239' },
  '連立':    { bg: '#F0F9FF', text: '#0C4A6E' },
};
const fallbackTag = { bg: '#F5F5F5', text: '#525252' };

const difficultyStyle: Record<string, { bg: string; text: string }> = {
  '基礎': { bg: '#ECFDF5', text: '#065F46' },
  '標準': { bg: '#EEF2FF', text: '#3730A3' },
  '発展': { bg: '#FFF7ED', text: '#9A3412' },
};

const mainTabConfig = [
  { id: 'timeline', label: 'タイムライン', icon: Clock },
  { id: 'questions', label: '発問案', icon: Lightbulb },
  { id: 'worksheet', label: 'ワークシート', icon: AlignLeft },
  { id: 'board', label: '板書計画', icon: PenLine },
  { id: 'quiz', label: '小テスト', icon: ClipboardList },
];

const activityTypeStyle: Record<string, { bar: string; label: string; bg: string }> = {
  review:    { bar: '#6366F1', label: '復習', bg: '#EEF2FF' },
  explain:   { bar: '#0EA5E9', label: '説明', bg: '#E0F2FE' },
  practice:  { bar: '#10B981', label: '演習', bg: '#ECFDF5' },
  challenge: { bar: '#F59E0B', label: '発展', bg: '#FEF3C7' },
};

const boardSectionColor: Record<string, { bar: string; label: string; bg: string }> = {
  blue:  { bar: '#3B82F6', label: '導入', bg: '#EFF6FF' },
  black: { bar: '#111111', label: '例題', bg: '#FAFAFA' },
  red:   { bar: '#EF4444', label: 'まとめ', bg: '#FFF1F2' },
};

const levelStyle: Record<string, { bg: string; text: string }> = {
  '基礎': { bg: '#ECFDF5', text: '#065F46' },
  '標準': { bg: '#EEF2FF', text: '#3730A3' },
  '発展': { bg: '#FFF7ED', text: '#9A3412' },
};

const initMessages = [
  { role: 'ai', text: '「二次方程式（因数分解）」の授業設計ドラフトが完成しました。修正したい点があれば教えてください。' },
  { role: 'user', text: 'このクラスは理解が遅い生徒が多いので、演習時間をもう少し増やしたいです。' },
  { role: 'ai', text: '承知しました。演習パートを「15–35分（20分）」に拡張し、発展問題は宿題へ移動しました。' },
];

type Material = typeof materials[0];

export function PrepStudio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('timeline');
  const [showGenerated, setShowGenerated] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonForm, setLessonForm] = useState({ unit: '', objective: '', classProfile: '' });
  const [messages, setMessages] = useState(initMessages);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Editable board plan state
  const generatedRef = useRef<HTMLDivElement>(null);

  const [boardSections, setBoardSections] = useState<BoardSection[]>(
    generatedBoardPlan.sections.map((s) => ({ ...s, items: [...s.items] }))
  );
  // Track which item to auto-focus (sectionIdx + itemIdx)
  const [focusTarget, setFocusTarget] = useState<{ si: number; ii: number } | null>(null);

  const scrollToGenerated = (delay = 50) => {
    setTimeout(() => {
      generatedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, delay);
  };

  const updateItem = (si: number, ii: number, val: string) => {
    setBoardSections((prev) => prev.map((sec, s) =>
      s !== si ? sec : { ...sec, items: sec.items.map((it, i) => i === ii ? val : it) }
    ));
  };

  const deleteItem = (si: number, ii: number) => {
    setBoardSections((prev) => prev.map((sec, s) => {
      if (s !== si) return sec;
      const items = sec.items.filter((_, i) => i !== ii);
      return { ...sec, items: items.length > 0 ? items : [''] };
    }));
  };

  const addItemAfter = (si: number, ii: number) => {
    setBoardSections((prev) => prev.map((sec, s) => {
      if (s !== si) return sec;
      const items = [...sec.items];
      items.splice(ii + 1, 0, '');
      return { ...sec, items };
    }));
    setFocusTarget({ si, ii: ii + 1 });
  };

  const addSection = () => {
    const colors = ['blue', 'black', 'red'];
    const nextColor = colors[boardSections.length % colors.length];
    setBoardSections((prev) => [...prev, { label: '新規セクション', color: nextColor, items: [''] }]);
    setFocusTarget({ si: boardSections.length, ii: 0 });
  };

  const deleteSection = (si: number) => {
    setBoardSections((prev) => prev.filter((_, i) => i !== si));
  };

  const updateSectionLabel = (si: number, label: string) => {
    setBoardSections((prev) => prev.map((sec, i) => i === si ? { ...sec, label } : sec));
  };

  const filtered = materials.filter(
    (m) => !searchQuery || m.title.includes(searchQuery) || m.tags.some((t) => t.includes(searchQuery))
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowGenerated(true);
      scrollToGenerated(100);
    }, 1800);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: 'ご要望を反映しました。タイムラインを更新しています。' }]);
    }, 800);
  };

  return (
    <Layout title="AI授業準備" subtitle="授業設計をたたき台から始める">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Stats Row */}
        <div
          className="rounded-xl px-6 py-4 flex items-center gap-8"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          {[
            { label: '登録教材', value: '127件' },
            { label: '生成済みドラフト', value: '23件' },
            { label: '今月の削減時間', value: '32分/日' },
          ].map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-6">
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
              教材をアップロード
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Material Library */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid #f5f5f5' }}
            >
              <h3 className="text-sm font-semibold text-black">教材ライブラリ</h3>
              <button className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg" style={{ color: '#737373' }}>
                <Filter className="w-3.5 h-3.5" />フィルタ
              </button>
            </div>
            <div className="px-5 py-3" style={{ borderBottom: '1px solid #f5f5f5' }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#a3a3a3' }} />
                <input
                  type="text"
                  placeholder="単元名・タグで検索"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 text-sm rounded-lg outline-none"
                  style={{ backgroundColor: '#f5f5f5', color: '#111111' }}
                />
              </div>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: selectedMaterial ? '200px' : '288px', transition: 'max-height 250ms ease' }}>
              {filtered.map((m) => {
                const ds = difficultyStyle[m.difficulty];
                const isSelected = selectedMaterial?.id === m.id;
                return (
                  <div
                    key={m.id}
                    className="px-5 py-3.5 flex items-start gap-3 cursor-pointer transition-colors"
                    style={{
                      borderBottom: '1px solid #f5f5f5',
                      backgroundColor: isSelected ? '#fafafa' : 'transparent',
                      borderLeft: isSelected ? '2px solid #111111' : '2px solid transparent',
                    }}
                    onClick={() => setSelectedMaterial(isSelected ? null : m)}
                  >
                    <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: isSelected ? '#111111' : '#a3a3a3' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-black truncate">{m.title}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-xs" style={{ color: '#a3a3a3' }}>{m.unit}</span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: ds.bg, color: ds.text }}
                        >
                          {m.difficulty}
                        </span>
                        {m.tags.slice(0, 2).map((tag) => {
                          const tc = tagColor[tag] ?? fallbackTag;
                          return (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: tc.bg, color: tc.text }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    {isSelected
                      ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#111111' }} />
                      : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#d4d4d4' }} />}
                  </div>
                );
              })}
            </div>

            {/* Material Preview Panel */}
            {selectedMaterial && (() => {
              const detail = materialDetails[selectedMaterial.id];
              const ds = difficultyStyle[selectedMaterial.difficulty];
              if (!detail) return null;
              return (
                <div
                  className="animate-fade-slide-up"
                  style={{ borderTop: '1px solid #e5e5e5' }}
                >
                  {/* Panel header */}
                  <div
                    className="flex items-center justify-between px-5 py-3.5"
                    style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f5f5f5' }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-black" />
                      <span className="text-sm font-semibold text-black truncate">{selectedMaterial.title}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={{ backgroundColor: ds.bg, color: ds.text }}
                      >
                        {selectedMaterial.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button
                        onClick={() => {
                          setLessonForm({ unit: selectedMaterial.title, objective: '', classProfile: '' });
                          setShowGenerated(false);
                        }}
                        className="text-xs px-2.5 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-80"
                        style={{ backgroundColor: '#0a0a0a' }}
                      >
                        この教材で授業設計
                      </button>
                      <button
                        onClick={() => setSelectedMaterial(null)}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#a3a3a3' }}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-xs leading-relaxed" style={{ color: '#525252' }}>{detail.overview}</p>
                  </div>

                  <div className="px-5 pb-4 grid grid-cols-2 gap-4">
                    {/* Key Points */}
                    <div>
                      <p className="text-xs font-semibold text-black mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#10B981' }} />
                        学習のポイント
                      </p>
                      <ul className="space-y-1">
                        {detail.keyPoints.map((kp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#10B981' }}>✓</span>
                            <span className="text-xs" style={{ color: '#525252' }}>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stumbling points */}
                    <div>
                      <p className="text-xs font-semibold text-black mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3" style={{ color: '#F59E0B' }} />
                        つまずきポイント
                      </p>
                      <ul className="space-y-1">
                        {detail.stumbling.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }}>!</span>
                            <span className="text-xs" style={{ color: '#525252' }}>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sample problems */}
                  <div
                    className="px-5 py-4"
                    style={{ borderTop: '1px solid #f5f5f5' }}
                  >
                    <p className="text-xs font-semibold text-black mb-3">例題・問題サンプル</p>
                    <div className="space-y-2">
                      {detail.sampleContent.map((sc, i) => (
                        <div
                          key={i}
                          className="rounded-lg p-3"
                          style={{
                            backgroundColor: sc.type === 'note' ? '#FFFBEB' : sc.type === 'example' ? '#EEF2FF' : '#FAFAFA',
                            border: `1px solid ${sc.type === 'note' ? '#FDE68A' : sc.type === 'example' ? '#C7D2FE' : '#F5F5F5'}`,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 mt-0.5"
                              style={
                                sc.type === 'note'
                                  ? { backgroundColor: '#F59E0B', color: '#fff' }
                                  : sc.type === 'example'
                                  ? { backgroundColor: '#6366F1', color: '#fff' }
                                  : { backgroundColor: '#e5e5e5', color: '#525252' }
                              }
                            >
                              {sc.type === 'note' ? '注意' : sc.type === 'example' ? '例題' : '問題'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-black">{sc.text}</p>
                              {sc.answer && (
                                <p className="text-xs mt-1" style={{ color: '#737373' }}>
                                  　→ {sc.answer}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related materials */}
                  {detail.relatedIds.length > 0 && (
                    <div
                      className="px-5 py-3"
                      style={{ borderTop: '1px solid #f5f5f5', backgroundColor: '#fafafa' }}
                    >
                      <p className="text-xs font-medium mb-2" style={{ color: '#a3a3a3' }}>関連教材</p>
                      <div className="flex gap-2 flex-wrap">
                        {detail.relatedIds.map((rid) => {
                          const rel = materials.find((m) => m.id === rid);
                          if (!rel) return null;
                          return (
                            <button
                              key={rid}
                              onClick={() => setSelectedMaterial(rel)}
                              className="text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                              style={{ border: '1px solid #e5e5e5', color: '#525252', backgroundColor: '#fff' }}
                            >
                              <FileText className="w-3 h-3" style={{ color: '#a3a3a3' }} />
                              {rel.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Generator */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
          >
            <div
              className="flex items-center gap-2 px-5 py-4"
              style={{ borderBottom: '1px solid #f5f5f5' }}
            >
              <Sparkles className="w-4 h-4" style={{ color: '#111111' }} />
              <h3 className="text-sm font-semibold text-black">授業設計ドラフト生成</h3>
            </div>
            <div className="px-5 py-5 space-y-4">
              {[
                { field: 'unit', label: '単元名', placeholder: '例：二次方程式（因数分解）' },
                { field: 'objective', label: '本時目標', placeholder: '例：因数分解を使って二次方程式を解ける' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#525252' }}>{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={lessonForm[field as keyof typeof lessonForm]}
                    onChange={(e) => setLessonForm({ ...lessonForm, [field]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ border: '1px solid #e5e5e5', color: '#111111' }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#525252' }}>クラスの特性</label>
                <textarea
                  placeholder="例：理解速度にばらつきあり、演習多めが効果的"
                  value={lessonForm.classProfile}
                  onChange={(e) => setLessonForm({ ...lessonForm, classProfile: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                  style={{ border: '1px solid #e5e5e5', color: '#111111' }}
                />
              </div>

              {/* Generate buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      AI生成中…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      授業設計ドラフトを生成（全セット）
                    </>
                  )}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setShowGenerated(true); setActiveTab('board'); scrollToGenerated(); }}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ border: '1px solid #e5e5e5', color: '#525252' }}
                  >
                    <PenLine className="w-3.5 h-3.5" />板書だけ生成
                  </button>
                  <button
                    onClick={() => { setShowGenerated(true); setActiveTab('quiz'); scrollToGenerated(); }}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ border: '1px solid #e5e5e5', color: '#525252' }}
                  >
                    <ClipboardList className="w-3.5 h-3.5" />小テストだけ生成
                  </button>
                </div>
                {!showGenerated && (
                  <button
                    onClick={() => setShowGenerated(true)}
                    className="w-full py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ border: '1px solid #e5e5e5', color: '#a3a3a3' }}
                  >
                    サンプルを表示
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Generated Content + Chat */}
        {showGenerated && (
          <div ref={generatedRef} className="grid grid-cols-3 gap-6">
            <div
              className="col-span-2 rounded-xl overflow-hidden"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid #f5f5f5' }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: '#111111' }} />
                    <h3 className="text-sm font-semibold text-black">生成されたドラフト</h3>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#a3a3a3' }}>
                    {generatedLesson.unit} · {generatedLesson.objective}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ border: '1px solid #e5e5e5', color: '#525252' }}
                  >
                    <Printer className="w-3 h-3" />印刷
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-lg text-white"
                    style={{ backgroundColor: '#0a0a0a' }}
                  >
                    保存
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto" style={{ borderBottom: '1px solid #f5f5f5' }}>
                {mainTabConfig.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex-shrink-0"
                    style={{
                      borderColor: activeTab === id ? '#111111' : 'transparent',
                      color: activeTab === id ? '#111111' : '#737373',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="px-5 py-5">
                {/* Timeline */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    {generatedLesson.timeline.map((item, i) => {
                      const s = activityTypeStyle[item.type];
                      return (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.bar }} />
                            {i < generatedLesson.timeline.length - 1 && (
                              <div className="w-px flex-1 mt-1" style={{ backgroundColor: '#f0f0f0', minHeight: '20px' }} />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-black">{item.time}</span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: s.bg, color: s.bar }}
                              >
                                {s.label}
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: '#525252' }}>{item.activity}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Questions */}
                {activeTab === 'questions' && (
                  <div className="space-y-3">
                    {generatedLesson.questions.map((q, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-lg"
                        style={{ backgroundColor: '#FAFBFF', border: '1px solid #EEF2FF' }}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ backgroundColor: '#6366F1', fontSize: '10px' }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm text-black leading-relaxed">{q}</p>
                        <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Worksheet */}
                {activeTab === 'worksheet' && (
                  <div className="space-y-3">
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#fafafa', border: '1px solid #f5f5f5' }}
                    >
                      <p className="text-xs font-medium mb-2" style={{ color: '#525252' }}>構成案</p>
                      <p className="text-sm text-black">{generatedLesson.worksheetOutline}</p>
                    </div>
                    {[
                      { label: '基礎問題 (×2)', level: '基礎' },
                      { label: '標準問題 (×2)', level: '標準' },
                      { label: '発展問題 (×1)', level: '発展' },
                      { label: '振り返り欄', level: null },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded flex-shrink-0" style={{ border: '1.5px solid #d4d4d4' }} />
                        <span className="text-sm text-black flex-1">{item.label}</span>
                        {item.level && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: levelStyle[item.level].bg, color: levelStyle[item.level].text }}
                          >
                            {item.level}
                          </span>
                        )}
                      </div>
                    ))}
                    <button
                      className="flex items-center gap-2 text-sm mt-2 transition-colors"
                      style={{ color: '#737373' }}
                    >
                      <Plus className="w-3.5 h-3.5" />問題を追加
                    </button>
                  </div>
                )}

                {/* Board Plan — Editable */}
                {activeTab === 'board' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs" style={{ color: '#a3a3a3' }}>
                        板書計画 — 45分授業想定 · クリックで編集 · Enterで次の行を追加
                      </p>
                    </div>

                    {boardSections.map((section, si) => {
                      const cs = boardSectionColor[section.color] ?? boardSectionColor['black'];
                      return (
                        <div
                          key={si}
                          className="rounded-xl overflow-hidden"
                          style={{ border: `1px solid ${cs.bar}28` }}
                        >
                          {/* Section header — editable label */}
                          <div
                            className="flex items-center justify-between px-4 py-2.5"
                            style={{ backgroundColor: cs.bg }}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cs.bar }} />
                              <input
                                className="text-xs font-semibold bg-transparent outline-none w-full"
                                style={{ color: cs.bar }}
                                value={section.label}
                                onChange={(e) => updateSectionLabel(si, e.target.value)}
                              />
                            </div>
                            {boardSections.length > 1 && (
                              <button
                                onClick={() => deleteSection(si)}
                                className="ml-2 opacity-40 hover:opacity-80 transition-opacity flex-shrink-0"
                                title="セクションを削除"
                              >
                                <Trash2 className="w-3 h-3" style={{ color: cs.bar }} />
                              </button>
                            )}
                          </div>

                          {/* Items */}
                          <div className="px-3 py-2.5 space-y-1">
                            {section.items.map((item, ii) => (
                              <EditableItem
                                key={`${si}-${ii}`}
                                value={item}
                                onChange={(v) => updateItem(si, ii, v)}
                                onDelete={() => deleteItem(si, ii)}
                                onEnter={() => addItemAfter(si, ii)}
                                autoFocus={focusTarget?.si === si && focusTarget?.ii === ii}
                              />
                            ))}
                            <button
                              onClick={() => addItemAfter(si, section.items.length - 1)}
                              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors w-full text-left"
                              style={{ color: '#a3a3a3' }}
                            >
                              <Plus className="w-3 h-3" />行を追加
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={addSection}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed text-sm w-full justify-center transition-colors"
                      style={{ borderColor: '#e5e5e5', color: '#737373' }}
                    >
                      <Plus className="w-3.5 h-3.5" />セクションを追加
                    </button>
                  </div>
                )}

                {/* Quiz */}
                {activeTab === 'quiz' && (
                  <div className="space-y-4">
                    {/* Header */}
                    <div
                      className="rounded-xl p-4 flex items-center justify-between"
                      style={{ backgroundColor: '#FAFAFA', border: '1px solid #F5F5F5' }}
                    >
                      <div>
                        <p className="text-sm font-semibold text-black">{generatedQuiz.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#a3a3a3' }}>
                          制限時間 {generatedQuiz.timeLimit} · {generatedQuiz.problems.length}問
                        </p>
                      </div>
                      <button
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-white"
                        style={{ backgroundColor: '#0a0a0a' }}
                      >
                        <Printer className="w-3 h-3" />印刷用PDF
                      </button>
                    </div>

                    {/* Problems */}
                    <div className="space-y-2.5">
                      {generatedQuiz.problems.map((p) => {
                        const ls = levelStyle[p.level];
                        return (
                          <div
                            key={p.num}
                            className="rounded-xl p-4"
                            style={{ backgroundColor: '#ffffff', border: '1px solid #f5f5f5' }}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                                style={{ backgroundColor: '#0a0a0a', fontSize: '11px' }}
                              >
                                {p.num}
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{ backgroundColor: ls.bg, color: ls.text }}
                                  >
                                    {p.level}
                                  </span>
                                </div>
                                <p className="text-sm text-black font-medium">{p.question}</p>
                                <div className="mt-2 h-8 rounded" style={{ backgroundColor: '#fafafa', border: '1px dashed #e5e5e5' }} />
                              </div>
                              <div className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f5f5f5', color: '#a3a3a3' }}>
                                答：{p.answer}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reflection */}
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckSquare className="w-3.5 h-3.5" style={{ color: '#0EA5E9' }} />
                        <p className="text-xs font-semibold" style={{ color: '#0C4A6E' }}>振り返り</p>
                      </div>
                      <p className="text-sm" style={{ color: '#0C4A6E' }}>{generatedQuiz.reflection}</p>
                      <div className="mt-2 h-8 rounded" style={{ backgroundColor: 'white', border: '1px dashed #BAE6FD' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat */}
            <div
              className="rounded-xl overflow-hidden flex flex-col"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
            >
              <div
                className="flex items-center gap-2 px-5 py-4"
                style={{ borderBottom: '1px solid #f5f5f5' }}
              >
                <MessageSquare className="w-3.5 h-3.5" style={{ color: '#737373' }} />
                <h3 className="text-sm font-semibold text-black">壁打ち編集</h3>
              </div>
              <div className="flex-1 px-5 py-4 space-y-3 overflow-y-auto" style={{ maxHeight: '360px' }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[85%] text-sm leading-relaxed px-3.5 py-2.5"
                      style={
                        msg.role === 'user'
                          ? { backgroundColor: '#0a0a0a', color: '#ffffff', borderRadius: '12px 12px 2px 12px' }
                          : { backgroundColor: '#f5f5f5', color: '#111111', borderRadius: '12px 12px 12px 2px' }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3.5" style={{ borderTop: '1px solid #f5f5f5' }}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="修正したい点を打つか話す…"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: '#f5f5f5', color: '#111111' }}
                  />
                  <button
                    onClick={handleSend}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: '#0a0a0a' }}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
