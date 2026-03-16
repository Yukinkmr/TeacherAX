// ===== 共通 =====
export const currentTeacher = {
  name: '田中 太郎',
  subject: '数学',
  grade: '中学2年',
  avatar: '田',
  school: '桜台中学校',
};

// ===== Dashboard =====
export const kpiData = {
  prepTimeSaved: 32,
  gradeTimeSaved: 19,
  prepTimeSavedTarget: 30,
  gradeTimeSavedTarget: 18,
  studentAlerts: 3,
  nextLessonIn: '2時間後',
};

export const todayActions = [
  {
    id: 1,
    type: 'prep',
    title: '明日の授業「二次方程式」の設計ドラフトが完成しています',
    priority: 'high',
    label: 'AI授業準備',
    time: '9:00',
  },
  {
    id: 2,
    type: 'grade',
    title: '2年A組 先週の小テスト未返却：田村 翔太・山本 葵の再指導を推薦',
    priority: 'high',
    label: 'AI成績管理',
    time: '10:30',
  },
  {
    id: 3,
    type: 'pulse',
    title: '佐藤 悠斗 — 3週連続で提出物遅延。面談優先度：高',
    priority: 'urgent',
    label: 'AI生徒記録',
    time: '12:00',
  },
  {
    id: 4,
    type: 'growth',
    title: 'AIロープレ「保護者対応」の推奨セッションが届いています',
    priority: 'medium',
    label: 'AI先生コーチング',
    time: '放課後',
  },
];

export const recentActivities = [
  { id: 1, time: '昨日 16:23', text: 'AI授業準備 ─「一次関数」授業ドラフト生成完了', icon: 'prep' },
  { id: 2, time: '昨日 14:05', text: 'AI成績管理 ─ 中間テスト成績CSV取り込み・分析完了', icon: 'grade' },
  { id: 3, time: '昨日 11:30', text: 'AI先生コーチング ─ AIロープレ「生徒指導」30分実施', icon: 'growth' },
  { id: 4, time: '一昨日 15:00', text: 'AI生徒記録 ─ 2年A組 学期サマリー更新', icon: 'pulse' },
];

// ===== Prep Studio =====
export const materials = [
  { id: 1, title: '二次方程式 ─ 因数分解による解法', subject: '数学', grade: '中2', unit: '第3章', difficulty: '標準', tags: ['方程式', '因数分解'], lastUsed: '2週間前' },
  { id: 2, title: '一次関数のグラフと変化の割合', subject: '数学', grade: '中2', unit: '第2章', difficulty: '基礎', tags: ['関数', 'グラフ'], lastUsed: '1ヶ月前' },
  { id: 3, title: '文字式の計算 ─ 展開と因数分解', subject: '数学', grade: '中2', unit: '第1章', difficulty: '発展', tags: ['文字式', '展開'], lastUsed: '2ヶ月前' },
  { id: 4, title: '証明問題 入門ワークシート', subject: '数学', grade: '中2', unit: '第4章', difficulty: '発展', tags: ['証明', '図形'], lastUsed: '3ヶ月前' },
  { id: 5, title: '確率 ─ 場合の数と樹形図', subject: '数学', grade: '中2', unit: '第5章', difficulty: '標準', tags: ['確率', '場合の数'], lastUsed: '未使用' },
  { id: 6, title: '連立方程式 解き方まとめ', subject: '数学', grade: '中2', unit: '第2章', difficulty: '基礎', tags: ['方程式', '連立'], lastUsed: '1週間前' },
];

export const generatedLesson = {
  unit: '二次方程式',
  objective: '因数分解を使って二次方程式を解くことができる',
  classProfile: '理解速度にばらつきあり、演習多めが効果的',
  timeline: [
    { time: '0-5分', activity: '前回の復習クイズ（因数分解3問）', type: 'review' },
    { time: '5-15分', activity: '本日の目標提示・例題解説（板書）', type: 'explain' },
    { time: '15-30分', activity: 'ペアワーク演習（標準5問）', type: 'practice' },
    { time: '30-40分', activity: '発展問題チャレンジ（選択制）', type: 'challenge' },
    { time: '40-45分', activity: 'まとめ・振り返りカード記入', type: 'review' },
  ],
  questions: [
    '「因数分解を使うと何が便利か、前回の内容から考えてみよう」',
    '「x²+5x+6=0 はどう解くか、まず自分で考えてみよう」',
    '「解が2つになる理由を言葉で説明できる人は？」',
    '「もし因数分解できないときはどうすればよいだろうか？」',
  ],
  worksheetOutline: '確認問題5問（基礎→標準→発展）+ 振り返り欄',
};

