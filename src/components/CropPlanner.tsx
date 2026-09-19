import React, { useState } from 'react';
import {
  Sprout,
  Calendar,
  Shield,
  HeartHandshake,
  Sparkles,
  Info,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { CropCategory, CropItem, HouseholdProfile } from '../types';

interface CropPlannerProps {
  crops: CropItem[];
  profile: HouseholdProfile;
  allocatedLandAreaSqm: number;
  onUpdateCropArea: (cropId: string, area: number) => void;
  onToggleCrop: (cropId: string) => void;
  onAutoOptimize: () => void;
}

export const CropPlanner: React.FC<CropPlannerProps> = ({
  crops,
  profile,
  allocatedLandAreaSqm,
  onUpdateCropArea,
  onToggleCrop,
  onAutoOptimize
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'すべての作物' },
    { id: 'staple', label: '主食・高カロリー' },
    { id: 'vegetable', label: '野菜・根菜・葉物' },
    { id: 'protein', label: 'タンパク質・豆類' },
    { id: 'fruit', label: '果樹・ナッツ' }
  ];

  const filteredCrops = crops.filter((crop) => {
    if (activeCategory === 'all') return true;
    return crop.category === activeCategory;
  });

  const getDifficultyBadge = (diff: CropItem['difficulty']) => {
    switch (diff) {
      case '易しい':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">栽培難度: 易</span>;
      case '普通':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">栽培難度: 並</span>;
      case 'やや難':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">栽培難度: 熟練</span>;
    }
  };

  const remainingLand = profile.landAreaSqm - allocatedLandAreaSqm;

  return (
    <div className="space-y-6">
      {/* Planner Top Control Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              作付・食料生産プランナー
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              各作物の作付面積（㎡）を調整すると、年間収穫量・摂取可能カロリー・タンパク質がリアルタイムに再計算されます。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-stone-500 block">土地の余白面積</span>
              <span className={`text-sm font-bold font-mono ${remainingLand < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                {remainingLand < 0 ? `超過 ${Math.abs(remainingLand)}㎡` : `残り ${remainingLand}㎡`}
              </span>
            </div>

            <button
              id="auto-optimize-crops-btn"
              onClick={onAutoOptimize}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              面積比率を自動最適化
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-100">
          {categories.map((c) => {
            const active = activeCategory === c.id;
            return (
              <button
                key={c.id}
                id={`crop-filter-${c.id}`}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Crops List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCrops.map((crop) => {
          const totalYieldKg = Math.round(crop.allocatedAreaSqm * crop.yieldPerSqmKg * 10) / 10;
          const totalKcal = Math.round((totalYieldKg * crop.caloriesPerKg) / 1000); // 千kcal
          const totalProteinKg = Math.round((totalYieldKg * crop.proteinPerKg) / 100) / 10; // kg

          return (
            <div
              key={crop.id}
              className={`bg-white rounded-xl border p-4.5 transition-all shadow-xs flex flex-col justify-between ${
                crop.enabled
                  ? 'border-stone-200 hover:border-emerald-300'
                  : 'border-stone-200/60 bg-stone-50/70 opacity-60'
              }`}
            >
              {/* Header Info */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      id={`toggle-crop-${crop.id}`}
                      onClick={() => onToggleCrop(crop.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        crop.enabled
                          ? 'bg-emerald-600 text-white'
                          : 'border border-stone-300 bg-white text-transparent'
                      }`}
                      title={crop.enabled ? '栽培する（ON）' : '栽培しない（OFF）'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <h3 className="font-bold text-stone-900 text-sm">{crop.name}</h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                      {crop.categoryName}
                    </span>
                    {getDifficultyBadge(crop.difficulty)}
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                  {crop.benefitDescription}
                </p>

                {/* Interactive Slider & Area Input */}
                {crop.enabled && (
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 mb-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-stone-700 flex items-center gap-1">
                        <Sliders className="w-3.5 h-3.5 text-stone-500" />
                        作付面積
                      </span>
                      <div className="flex items-center gap-1 font-mono">
                        <input
                          id={`crop-area-input-${crop.id}`}
                          type="number"
                          min="0"
                          max={profile.landAreaSqm}
                          step="5"
                          value={crop.allocatedAreaSqm}
                          onChange={(e) => onUpdateCropArea(crop.id, Math.max(0, Number(e.target.value)))}
                          className="w-16 text-right px-1.5 py-0.5 bg-white border border-stone-300 rounded font-bold text-xs"
                        />
                        <span className="text-stone-600 text-xs">㎡</span>
                      </div>
                    </div>

                    <input
                      id={`crop-area-slider-${crop.id}`}
                      type="range"
                      min="0"
                      max={Math.min(profile.landAreaSqm, 300)}
                      step="5"
                      value={crop.allocatedAreaSqm}
                      onChange={(e) => onUpdateCropArea(crop.id, Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                    />

                    {/* Yield Output Metric Bar */}
                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-200/60 text-[11px] text-stone-600 font-mono">
                      <div>
                        <span className="text-stone-400 block text-[10px]">推定収穫量</span>
                        <strong className="text-stone-800">{totalYieldKg} kg</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">生産カロリー</span>
                        <strong className="text-amber-700">{totalKcal.toLocaleString()} kcal</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">タンパク質</span>
                        <strong className="text-red-700">{totalProteinKg} kg</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cultivation / Storage details footer */}
              <div className="text-[11px] space-y-1.5 border-t border-stone-100 pt-2.5 text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    播種: <strong>{crop.plantingMonths.join(', ')}月</strong> / 収穫: <strong>{crop.harvestMonths.join(', ')}月</strong>
                  </span>
                </div>

                <div className="flex items-start gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-tight text-stone-600">
                    保存: {crop.storageLife}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="leading-tight text-stone-600">
                    相性混植: <strong>{crop.companionPlant}</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
