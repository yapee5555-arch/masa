import { CropItem, SeasonalCalendarEntry, HomesteadPreset, HomesteadGuideArticle } from './types';

export const INITIAL_CROPS: CropItem[] = [
  // 主食・高カロリー
  {
    id: 'sweet_potato',
    name: 'さつまいも（紅はるか等）',
    category: 'staple',
    categoryName: '主食・炭水化物',
    allocatedAreaSqm: 40,
    yieldPerSqmKg: 3.5,
    caloriesPerKg: 1300,
    proteinPerKg: 12,
    difficulty: '易しい',
    plantingMonths: [5, 6],
    harvestMonths: [10, 11],
    storageLife: 'もみ殻・新聞紙に包み常温13〜15℃で約半年保存可能',
    companionPlant: 'マリーゴールド、大豆',
    benefitDescription: '自給自足の生命線。痩せ地でも育ち、単位面積あたりのカロリー生産力が全作物中トップクラス。',
    enabled: true
  },
  {
    id: 'potato',
    name: 'じゃがいも（春作・秋作）',
    category: 'staple',
    categoryName: '主食・炭水化物',
    allocatedAreaSqm: 35,
    yieldPerSqmKg: 2.8,
    caloriesPerKg: 760,
    proteinPerKg: 16,
    difficulty: '易しい',
    plantingMonths: [2, 3, 8, 9],
    harvestMonths: [6, 7, 11, 12],
    storageLife: '冷暗所・通気性の良い箱で3〜5ヶ月保存可能',
    companionPlant: 'インゲン豆、ネギ',
    benefitDescription: '年2回収穫可能で端境期を支える主食。加熱しても壊れにくいビタミンCを大量に保持。',
    enabled: true
  },
  {
    id: 'rice_paddy',
    name: '主食米（水田または陸稲）',
    category: 'staple',
    categoryName: '主食・炭水化物',
    allocatedAreaSqm: 80,
    yieldPerSqmKg: 0.5,
    caloriesPerKg: 3560,
    proteinPerKg: 61,
    difficulty: '普通',
    plantingMonths: [4, 5],
    harvestMonths: [9, 10],
    storageLife: '玄米・籾保存で1〜2年長期常温備蓄が可能',
    companionPlant: 'レンゲ草（緑肥）、アイガモ',
    benefitDescription: '日本人の体質に最も適したエネルギー源。水田があれば連作障害がなく毎年安定収穫。',
    enabled: true
  },
  {
    id: 'pumpkin',
    name: '西洋カボチャ（栗カボチャ）',
    category: 'staple',
    categoryName: '主食・炭水化物',
    allocatedAreaSqm: 25,
    yieldPerSqmKg: 2.2,
    caloriesPerKg: 910,
    proteinPerKg: 19,
    difficulty: '易しい',
    plantingMonths: [4, 5],
    harvestMonths: [8, 9],
    storageLife: '常温風通しの良い日陰で冬至（12月下旬）以降まで約4ヶ月保存',
    companionPlant: 'トウモロコシ（立体混植）、ネギ',
    benefitDescription: '高カロリーかつβカロテン・食物繊維が凝縮。冬場に貴重な天然の甘味と主食代替になります。',
    enabled: true
  },

  // タンパク質・豆類・養鶏
  {
    id: 'soybean',
    name: '大豆（フクユタカ・青大豆）',
    category: 'protein',
    categoryName: 'タンパク質・豆類',
    allocatedAreaSqm: 50,
    yieldPerSqmKg: 0.35,
    caloriesPerKg: 4170,
    proteinPerKg: 350,
    difficulty: '易しい',
    plantingMonths: [6, 7],
    harvestMonths: [10, 11],
    storageLife: '乾燥状態で密閉容器保存すれば2〜3年常温劣化なし',
    companionPlant: 'トウモロコシ、サツマイモ',
    benefitDescription: '「畑の肉」。根粒菌で土を豊かにし、自家製味噌・醤油・豆腐・納豆の全原料になります。',
    enabled: true
  },
  {
    id: 'broad_bean',
    name: 'そら豆 ＆ スナップエンドウ',
    category: 'protein',
    categoryName: 'タンパク質・豆類',
    allocatedAreaSqm: 20,
    yieldPerSqmKg: 1.2,
    caloriesPerKg: 1080,
    proteinPerKg: 74,
    difficulty: '易しい',
    plantingMonths: [10, 11],
    harvestMonths: [4, 5],
    storageLife: '豆ご飯・冷凍保存、または乾燥熟成',
    companionPlant: '大麦、ニンニク',
    benefitDescription: '越冬して春の端境期（野菜が少ない時期）に極上の植物性タンパク質をもたらします。',
    enabled: true
  },

  // 野菜・ビタミン・保存根菜
  {
    id: 'onion_garlic',
    name: '玉ねぎ ＆ ニンニク',
    category: 'vegetable',
    categoryName: '野菜・根菜',
    allocatedAreaSqm: 25,
    yieldPerSqmKg: 4.0,
    caloriesPerKg: 370,
    proteinPerKg: 10,
    difficulty: '易しい',
    plantingMonths: [10, 11],
    harvestMonths: [5, 6],
    storageLife: '軒下に吊るして乾燥させることで翌冬まで半年以上保存',
    companionPlant: 'トマト、ナス、イチゴ（病気予防）',
    benefitDescription: '毎日の料理に欠かせない香味ベース。吊り下げ保存性が極めて高く、天然の抗菌成分が豊富。',
    enabled: true
  },
  {
    id: 'daikon_carrot',
    name: '大根 ＆ 人参',
    category: 'vegetable',
    categoryName: '野菜・根菜',
    allocatedAreaSqm: 25,
    yieldPerSqmKg: 5.0,
    caloriesPerKg: 280,
    proteinPerKg: 8,
    difficulty: '易しい',
    plantingMonths: [8, 9],
    harvestMonths: [11, 12, 1, 2],
    storageLife: '土中埋設保存、または切り干し大根（天日乾燥で1年）',
    companionPlant: 'エダマメ、マリーゴールド',
    benefitDescription: '冬の自給生活の主役。土に埋めておけば冬中いつでも収穫でき、乾燥させれば栄養価が劇的にアップ。',
    enabled: true
  },
  {
    id: 'tomato_summer',
    name: 'トマト ＆ 夏野菜（ナス・ピーマン）',
    category: 'vegetable',
    categoryName: '野菜・果菜',
    allocatedAreaSqm: 20,
    yieldPerSqmKg: 4.5,
    caloriesPerKg: 200,
    proteinPerKg: 7,
    difficulty: '普通',
    plantingMonths: [4, 5],
    harvestMonths: [7, 8, 9],
    storageLife: '自家製トマトソース瓶詰め・天日ドライトマト（長期保存）',
    companionPlant: 'バジル、ニラ（病気予防・味向上）',
    benefitDescription: '盛夏のビタミン・抗酸化リコピンの宝庫。煮詰めてピューレ瓶詰めにすれば冬の味付けに活用可能。',
    enabled: true
  },
  {
    id: 'winter_greens',
    name: '白菜・キャベツ・青菜（小松菜等）',
    category: 'vegetable',
    categoryName: '野菜・葉物',
    allocatedAreaSqm: 25,
    yieldPerSqmKg: 3.8,
    caloriesPerKg: 180,
    proteinPerKg: 14,
    difficulty: '普通',
    plantingMonths: [8, 9, 3, 4],
    harvestMonths: [11, 12, 1, 2, 5],
    storageLife: '外葉を縛って畑で越冬、または乳酸発酵漬け（古漬け）',
    companionPlant: 'キク科植物（春菊・レタスで害虫忌避）',
    benefitDescription: '寒気に当たると糖度が増す冬の緑黄色野菜。漬物にすることで乳酸菌と腸内環境を整えます。',
    enabled: true
  },
  {
    id: 'green_onion_nira',
    name: '一本ネギ ＆ ニラ（宿根多年草）',
    category: 'vegetable',
    categoryName: '野菜・薬味',
    allocatedAreaSqm: 10,
    yieldPerSqmKg: 3.0,
    caloriesPerKg: 340,
    proteinPerKg: 19,
    difficulty: '易しい',
    plantingMonths: [3, 4, 9],
    harvestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    storageLife: '畑に生やしたまま通年順次収穫',
    companionPlant: 'ウリ科（キュウリ・スイカ・カボチャのつる割れ病防止）',
    benefitDescription: '一度植えれば毎年収穫できる多年草。根に共生する拮抗菌が周囲の野菜の土壌病害を防ぐ守護神。',
    enabled: true
  },

  // 果樹・ナッツ・保存用果実
  {
    id: 'ume_persimmon',
    name: '梅 ＆ 渋柿（果樹スペース）',
    category: 'fruit',
    categoryName: '果樹・保存果実',
    allocatedAreaSqm: 25,
    yieldPerSqmKg: 2.0,
    caloriesPerKg: 550,
    proteinPerKg: 6,
    difficulty: '普通',
    plantingMonths: [11, 12, 2, 3],
    harvestMonths: [6, 10, 11],
    storageLife: '梅干し（塩分18%で10年以上保存可能）、干し柿（半年）',
    companionPlant: 'クローバー（下草グランドカバー）',
    benefitDescription: '梅干しは防腐・疲労回復・体調管理の神薬。干し柿は貴重な高カロリー糖分補給源。',
    enabled: true
  },
  {
    id: 'chestnut_nuts',
    name: '栗 ＆ クルミ（ナッツ果樹）',
    category: 'fruit',
    categoryName: '果樹・ナッツ',
    allocatedAreaSqm: 30,
    yieldPerSqmKg: 1.2,
    caloriesPerKg: 1640,
    proteinPerKg: 28,
    difficulty: '普通',
    plantingMonths: [11, 12],
    harvestMonths: [9, 10],
    storageLife: '乾燥・低温熟成、または冷凍で1年保存可能',
    companionPlant: '雑木林、落葉樹',
    benefitDescription: '植物性油脂とミネラルの宝庫。米に混ぜて栗ご飯にすることで主食のカロリー密度を高めます。',
    enabled: false
  }
];