export const materialDetails: Record<number, {
  overview: string;
  keyPoints: string[];
  stumbling: string[];
  sampleContent: { type: 'problem' | 'note' | 'example'; text: string; answer?: string }[];
  relatedIds: number[];
}> = {
  1: {
    overview: '二次方程式 ax²+bx+c=0 を因数分解の手法で解く単元。解が2つ存在することへの理解が中心。',
    keyPoints: ['因数分解のパターン認識', '右辺を0にそろえる操作', '積＝0 のとき少なくとも一方が0'],
    stumbling: ['右辺を0にそろえ忘れる', '重解（解が1つ）の扱い', '因数分解できない場合の判断'],
    sampleContent: [
      { type: 'example', text: 'x²＋5x＋6＝0', answer: '(x＋2)(x＋3)＝0　→　x＝－2, x＝－3' },
      { type: 'example', text: 'x²－4x＋3＝0', answer: '(x－1)(x－3)＝0　→　x＝1, x＝3' },
      { type: 'problem', text: 'x²＋7x＋12＝0 を解け', answer: 'x＝－3, x＝－4' },
      { type: 'problem', text: '2x²－8x＝0 を解け', answer: 'x＝0, x＝4' },
      { type: 'note', text: '【つまずきポイント】右辺が0でない式（例：x²＋5x＝6）はまず右辺を0にする操作が必要。' },
    ],
    relatedIds: [3, 6],
  },
  2: {
    overview: '一次関数 y＝ax＋b のグラフと変化の割合の関係を理解する。傾き・切片の意味を視覚的に把握することが目標。',
    keyPoints: ['変化の割合＝傾き a', 'グラフの傾きと切片の読み取り', '2点から式を求める手順'],
    stumbling: ['傾きと変化の割合の混同', 'x増加量を1以外でとる計算ミス', '負の傾きのグラフの向き'],
    sampleContent: [
      { type: 'example', text: 'y＝2x＋3 のグラフを描け', answer: '切片(0, 3)、傾き2（x＋1ごとにy＋2）' },
      { type: 'example', text: '点(1,5)と(3,9)を通る一次関数の式', answer: '傾き＝(9－5)/(3－1)＝2　→　y＝2x＋3' },
      { type: 'problem', text: 'y＝－3x＋1 の変化の割合を答えよ', answer: '－3' },
      { type: 'problem', text: '点(0,2)と(4,10)を通る一次関数の式を求めよ', answer: 'y＝2x＋2' },
      { type: 'note', text: '【視覚化のコツ】グラフ用紙に切片→傾きの順でプロットし、方向感覚をつかませる。' },
    ],
    relatedIds: [3, 5],
  },
  3: {
    overview: '文字式の展開と因数分解。乗法公式を使った展開、および公式の逆操作としての因数分解を習得する。',
    keyPoints: ['(a＋b)²、(a－b)²、(a＋b)(a－b) の公式', '共通因数でくくる', '公式を逆に使う因数分解'],
    stumbling: ['(a＋b)²＝a²＋b² の誤りを防ぐ', '符号ミス（特に－のかっこ展開）', '係数付き二次式の因数分解'],
    sampleContent: [
      { type: 'example', text: '(x＋3)² を展開せよ', answer: 'x²＋6x＋9' },
      { type: 'example', text: 'x²－9 を因数分解せよ', answer: '(x＋3)(x－3)' },
      { type: 'problem', text: '(2x＋1)² を展開せよ', answer: '4x²＋4x＋1' },
      { type: 'problem', text: '3x²－12 を因数分解せよ', answer: '3(x＋2)(x－2)' },
      { type: 'note', text: '【頻出ミス】(a－b)²＝a²－2ab＋b² の中間項の符号に注意。' },
    ],
    relatedIds: [1, 6],
  },
  4: {
    overview: '「～を証明しなさい」形式の記述問題への入門。根拠を明示した論理的な記述の練習。',
    keyPoints: ['仮定と結論の整理', '根拠を「○○だから」で明示する書き方', '対頂角・平行線・合同条件の活用'],
    stumbling: ['「明らかである」で済ませる曖昧な記述', '根拠の順序の逆転', '合同条件の選択ミス'],
    sampleContent: [
      { type: 'example', text: '【例題】∠AOC＝∠BOD を証明せよ（対頂角）', answer: '対頂角は等しいから ∠AOC＝∠BOD' },
      { type: 'problem', text: '三角形 ABC と三角形 DEF が合同であることを証明せよ（条件付き）', answer: '3辺相等(SSS)、2辺夾角(SAS)、2角夾辺(ASA)のいずれかで対応する' },
      { type: 'note', text: '【構成の型】①仮定の整理 → ②中間的な事実（根拠付き） → ③結論、の3段構成を徹底する。' },
    ],
    relatedIds: [1, 3],
  },
  5: {
    overview: '確率の基礎。樹形図・表を使って起こりうる場合を数え、確率を求める。',
    keyPoints: ['同様に確からしい', '樹形図で全事象を列挙', '(求める事象の数)÷(全事象の数)'],
    stumbling: ['順序のある場合とない場合の混同', '樹形図の枝の抜け・重複', '確率と割合の区別'],
    sampleContent: [
      { type: 'example', text: 'コインを2枚投げたとき、2枚とも表になる確率', answer: '全事象:{表表, 表裏, 裏表, 裏裏}→ 1/4' },
      { type: 'example', text: '1～6のサイコロを2回振り、和が7になる確率', answer: '(1,6)(2,5)(3,4)(4,3)(5,2)(6,1) → 6/36＝1/6' },
      { type: 'problem', text: '3枚のコインを投げて少なくとも1枚表が出る確率を求めよ', answer: '1－(全部裏)＝1－1/8＝7/8' },
      { type: 'note', text: '【樹形図のコツ】第1投→第2投の順に書き、各分岐を同じ間隔で描くと抜け・重複を防げる。' },
    ],
    relatedIds: [2, 3],
  },
  6: {
    overview: '連立方程式（加減法・代入法）の解き方と活用。文章題への応用まで含めた実践的な単元。',
    keyPoints: ['加減法：係数をそろえて足し引き', '代入法：一方を他方に代入', '文章題での変数設定'],
    stumbling: ['符号ミス（引き算での符号変換）', '代入後の計算ミス', '文章題での単位・変数の設定誤り'],
    sampleContent: [
      { type: 'example', text: '【加減法】x＋y＝5, 2x－y＝4', answer: '加えると 3x＝9 → x＝3, y＝2' },
      { type: 'example', text: '【代入法】y＝2x, x＋y＝9', answer: 'x＋2x＝9 → 3x＝9 → x＝3, y＝6' },
      { type: 'problem', text: '3x＋2y＝12, x－y＝1 を解け', answer: 'x＝2, y＝3' },
      { type: 'problem', text: 'りんご1個とみかん2個で280円、りんご3個とみかん1個で380円。各値段を求めよ', answer: 'りんご100円、みかん90円' },
      { type: 'note', text: '【加減法のコツ】係数を最小公倍数にそろえてから足し引きする手順を定着させる。' },
    ],
    relatedIds: [1, 3],
  },
};

