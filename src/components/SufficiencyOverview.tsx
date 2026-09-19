import React from 'react';
import {
  Wheat,
  Salad,
  Egg,
  Sun,
  Droplets,
  Layers,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { CalculatedSufficiency } from '../lib/calc';
import { HouseholdProfile } from '../types';

interface SufficiencyOverviewProps {
  calc: CalculatedSufficiency;
  profile: HouseholdProfile;
  onNavigateTab: (tab: string) => void;
}

export const SufficiencyOverview: React.FC<SufficiencyOverviewProps> = ({
  calc,
  profile,
  onNavigateTab
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score >= 50) return 'text-teal-700 bg-teal-50 border-teal-300';
    if (score >= 25) return 'text-amber-700 bg-amber-50 border-amber-300';
    return 'text-stone-700 bg-stone-100 border-stone-300';
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'bg-emerald-600';
    if (rate >= 50) return 'bg-teal-600';
    if (rate >= 25) return 'bg-amber-500';
    return 'bg-stone-400';
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Score Card */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Circular / Meter Visual */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-stone-50 rounded-xl border border-stone-200/80">
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* Outer decorative circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-stone-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-emerald-600 transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * Math.min(100, calc.overallScore)) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-stone-800 tracking-tight">
                  {calc.overallScore}
                  <span className="text-xl font-bold text-stone-500">%</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 mt-0.5">
                  総合自給率
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(calc.overallScore)}`}>
                <Award className="w-3.5 h-3.5" />
                {calc.rankTitle}
              </span>
              <p className="text-xs text-stone-500 mt-1.5 max-w-xs leading-relaxed">
                {calc.rankDescription}
              </p>
            </div>
          </div>

          {/* Details & Target Breakdown */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  自給自足シミュレーション総合判定
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  世帯：大人{profile.adults}名・子ども{profile.children}名 / 敷地 {profile.landAreaSqm}㎡
                </span>
              </div>
              <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                成人が健康に自活するために必要な「熱量（カロリー）」「野菜（ビタミン・食物繊維）」「タンパク質」、
                および生活インフラである「電力・熱・水資源」の達成状況です。
              </p>
            </div>

            {/* Land Utilization Meter */}
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  敷地利用状況
                </span>
                <span className="font-mono text-stone-600">
                  <strong className={calc.landUtilizationRate > 100 ? 'text-rose-600 font-bold' : 'text-stone-900 font-bold'}>
                    {calc.allocatedLandAreaSqm}㎡
                  </strong>
                  {' / '}{calc.totalLandAreaSqm}㎡ （利用率 {calc.landUtilizationRate}%）
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    calc.landUtilizationRate > 100 ? 'bg-rose-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${Math.min(100, calc.landUtilizationRate)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-stone-500 mt-1.5">
                {calc.availableLandAreaSqm > 0 ? (
                  <span className="text-emerald-600 font-medium">
                    ✓ 残り余白面積: <strong>{calc.availableLandAreaSqm}㎡</strong>（さらなる作物や果樹を配置可能）
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    敷地面積を {Math.abs(calc.totalLandAreaSqm - calc.allocatedLandAreaSqm)}㎡ 超過しています。作付面積を調整してください。
                  </span>
                )}
                <button
                  id="nav-crops-from-overview-btn"
                  onClick={() => onNavigateTab('crops')}
                  className="text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  作付を編集する <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Practical Advice Banner */}
            <div className="text-xs bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3 text-emerald-900 leading-relaxed">
              <strong className="font-bold text-emerald-950">💡 自給自足アドバイザーの視点：</strong>{' '}
              {calc.calorieRate < 40 && (
                <span>
                  現在はカロリー自給率が控えめです。命の土台となる「さつまいも」や「じゃがいも」の作付を増やすと、劇的に飢餓リスクを下げられます。
                </span>
              )}
              {calc.calorieRate >= 40 && calc.powerRate < 50 && (
                <span>
                  食料の基礎は整っています！次は太陽光パネルやポータブル蓄電池、薪ストーブなどの熱源を強化して「エネルギー自給」を高めましょう。
                </span>
              )}
              {calc.calorieRate >= 40 && calc.powerRate >= 50 && (
                <span>
                  素晴らしい自給体制です！春の端境期（3〜4月の野菜不足）を乗り切るための「保存食・味噌仕込み」や「雨水タンクの増設」でさらに盤石になります。
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Key Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Calorie */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800">カロリー自給率</h3>
                <span className="text-[11px] text-stone-500">芋・米・カボチャ等の熱量</span>
              </div>
            </div>
            <span className="text-xl font-black text-amber-700">
              {calc.calorieRate}%
            </span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${getProgressColor(calc.calorieRate)}`}
              style={{ width: `${Math.min(100, calc.calorieRate)}%` }}
            />
          </div>

          <div className="text-xs text-stone-600 space-y-1 font-mono pt-1">
            <div className="flex justify-between">
              <span>年間必要カロリー:</span>
              <span>{Math.round(calc.annualCalorieTarget / 10000).toLocaleString()}万 kcal</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-800">
              <span>推定年間生産量:</span>
              <span>{Math.round(calc.annualCalorieProduced / 10000).toLocaleString()}万 kcal</span>
            </div>
          </div>
        </div>

        {/* 2. Vegetable Weight */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                <Salad className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800">野菜・ビタミン自給</h3>
                <span className="text-[11px] text-stone-500">旬の野菜・根菜・葉物</span>
              </div>
            </div>
            <span className="text-xl font-black text-emerald-700">
              {calc.vegRate}%
            </span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${getProgressColor(calc.vegRate)}`}
              style={{ width: `${Math.min(100, calc.vegRate)}%` }}
            />
          </div>

          <div className="text-xs text-stone-600 space-y-1 font-mono pt-1">
            <div className="flex justify-between">
              <span>健康維持推奨量:</span>
              <span>{calc.annualVegTargetKg.toLocaleString()} kg/年</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-800">
              <span>推定年間収穫量:</span>
              <span>{Math.round(calc.annualVegProducedKg).toLocaleString()} kg/年</span>
            </div>
          </div>
        </div>

        {/* 3. Protein */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-red-100 text-red-800">
                <Egg className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800">タンパク質自給</h3>
                <span className="text-[11px] text-stone-500">大豆・豆類・平飼い卵</span>
              </div>
            </div>
            <span className="text-xl font-black text-red-700">
              {calc.proteinRate}%
            </span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${getProgressColor(calc.proteinRate)}`}
              style={{ width: `${Math.min(100, calc.proteinRate)}%` }}
            />
          </div>

          <div className="text-xs text-stone-600 space-y-1 font-mono pt-1">
            <div className="flex justify-between">
              <span>年間必要タンパク質:</span>
              <span>{Math.round(calc.annualProteinTargetG / 1000).toLocaleString()} kg/年</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-800">
              <span>生産量 (卵 {calc.annualEggsCount}個含):</span>
              <span>{Math.round(calc.annualProteinProducedG / 1000).toLocaleString()} kg/年</span>
            </div>
          </div>
        </div>

        {/* 4. Power & Energy */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800">電力・熱エネルギー</h3>
                <span className="text-[11px] text-stone-500">太陽光発電・薪熱源</span>
              </div>
            </div>
            <span className="text-xl font-black text-amber-700">
              {calc.powerRate}%
            </span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${getProgressColor(calc.powerRate)}`}
              style={{ width: `${Math.min(100, calc.powerRate)}%` }}
            />
          </div>

          <div className="text-xs text-stone-600 space-y-1 font-mono pt-1">
            <div className="flex justify-between">
              <span>省エネ生活基準:</span>
              <span>{calc.dailyKwhTarget.toFixed(1)} kWh/日</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-800">
              <span>推定実効発電量:</span>
              <span>{calc.dailyKwhGenerated.toFixed(1)} kWh/日</span>
            </div>
          </div>
        </div>

        {/* 5. Water & Compost */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800">水資源・土壌循環</h3>
                <span className="text-[11px] text-stone-500">雨水利用・堆肥コンポスト</span>
              </div>
            </div>
            <span className="text-xl font-black text-blue-700">
              {calc.waterRate}%
            </span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${getProgressColor(calc.waterRate)}`}
              style={{ width: `${Math.min(100, calc.waterRate)}%` }}
            />
          </div>

          <div className="text-xs text-stone-600 space-y-1 font-mono pt-1">
            <div className="flex justify-between">
              <span>水自給体制:</span>
              <span className="font-semibold">{calc.waterRate > 70 ? '井戸・湧水完備' : '雨水タンク補給'}</span>
            </div>
            <div className="flex justify-between">
              <span>堆肥循環スコア:</span>
              <span className="font-semibold text-stone-800">{calc.compostScore} / 100 点</span>
            </div>
          </div>
        </div>

        {/* Quick Navigate Next Steps Card */}
        <div className="bg-stone-900 text-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">NEXT STEP</span>
            <h3 className="text-sm font-bold mt-1">自給計画をさらに具体化する</h3>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              作物の種類や面積の再配分、または養鶏や太陽光パネルの設置数を調整してみましょう。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              id="goto-crops-btn"
              onClick={() => onNavigateTab('crops')}
              className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded text-xs font-semibold text-center transition-colors"
            >
              作付を配分する
            </button>
            <button
              id="goto-calendar-btn"
              onClick={() => onNavigateTab('calendar')}
              className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 rounded text-xs font-semibold text-center border border-stone-700 transition-colors"
            >
              農事暦を見る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