export const HOMESTEAD_PRESETS: HomesteadPreset[] = [
  {
    id: 'preset_balcony_plot',
    name: '市民農園・ベランダ菜園（約30㎡ / 9坪）',
    tagline: '毎日の新鮮野菜＆ハーブから始めるプチ自給生活',
    landAreaSqm: 30,
    adults: 2,
    children: 0,
    crops: {
      sweet_potato: 6,
      potato: 6,
      rice_paddy: 0,
      pumpkin: 3,
      soybean: 0,
      broad_bean: 3,
      onion_garlic: 4,
      daikon_carrot: 3,
      tomato_summer: 4,
      winter_greens: 3,
      green_onion_nira: 2,
      ume_persimmon: 0,
      chestnut_nuts: 0
    },
    infra: {
      solarWatts: 200,
      batteryKwh: 1,
      woodStove: false,
      rainWaterTankLiters: 100,
      hasWell: false,
      compostBins: 1,
      chickensCount: 0
    },
    description: '週末の作業で、サラダ用野菜や薬味、季節の小規模な芋掘りを実現。手軽なポータブルソーラーでスマホ・ランタン電源も確保。',
    iconName: 'Sprout'
  },
  {
    id: 'preset_suburban_garden',
    name: '郊外の一軒家ガーデン（約150㎡ / 45坪）',
    tagline: '野菜・芋類の半自給 ＆ 節電オフグリッド',
    landAreaSqm: 150,
    adults: 2,
    children: 1,
    crops: {
      sweet_potato: 30,
      potato: 25,
      rice_paddy: 0,
      pumpkin: 15,
      soybean: 20,
      broad_bean: 10,
      onion_garlic: 15,
      daikon_carrot: 15,
      tomato_summer: 10,
      winter_greens: 15,
      green_onion_nira: 5,
      ume_persimmon: 10,
      chestnut_nuts: 0
    },
    infra: {
      solarWatts: 800,
      batteryKwh: 3,
      woodStove: false,
      rainWaterTankLiters: 300,
      hasWell: false,
      compostBins: 2,
      chickensCount: 0
    },
    description: '主食の補助（さつまいも・じゃがいも・カボチャ）と季節の野菜はほぼ自給。自家製味噌の仕込みにも挑戦できる充実設計。',
    iconName: 'Home'
  },
  {
    id: 'preset_satoyama_homestead',
    name: '里山・古民家本格自給（約600㎡ / 180坪）',
    tagline: '食料・卵・薪熱源の80%自給を実現する黄金モデル',
    landAreaSqm: 600,
    adults: 3,
    children: 1,
    crops: {
      sweet_potato: 80,
      potato: 60,
      rice_paddy: 150,
      pumpkin: 35,
      soybean: 80,
      broad_bean: 30,
      onion_garlic: 40,
      daikon_carrot: 40,
      tomato_summer: 25,
      winter_greens: 40,
      green_onion_nira: 10,
      ume_persimmon: 30,
      chestnut_nuts: 20
    },
    infra: {
      solarWatts: 2400,
      batteryKwh: 7,
      woodStove: true,
      rainWaterTankLiters: 1000,
      hasWell: true,
      compostBins: 3,
      chickensCount: 4
    },
    description: '水田または陸稲、平飼い養鶏（4羽で毎日3〜4個の卵）、薪ストーブでの暖房＆調理、自家製味噌・醤油まで賄う自立ライフ。',
    iconName: 'Trees'
  },
  {
    id: 'preset_complete_offgrid',
    name: '完全自給・オフグリッド開墾（約1500㎡ / 450坪）',
    tagline: '電力・水・食料の完全自給（100%オフグリッド）',
    landAreaSqm: 1500,
    adults: 4,
    children: 2,
    crops: {
      sweet_potato: 200,
      potato: 150,
      rice_paddy: 400,
      pumpkin: 80,
      soybean: 200,
      broad_bean: 60,
      onion_garlic: 80,
      daikon_carrot: 90,
      tomato_summer: 50,
      winter_greens: 80,
      green_onion_nira: 20,
      ume_persimmon: 50,
      chestnut_nuts: 60
    },
    infra: {
      solarWatts: 5000,
      batteryKwh: 15,
      woodStove: true,
      rainWaterTankLiters: 3000,
      hasWell: true,
      compostBins: 5,
      chickensCount: 8
    },
    description: '外部インフラに依存せず、命を支える全ての食料・エネルギー・水資源を自給。循環型農業による究極の持続可能性。',
    iconName: 'ShieldCheck'
  }
];