export const generatedBoardPlan = {
  unit: '二次方程式',
  sections: [
    {
      label: '導入',
      color: 'blue',
      items: [
        '【本時の目標】ax²+bx+c=0 を因数分解で解く',
        '【前回の確認】因数分解の公式: (x+a)(x+b)=x²+(a+b)x+ab',
      ],
    },
    {
      label: '例題',
      color: 'black',
      items: [
        '【例題1】x²+5x+6=0',
        '　→ (x+2)(x+3)=0',
        '　→ x=-2, x=-3',
        '【例題2】x²-4x+3=0',
        '　→ (x-1)(x-3)=0',
        '　→ x=1, x=3',
      ],
    },
    {
      label: 'まとめ',
      color: 'red',
      items: [
        '【手順】① 右辺を0にそろえる → ② 因数分解 → ③ 解を求める',
        '【注意】解は必ず2つ（重解もあり）',
      ],
    },
  ],
};

export const generatedQuiz = {
  unit: '二次方程式',
  title: '小テスト ─ 二次方程式（因数分解）',
  timeLimit: '10分',
  problems: [
    { level: '基礎', num: 1, question: 'x²+3x+2=0 を解け', answer: 'x=-1, x=-2' },
    { level: '基礎', num: 2, question: 'x²-5x+6=0 を解け', answer: 'x=2, x=3' },
    { level: '標準', num: 3, question: 'x²+x-6=0 を解け', answer: 'x=2, x=-3' },
    { level: '標準', num: 4, question: '2x²-8x=0 を解け', answer: 'x=0, x=4' },
    { level: '発展', num: 5, question: 'x²-4x+4=0 を解け（重解に注意）', answer: 'x=2（重解）' },
  ],
  reflection: '今日学んだことを1文でまとめよう：',
};

