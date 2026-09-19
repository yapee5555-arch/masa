import { CropItem, EnergyWaterState, HouseholdProfile } from '../types';

export interface CalculatedSufficiency {
  // カロリー
  annualCalorieTarget: number;
  annualCalorieProduced: number;
  calorieRate: number; // 0 - 100+ %

  // 野菜重量 (kg)
  annualVegTargetKg: number;
  annualVegProducedKg: number;
  vegRate: number;

  // タンパク質 (g)
  annualProteinTargetG: number;
  annualProteinProducedG: number;
  proteinRate: number;
  annualEggsCount: number;

  // 電力
  dailyKwhTarget: number;
  dailyKwhGenerated: number;
  powerRate: number;

  // 水・循環
  waterLitersDay: number;
  waterRate: number;
  compostScore: number; // 0 - 100

  // 総合自給率スコア
  overallScore: number;
  rankTitle: string;
  rankDescription: string;

  // 土地使用
  totalLandAreaSqm: number;
  allocatedLandAreaSqm: number;
  availableLandAreaSqm: number;
  landUtilizationRate: number;
}

export function calculateSufficiency(
  profile: HouseholdProfile,
  crops: CropItem[],
  infra: EnergyWaterState
): CalculatedSufficiency {
  const { adults, children, landAreaSqm } = profile;
  const safeAdults = Math.max(1, adults);
  const safeChildren = Math.max(0, children);

  // 1. カロリー目標 (大人780,000kcal/年 = 2,137kcal/日、子ども520,000kcal/年 = 1,424kcal/日)
  const annualCalorieTarget = safeAdults * 780000 + safeChildren * 520000;

  // 2. 野菜消費目標 (1人1日350g = 127.75kg/年、子ども80kg/年)
  const annualVegTargetKg = safeAdults * 130 + safeChildren * 85;

  // 3. タンパク質目標 (成人1日60g = 21,900g/年、子ども40g = 14,600g/年)
  const annualProteinTargetG = safeAdults * 21900 + safeChildren * 14600;

  // 収穫計算
  let annualCalorieProduced = 0;
  let annualVegProducedKg = 0;
  let annualProteinProducedG = 0;
  let allocatedLandAreaSqm = 0;

  crops.forEach((crop) => {
    if (crop.enabled && crop.allocatedAreaSqm > 0) {
      allocatedLandAreaSqm += crop.allocatedAreaSqm;
      const totalYieldKg = crop.allocatedAreaSqm * crop.yieldPerSqmKg;

      annualCalorieProduced += totalYieldKg * crop.caloriesPerKg;
      annualProteinProducedG += totalYieldKg * crop.proteinPerKg;

      if (crop.category === 'vegetable' || crop.category === 'staple') {
        annualVegProducedKg += totalYieldKg;
      }
    }
  });

  // 平飼い養鶏の卵（1羽あたり年間約260個、1個あたり約80kcal、タンパク質約6.5g）
  const annualEggsCount = infra.chickensCount * 260;
  annualCalorieProduced += annualEggsCount * 80;
  annualProteinProducedG += annualEggsCount * 6.5;

  // 土地にインフラ設備（養鶏小屋・雨水タンク・コンポスト）の占有面積を加算
  const chickenCoopArea = infra.chickensCount > 0 ? Math.max(4, infra.chickensCount * 1.5) : 0;
  const compostArea = infra.compostBins * 2;
  allocatedLandAreaSqm += chickenCoopArea + compostArea;

  const calorieRate = Math.min(150, Math.round((annualCalorieProduced / annualCalorieTarget) * 100));
  const vegRate = Math.min(150, Math.round((annualVegProducedKg / annualVegTargetKg) * 100));
  const proteinRate = Math.min(150, Math.round((annualProteinProducedG / annualProteinTargetG) * 100));

  // 4. 電力自給率 (省エネ自給生活：大人1.8kWh/日、子ども0.8kWh/日)
  const dailyKwhTarget = safeAdults * 1.8 + safeChildren * 0.8;
  // 日照時間 3.4時間/日 平均
  const dailyKwhGenerated = (infra.solarWatts * 3.4) / 1000;
  let powerRate = Math.min(150, Math.round((dailyKwhGenerated / dailyKwhTarget) * 100));
  if (infra.woodStove) {
    // 薪ストーブによる暖房・給湯代替ボーナス (+20%)
    powerRate = Math.min(150, powerRate + 20);
  }

  // 5. 水・循環自給率
  let waterRate = 0;
  if (infra.hasWell) {
    waterRate = 95; // 井戸・湧水があればほぼ自給可能
  } else {
    // 雨水タンクによる畑・トイレ用水補填
    const rainPoints = Math.min(60, Math.round((infra.rainWaterTankLiters / 500) * 30));
    waterRate = rainPoints;
  }

  const compostScore = Math.min(100, infra.compostBins * 33);

  // 総合自給率スコア (カロリー40% + 野菜20% + タンパク質15% + 電力15% + 水循環10%)
  const overallScore = Math.min(
    100,
    Math.round(
      calorieRate * 0.4 +
      vegRate * 0.2 +
      proteinRate * 0.15 +
      powerRate * 0.15 +
      ((waterRate + compostScore) / 2) * 0.1
    )
  );

  // ランク付け
  let rankTitle = '自給生活の入門者';
  let rankDescription = 'プランターやハーブ、新鮮な生鮮野菜の収穫を楽しむステップ。';
  if (overallScore >= 90) {
    rankTitle = '完全自立オフグリッド・仙人級';
    rankDescription = '食料・カロリー・電力・水・土壌が全て循環する究極の自立生活。';
  } else if (overallScore >= 70) {
    rankTitle = '里山本格自給マスター';
    rankDescription = '主食・野菜・タンパク質・薪熱源の大部分を賄う持続可能な生き方。';
  } else if (overallScore >= 45) {
    rankTitle = '半農半X・実力派ホームステッダー';
    rankDescription = '副菜・芋類・卵など日常の食卓のかなりの割合を自家菜園から調達。';
  } else if (overallScore >= 20) {
    rankTitle = '週末自給ガーデナー';
    rankDescription = '旬の野菜やジャガイモの味覚を楽しみ、災害時の備えとしても機能。';
  }

  const availableLandAreaSqm = Math.max(0, landAreaSqm - allocatedLandAreaSqm);
  const landUtilizationRate = Math.round((allocatedLandAreaSqm / landAreaSqm) * 100);

  return {
    annualCalorieTarget,
    annualCalorieProduced,
    calorieRate,
    annualVegTargetKg,
    annualVegProducedKg,
    vegRate,
    annualProteinTargetG,
    annualProteinProducedG,
    proteinRate,
    annualEggsCount,
    dailyKwhTarget,
    dailyKwhGenerated,
    powerRate,
    waterLitersDay: Math.round(infra.rainWaterTankLiters / 30),
    waterRate,
    compostScore,
    overallScore,
    rankTitle,
    rankDescription,
    totalLandAreaSqm: landAreaSqm,
    allocatedLandAreaSqm,
    availableLandAreaSqm,
    landUtilizationRate
  };
}