export const SEASONAL_CALENDAR: SeasonalCalendarEntry[] = [
  {
    month: 1,
    monthName: '1月',
    season: '厳冬',
    farmTasks: ['天地返し（寒起こしで土壌病害虫を死滅させる）', '果樹の冬季剪定', '落葉コンポストの切り返し'],
    preservationTasks: ['大豆の味噌寒仕込み（雑菌が少なく最高の仕上がり）', '切り干し大根作り', '白菜の乳酸発酵漬け（古漬け）'],
    harvestHighlights: ['越冬大根', '甘みが増したちぢみほうれん草', 'ネギ'],
    gapPeriodWarning: '畑の成長が停止する時期。保存してある芋類や豆類、干し野菜を計画的に消費。'
  },
  {
    month: 2,
    monthName: '2月',
    season: '初春',
    farmTasks: ['春ジャガイモの種芋準備・植え付け（暖地）', '夏野菜の温床育苗（トマト・ナス）開始', '鶏糞・堆肥の元肥投入'],
    preservationTasks: ['寒大豆の納豆づくり', '凍み豆腐（高野豆腐）作り', '燻製肉・ベーコンの仕込み'],
    harvestHighlights: ['冬キャベツ', '人参', '蕗の薹（ふきのとう）'],
    gapPeriodWarning: '春先の野菜不足に備え、種芋の保存状態を再点検。'
  },
  {
    month: 3,
    monthName: '3月',
    season: '春',
    farmTasks: ['春ジャガイモ本植え', '春播き葉物野菜（小松菜・カブ・レタス）播種', '夏野菜の鉢上げ'],
    preservationTasks: ['山菜（フキノトウ・ツクシ・カンゾウ）の佃煮・酢漬け', '味噌の天地返し準備'],
    harvestHighlights: ['菜花', '越冬小松菜', '早春の野草・山菜'],
    gapPeriodWarning: '⚠️【端境期スタート】冬野菜がトウ立ち（花芽）し硬くなる時期。秋に干した切干大根や乾燥豆、冷凍保存を活用！'
  },
  {
    month: 4,
    monthName: '4月',
    season: '春',
    farmTasks: ['畝立て・マルチ張り', '夏野菜用コンパニオンプランツ（ネギ・マリーゴールド）混植準備', 'サツマイモ苗床準備'],
    preservationTasks: ['筍（タケノコ）の茹で水煮瓶詰め', '野草茶（スギナ・ヨモギ）の天日干し'],
    harvestHighlights: ['春キャベツ', '新玉ねぎ（早生）', 'スナップエンドウ'],
    gapPeriodWarning: '⚠️【端境期ピーク】年間で最も生鮮野菜が少なくなる時期。早生エンドウや筍、野草を貴重なビタミン源に。'
  },
  {
    month: 5,
    monthName: '5月',
    season: '初夏',
    farmTasks: ['夏野菜（トマト・ナス・キュウリ・ピーマン）定植', 'サツマイモの挿し苗植え付け', '落花生播種'],
    preservationTasks: ['実山椒の塩漬け・醤油漬け', '春イチゴの無添加ジャム仕込み'],
    harvestHighlights: ['そら豆', '絹さや', 'アスパラガス', '新ニンニク'],
    gapPeriodWarning: 'そら豆やエンドウ豆が収穫開始！良質な植物性タンパク質が一気に補給されます。'
  },
  {
    month: 6,
    monthName: '6月',
    season: '初夏',
    farmTasks: ['玉ねぎ・ニンニクの一斉収穫＆軒下吊るし乾燥', '大豆の本播き', '田植え（水田）'],
    preservationTasks: ['青梅の梅干し漬け込み（塩分18%）', '梅酒・梅シロップ仕込み', 'らっきょうの甘酢漬け'],
    harvestHighlights: ['玉ねぎ', 'ニンニク', 'じゃがいも（春作収穫）', 'ズッキーニ'],
  },
  {
    month: 7,
    monthName: '7月',
    season: '盛夏',
    farmTasks: ['夏野菜の誘引・わき芽かき', '草マルチによる地温上昇・乾燥防止', '雨水タンクの満水維持'],
    preservationTasks: ['天日ドライトマト・ドライナス作り', '赤紫蘇による梅干しの本漬け', 'バジルペースト瓶詰め'],
    harvestHighlights: ['トマト', 'ナス', 'キュウリ', '枝豆', 'トウモロコシ'],
  },
  {
    month: 8,
    monthName: '8月',
    season: '盛夏',
    farmTasks: ['カボチャの収穫＆風乾（キュアリング）', '秋野菜（大根・人参・白菜・キャベツ）の育苗・播種', '秋ジャガ植え付け'],
    preservationTasks: ['梅の三日三晩の天日干し（梅干し完成）', 'トマトピューレの高温殺菌瓶詰め'],
    harvestHighlights: ['カボチャ', 'スイカ', 'ピーマン', 'オクラ', 'モロヘイヤ'],
  },
  {
    month: 9,
    monthName: '9月',
    season: '秋',
    farmTasks: ['大根・カブの間引き', 'タマネギ・ニンニクの秋植え準備', '稲刈り・ハゼ掛け天日干し'],
    preservationTasks: ['新米の籾・玄米低温貯蔵', '栗の渋皮煮・天日乾燥', '乾燥ハーブの調合'],
    harvestHighlights: ['新米', '栗', '秋ナス', '落花生（塩茹で）'],
  },
  {
    month: 10,
    monthName: '10月',
    season: '秋',
    farmTasks: ['サツマイモの大収穫＆もみ殻冷暗所貯蔵', 'タマネギ苗の定植', '麦（小麦・大麦）の播種'],
    preservationTasks: ['干し芋（蒸して天日干し）作り', 'サツマイモのデンプン抽出・粉末化', 'キノコの天日乾燥'],
    harvestHighlights: ['サツマイモ', '落花生', '秋枝豆（丹波黒豆）', '里芋'],
  },
  {
    month: 11,
    monthName: '11月',
    season: '初冬',
    farmTasks: ['大豆の刈り取り・島立て乾燥・脱穀', '玉ねぎ・エンドウの霜よけ草マルチ', '薪割り・薪棚への蓄積'],
    preservationTasks: ['渋柿の皮剥き＆吊るし干し柿作り', '大根の天日干し（沢庵・切り干し）', '生姜の土中保存'],
    harvestHighlights: ['大豆', '新そば', '大根', '小松菜', 'ごぼう'],
  },
  {
    month: 12,
    monthName: '12月',
    season: '初冬',
    farmTasks: ['大根の土中埋設保存（冬越しの天然冷蔵庫）', '白菜の外葉結束', '鶏小屋の防寒対策'],
    preservationTasks: ['冬至カボチャの調理・備蓄確認', '自家製たくあん（米ぬか塩漬け）', '餅つき・保存用鏡餅'],
    harvestHighlights: ['白菜', 'キャベツ', 'カブ', '越冬人参', 'ネギ'],
    gapPeriodWarning: '収穫物を外気に晒さず、土中・冷暗所・もみ殻・燻製庫に正しく分散保存しましょう。'
  }
];