// ===== Grade Intelligence =====
export const students = [
  { id: 1, name: '青木 結衣', score: 88, prev: 82, attendance: 98, submission: 100, risk: 'low' },
  { id: 2, name: '石川 蓮', score: 72, prev: 78, attendance: 95, submission: 90, risk: 'medium' },
  { id: 3, name: '上田 彩花', score: 91, prev: 89, attendance: 100, submission: 100, risk: 'low' },
  { id: 4, name: '遠藤 陸', score: 55, prev: 60, attendance: 88, submission: 75, risk: 'high' },
  { id: 5, name: '加藤 萌', score: 79, prev: 74, attendance: 97, submission: 95, risk: 'low' },
  { id: 6, name: '木村 颯太', score: 63, prev: 65, attendance: 92, submission: 80, risk: 'medium' },
  { id: 7, name: '小林 菜摘', score: 84, prev: 80, attendance: 99, submission: 100, risk: 'low' },
  { id: 8, name: '斎藤 翔', score: 47, prev: 52, attendance: 82, submission: 60, risk: 'high' },
  { id: 9, name: '佐藤 悠斗', score: 68, prev: 71, attendance: 85, submission: 55, risk: 'high' },
  { id: 10, name: '田村 翔太', score: 58, prev: 63, attendance: 90, submission: 70, risk: 'medium' },
];

export const classScoreHistory = [
  { month: '4月', avg: 71, classA: 72, classB: 68 },
  { month: '5月', avg: 73, classA: 75, classB: 70 },
  { month: '6月', avg: 70, classA: 71, classB: 68 },
  { month: '7月', avg: 75, classA: 77, classB: 73 },
  { month: '9月', avg: 74, classA: 76, classB: 72 },
  { month: '10月', avg: 72, classA: 74, classB: 69 },
  { month: '11月', avg: 76, classA: 78, classB: 73 },
];

export const subjectAnalysis = [
  { subject: '代数', correct: 78 },
  { subject: '幾何', correct: 65 },
  { subject: '関数', correct: 72 },
  { subject: '確率', correct: 58 },
  { subject: '図形', correct: 69 },
];

export const aiActions = [
  { type: 'remedial', label: '補習推薦', students: ['斎藤 翔', '遠藤 陸', '佐藤 悠斗'], reason: '定期テスト平均を20点以上下回っています' },
  { type: 'resubmit', label: '再提出', students: ['斎藤 翔', '佐藤 悠斗', '田村 翔太'], reason: '提出率60%以下・内容不十分' },
  { type: 'contact', label: '保護者連絡候補', students: ['遠藤 陸', '佐藤 悠斗'], reason: '成績下降 + 欠席増加トレンド' },
  { type: 'reteach', label: '再説明単元', students: [], reason: '確率分野の正答率が58%と低い。クラス全体への再指導を推奨' },
];

// ===== Growth Studio =====
export const skillScoreTrend = [
  { month: '4月',  total: 68, 授業設計力: 72, 発問対話力: 55, 学級経営力: 62 },
  { month: '5月',  total: 70, 授業設計力: 74, 発問対話力: 57, 学級経営力: 64 },
  { month: '6月',  total: 69, 授業設計力: 73, 発問対話力: 56, 学級経営力: 63 },
  { month: '7月',  total: 72, 授業設計力: 76, 発問対話力: 60, 学級経営力: 67 },
  { month: '9月',  total: 71, 授業設計力: 77, 発問対話力: 61, 学級経営力: 68 },
  { month: '10月', total: 73, 授業設計力: 78, 発問対話力: 63, 学級経営力: 70 },
  { month: '11月', total: 73, 授業設計力: 80, 発問対話力: 65, 学級経営力: 72 },
];

export const skillData = [
  { subject: '授業設計力', A: 80, fullMark: 100 },
  { subject: '発問・対話力', A: 65, fullMark: 100 },
  { subject: '学級経営力', A: 72, fullMark: 100 },
  { subject: '教材研究力', A: 88, fullMark: 100 },
  { subject: '保護者対応力', A: 58, fullMark: 100 },
  { subject: '生徒指導力', A: 70, fullMark: 100 },
];

export const learningContents = [
  { id: 1, title: '効果的な発問の設計', category: '授業設計', duration: '25分', progress: 100, badge: '修了' },
  { id: 2, title: '学習困難な生徒への個別対応', category: '生徒指導', duration: '30分', progress: 60, badge: null },
  { id: 3, title: 'アクティブラーニングの実践', category: '授業設計', duration: '40分', progress: 0, badge: null },
  { id: 4, title: '保護者面談の進め方', category: '保護者対応', duration: '20分', progress: 0, badge: null },
  { id: 5, title: 'データで読む学習定着度', category: '評価活用', duration: '35分', progress: 30, badge: null },
];

