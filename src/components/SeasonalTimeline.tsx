import React, { useState } from 'react';
import {
  Calendar,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Apple,
  Clock,
  ChevronRight,
  Sprout
} from 'lucide-react';
import { CropItem, SeasonalCalendarEntry } from '../types';

interface SeasonalTimelineProps {
  calendar: SeasonalCalendarEntry[];
  userCrops: CropItem[];
}

export const SeasonalTimeline: React.FC<SeasonalTimelineProps> = ({
  calendar,
  userCrops
}) => {
  // Current month default (can default to today's month, or selected)
  const currentMonthNum = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthNum || 4);

  const activeEntry = calendar.find((c) => c.month === selectedMonth) || calendar[0];

  // User's active crops that need planting or harvesting in this month
  const plantingNow = userCrops.filter(
    (c) => c.enabled && c.plantingMonths.includes(selectedMonth)
  );
  const harvestingNow = userCrops.filter(
    (c) => c.enabled && c.harvestMonths.includes(selectedMonth)
  );

  const getSeasonBadge = (season: SeasonalCalendarEntry['season']) => {
    switch (season) {
      case '春':
      case '初春':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case '初夏':
      case '盛夏':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case '秋':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case '初冬':
      case '厳冬':
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          12ヶ月の自給農事暦 ＆ 保存食タイムライン
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          日本の四季に沿った「種まき・育苗・定植・収穫」と、冬や端境期を乗り切る「伝統保存食・発酵仕込み」の年間スケジュールです。
        </p>

        {/* 12-Month Selector Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 mt-5">
          {calendar.map((entry) => {
            const isSelected = entry.month === selectedMonth;
            const isCurrentMonth = entry.month === currentMonthNum;

            return (
              <button
                key={entry.month}
                id={`calendar-month-btn-${entry.month}`}
                onClick={() => setSelectedMonth(entry.month)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span>{entry.monthName}</span>
                <span className={`text-[10px] mt-0.5 font-normal ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                  {entry.season}
                </span>
                {isCurrentMonth && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" title="今月" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Month Detail View */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6">
        {/* Month Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-stone-900 text-white flex items-center justify-center font-black text-xl shadow-xs">
              {activeEntry.month}
              <span className="text-xs font-normal text-stone-400">月</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900">
                  {activeEntry.monthName}の農事と保存食
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getSeasonBadge(activeEntry.season)}`}>
                  {activeEntry.season}
                </span>
              </div>
              <span className="text-xs text-stone-500">
                季節の変わり目と自然のバイオリズムを合わせた最適タスク
              </span>
            </div>
          </div>
        </div>

        {/* Hunger Gap (端境期) Alert if present */}
        {activeEntry.gapPeriodWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                端境期（はざかいき）アドバイザリー
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                {activeEntry.gapPeriodWarning}
              </p>
            </div>
          </div>
        )}

        {/* 3 Columns Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Farm Tasks */}
          <div className="p-4.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" />
              畑・土壌の主要作業
            </h4>
            <ul className="space-y-2">
              {activeEntry.farmTasks.map((task, idx) => (
                <li key={idx} className="text-xs text-stone-700 flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Preservation / Fermentation */}
          <div className="p-4.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              伝統保存食・発酵仕込み
            </h4>
            <ul className="space-y-2">
              {activeEntry.preservationTasks.map((task, idx) => (
                <li key={idx} className="text-xs text-stone-700 flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Harvest Highlights */}
          <div className="p-4.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-red-600" />
              今月の旬の収穫物
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeEntry.harvestHighlights.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-800 font-medium shadow-2xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Section: What to do with YOUR selected crops this month */}
        <div className="mt-6 pt-5 border-t border-stone-100">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-emerald-600" />
            あなたの計画作物の今月（{activeEntry.monthName}）の予定
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Plantings this month */}
            <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/50">
              <span className="font-bold text-emerald-950 block mb-2">
                🌱 今月【播種・植え付け】する作物:
              </span>
              {plantingNow.length > 0 ? (
                <div className="space-y-1.5">
                  {plantingNow.map((c) => (
                    <div key={c.id} className="flex justify-between items-center text-emerald-900">
                      <span className="font-medium">• {c.name}</span>
                      <span className="font-mono text-[11px] text-emerald-700">{c.allocatedAreaSqm}㎡</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-emerald-700/80 italic">今月播種予定の作物はありません</span>
              )}
            </div>

            {/* Harvests this month */}
            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50">
              <span className="font-bold text-amber-950 block mb-2">
                🌾 今月【収穫期】を迎える作物:
              </span>
              {harvestingNow.length > 0 ? (
                <div className="space-y-1.5">
                  {harvestingNow.map((c) => (
                    <div key={c.id} className="flex justify-between items-center text-amber-900">
                      <span className="font-medium">• {c.name}</span>
                      <span className="font-mono text-[11px] text-amber-700">
                        推定量: {Math.round(c.allocatedAreaSqm * c.yieldPerSqmKg)}kg
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-amber-700/80 italic">今月収穫予定の作物はありません</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
