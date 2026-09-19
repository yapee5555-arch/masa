export type LandUnit = 'sqm' | 'tsubo';
export type ClimateRegion = 'warm' | 'temperate' | 'cold'; // 温暖地（暖地）、中間地、寒冷地

export interface HouseholdProfile {
  adults: number;
  children: number;
  landAreaSqm: number;
  landUnit: LandUnit;
  climate: ClimateRegion;
  activePresetId?: string;
}

export type CropCategory = 'staple' | 'vegetable' | 'protein' | 'fruit' | 'herb';

export interface CropItem {
  id: string;
  name: string;
  category: CropCategory;
  categoryName: string;
  allocatedAreaSqm: number;
  yieldPerSqmKg: number; // 1㎡あたりの年間収穫量(kg)
  caloriesPerKg: number; // 1kgあたりのカロリー(kcal)
  proteinPerKg: number; // 1kgあたりのタンパク質(g)
  difficulty: '易しい' | '普通' | 'やや難';
  plantingMonths: number[]; // 播種・植え付け月 (1-12)
  harvestMonths: number[]; // 収穫月 (1-12)
  storageLife: string; // 保存可能期間と手法
  companionPlant: string; // 相性の良い混植植物
  benefitDescription: string; // 特徴・自給自足における価値
  enabled: boolean;
}

export interface EnergyWaterState {
  solarWatts: number; // 太陽光パネル(W) 例: 400W, 1200W, 3000W
  batteryKwh: number; // 蓄電池(kWh) 例: 1kWh, 5kWh, 10kWh
  woodStove: boolean; // 薪ストーブ・ロケットストーブ有無
  rainWaterTankLiters: number; // 雨水タンク容量(L)
  hasWell: boolean; // 井戸・湧水有無
  compostBins: number; // コンポスト基数
  chickensCount: number; // 平飼い養鶏羽数 (羽)
}

export interface SeasonalCalendarEntry {
  month: number;
  monthName: string;
  season: '初春' | '春' | '初夏' | '盛夏' | '秋' | '初冬' | '厳冬';
  farmTasks: string[];
  preservationTasks: string[];
  harvestHighlights: string[];
  gapPeriodWarning?: string; // 端境期の注意・対策
}

export interface HomesteadPreset {
  id: string;
  name: string;
  tagline: string;
  landAreaSqm: number;
  adults: number;
  children: number;
  crops: { [cropId: string]: number }; // cropId -> allocatedAreaSqm
  infra: Partial<EnergyWaterState>;
  description: string;
  iconName: string;
}

export interface HomesteadGuideArticle {
  id: string;
  category: 'soil' | 'companion' | 'energy' | 'storage' | 'gap_period';
  categoryLabel: string;
  title: string;
  summary: string;
  steps: string[];
  keyAdvice: string;
}