export const roleplays = [
  { id: 1, title: '生徒指導ロープレ', scenario: '授業中の私語への対応', duration: '15分', completedAt: '3日前', score: 78 },
  { id: 2, title: '保護者対応ロープレ', scenario: '成績低下の説明と面談', duration: '20分', completedAt: '1週間前', score: 85 },
  { id: 3, title: 'AI生徒との対話練習', scenario: '理解が遅れている生徒への個別説明', duration: '10分', completedAt: null, score: null },
];

export const lessonFeedback = {
  date: '2025-11-18',
  unit: '一次関数',
  speakingTime: 65,
  studentTalkTime: 35,
  questionCount: 8,
  highlights: [
    '発問頻度が高く、生徒の思考を促す場面が多く見られました',
    '導入での前回復習が効果的にリンクされていました',
  ],
  improvements: [
    '発展問題の解説時間が予定より5分オーバー → タイム管理の工夫を',
    '後列の生徒への発言機会が少ない傾向あり',
  ],
};

// ===== Student Pulse =====
export const studentProfiles = [
  {
    id: 1,
    name: '青木 結衣',
    avatar: '青',
    risk: 'low',
    score: 88,
    submissionRate: 100,
    lastInterview: '2週間前',
    nextAction: null,
    tags: ['優秀', '積極的'],
    memo: '数学への意欲が高い。理系志望。',
    activities: ['生徒会副会長', '数学部'],
  },
  {
    id: 4,
    name: '遠藤 陸',
    avatar: '遠',
    risk: 'high',
    score: 55,
    submissionRate: 75,
    lastInterview: '1ヶ月前',
    nextAction: '保護者連絡',
    tags: ['要支援', '欠席増'],
    memo: '家庭環境の変化あり。放課後声かけ要。',
    activities: ['サッカー部（休部中）'],
  },
  {
    id: 8,
    name: '斎藤 翔',
    avatar: '斎',
    risk: 'high',
    score: 47,
    submissionRate: 60,
    lastInterview: '3週間前',
    nextAction: '補習案内',
    tags: ['要支援', '提出遅延'],
    memo: '基礎計算に課題。個別補習を提案済。',
    activities: ['バスケ部'],
  },
  {
    id: 9,
    name: '佐藤 悠斗',
    avatar: '佐',
    risk: 'high',
    score: 68,
    submissionRate: 55,
    lastInterview: '2ヶ月前',
    nextAction: '面談設定',
    tags: ['要支援', '面談未実施'],
    memo: '3週連続で提出物遅延。本人と話す機会を作りたい。',
    activities: ['吹奏楽部'],
  },
  {
    id: 3,
    name: '上田 彩花',
    avatar: '上',
    risk: 'low',
    score: 91,
    submissionRate: 100,
    lastInterview: '1ヶ月前',
    nextAction: null,
    tags: ['優秀', 'リーダー'],
    memo: '学習意欲・リーダーシップともに高い。',
    activities: ['学級委員', '陸上部'],
  },
  {
    id: 6,
    name: '木村 颯太',
    avatar: '木',
    risk: 'medium',
    score: 63,
    submissionRate: 80,
    lastInterview: '3週間前',
    nextAction: '再提出確認',
    tags: ['注意観察'],
    memo: '成績はやや下降。部活との両立で疲れ気味か。',
    activities: ['野球部（主将）'],
  },
];

export const classHeatmap = [
  { name: '提出率', week1: 92, week2: 88, week3: 85, week4: 78 },
  { name: '参加度', week1: 88, week2: 85, week3: 82, week4: 80 },
  { name: '小テスト平均', week1: 76, week2: 74, week3: 72, week4: 70 },
];

export const nextActions = [
  { id: 1, priority: 'urgent', student: '佐藤 悠斗', action: '面談設定', detail: '3週連続提出遅延。本日放課後が推奨タイミング', dueDate: '本日' },
  { id: 2, priority: 'high', student: '遠藤 陸', action: '保護者連絡', detail: '成績下降 + 欠席増加。家庭状況の確認が必要', dueDate: '今週中' },
  { id: 3, priority: 'high', student: '斎藤 翔', action: '補習案内', detail: '次回テストまでに基礎計算の補強が必要', dueDate: '今週中' },
  { id: 4, priority: 'medium', student: '木村 颯太', action: '声かけ', detail: '部活疲れによるモチベーション低下の可能性', dueDate: '来週' },
  { id: 5, priority: 'medium', student: 'クラス全体', action: '確率単元の再指導', detail: '正答率58%。次回授業の冒頭15分で復習推奨', dueDate: '次の授業' },
];