export const HOMESTEAD_GUIDES: HomesteadGuideArticle[] = [
  {
    id: 'guide_calorie_strategy',
    category: 'storage',
    categoryLabel: '食料戦略',
    title: '飢餓を防ぐ「カロリー自給」の黄金比率',
    summary: '野菜（葉物・果菜）だけでは人は生きていけません。真の自給自足は「主食（さつまいも・じゃがいも・米・大豆）」の確保から逆算します。',
    steps: [
      '成人1人が1年間に必要なエネルギーは約75万〜80万kcal（約2,100〜2,200kcal/日）。',
      '野菜類（トマトやキャベツなど）はビタミンや食物繊維には優れますが、1kgあたりわずか150〜250kcal程度しかありません。',
      '一方、サツマイモ（1,300kcal/kg）、米（3,560kcal/kg）、大豆（4,170kcal/kg）は圧倒的なエネルギー密度を誇ります。',
      '土地が狭い場合は、痩せ地でも育ち1㎡あたり約4,500kcalを生む「さつまいも」を最優先で割り振るのが自給の極意です。'
    ],
    keyAdvice: '「畑の半分をまず主食・高カロリー作物（芋・豆）に割り当て、残りの半分で彩り野菜や薬味を育てる」のが成功の絶対原則です。'
  },
  {
    id: 'guide_companion_planting',
    category: 'companion',
    categoryLabel: '農薬不要の知恵',
    title: '虫食い・病気を自然に防ぐ「コンパニオンプランツ」の組み合わせ',
    summary: '化学農薬を使わずに、異なる性質の植物を一緒に植えることで、病害虫を防ぎ、成長を促進し、土を肥やす伝統技法。',
    steps: [
      '【トマト × バジル・ニラ】ニラの根の共生菌がトマトの青枯病を防ぎ、バジルが害虫を忌避し実の糖度を高める。',
      '【キュウリ・スイカ × ネギ】ウリ科の天敵である「つる割れ病」の病原菌を、ネギの根が分泌する抗生物質が撃退。',
      '【サツマイモ・キャベツ × マリーゴールド】センチュウ（線虫）を強力に殺滅し、天敵のアブラムシ除けになる。',
      '【トウモロコシ × インゲン豆 × カボチャ（三姉妹農法）】トウモロコシが支柱になり、豆が窒素を固定し、カボチャの大きな葉が地表を覆って雑草を防ぐ。'
    ],
    keyAdvice: '単一作物を一列にずらりと並べる（モノカルチャー）のではなく、多品種を混植・パッチワーク状に植えるのが無農薬の秘訣です。'
  },
  {
    id: 'guide_living_compost',
    category: 'soil',
    categoryLabel: '土作りと循環',
    title: '家庭の生ゴミ・落ち葉・雑草を黄金の黒土に変える「バイオコンポスト」',
    summary: '化学肥料を買わずに、身の回りの有機物を発酵させて完全循環型肥料を生み出す方法。',
    steps: [
      '【材料の黄金比（炭素C：窒素N比）】茶色いもの（落ち葉・枯れ草・籾殻・段ボール＝炭素）7割に対し、緑のもの（生ゴミ・米ぬか・鶏糞＝窒素）3割をミルフィーユ状に積層。',
      '【適正水分量】手でギュッと握って水滴が滲み出ず、開くとおにぎりのように形が崩れない状態（水分50〜60%）を維持。',
      '【好気性発酵の熱】2〜3日後には中心温度が60℃〜70℃まで上昇。この高温で病原菌や雑草の種が完全に死滅します。',
      '【切り返し】2週間に1回、外側と内側を天地返しして空気（酸素）を送り込み、約2〜3ヶ月で甘い森の匂いがする完熟堆肥が完成。'
    ],
    keyAdvice: '悪臭（腐敗臭）がしたら水分過多または酸素不足の合図。乾いた落ち葉や籾殻を追加してしっかり混ぜ込みましょう。'
  },
  {
    id: 'guide_hunger_gap',
    category: 'gap_period',
    categoryLabel: '越冬・危機管理',
    title: '春の「端境期（はざかいき）」を完全攻略する保存食ローテーション',
    summary: '日本の自然農で最も食料が尽きやすい3月〜5月上旬。この時期を生き延びる伝統の備蓄知恵。',
    steps: [
      '冬野菜（大根・白菜）は花が咲くと筋張って食べられなくなるため、2月中に全て収穫し「切り干し大根」や「乳酸漬け」に加工。',
      'さつまいもは10℃以下になると低温障害で腐るため、13〜15℃（室内押し入れなど）でもみ殻に埋めて春まで越冬させる。',
      '秋に収穫した大豆を1〜2月に「手前味噌」として仕込み、前年仕込んだ味噌を解禁して良質なたんぱく源に。',
      '春先はフキノトウ、セリ、ツクシ、カンゾウ、タラの芽などの「野生の野草」を積極的に採取して不足しがちなビタミンを補填。'
    ],
    keyAdvice: '自給自足の腕前は「夏の収穫期」ではなく「春の端境期に食卓がどれだけ豊かか」で決まります。'
  },
  {
    id: 'guide_offgrid_energy',
    category: 'energy',
    categoryLabel: 'オフグリッド',
    title: 'DIYで組む「独立型太陽光発電（オフグリッド電力）」の基礎設計',
    summary: '電柱からの商用電源に頼らず、太陽光パネル＋チャージコントローラー＋蓄電池で暮らしの基本電力を賄う。',
    steps: [
      '【消費電力の把握】LED照明（10W×4時間=40Wh）、スマホ充電（15Wh×2台=30Wh）、超省エネ冷蔵庫（300Wh/日）、PC（150Wh）＝合計約500〜600Wh/日。',
      '【太陽光パネル選定】晴天時の実効発電時間を3.5時間と仮定すると、300W〜400Wのソーラーパネルで1日約1,000〜1,400Whを発電可能。',
      '【蓄電池（リン酸鉄リチウムイオン・LiFePO4）】雨や曇天が2〜3日続いても大丈夫なように、最低でも1.5kWh〜2.5kWhのバッテリー容量を用意。',
      '【熱源は電気を使わない】炊飯・暖房・給湯に電気を使うと膨大なバッテリーが必要になるため、熱源は「薪ストーブ」「ロケットコンロ」「太陽熱温水器」で賄うのが基本。'
    ],
    keyAdvice: '「熱は火と太陽で、電気は通信と夜間照明に絞る」という使い分けが、最小限のコストでオフグリッドを実現する黄金律です。'
  }
];
