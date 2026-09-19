import React from 'react';
import {
  Sun,
  BatteryCharging,
  Flame,
  Droplets,
  RotateCcw,
  Egg,
  CheckCircle2,
  Info,
  ShieldAlert
} from 'lucide-react';
import { EnergyWaterState, HouseholdProfile } from '../types';

interface InfraPlannerProps {
  infra: EnergyWaterState;
  profile: HouseholdProfile;
  onUpdateInfra: (updated: EnergyWaterState) => void;
}

export const InfraPlanner: React.FC<InfraPlannerProps> = ({
  infra,
  profile,
  onUpdateInfra
}) => {
  // Estimated daily energy generation & egg production
  const dailyKwhGen = ((infra.solarWatts * 3.4) / 1000).toFixed(1);
  const targetKwhDay = (profile.adults * 1.8 + profile.children * 0.8).toFixed(1);
  const annualEggs = infra.chickensCount * 260;
  const chickenCoopArea = infra.chickensCount > 0 ? Math.max(4, infra.chickensCount * 1.5) : 0;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          エネルギー・水・小動物（平飼い養鶏）インフラ設計
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          食料自給を支える生命線。商用電力や水道に依存しないオフグリッド設備と、栄養満点の卵・鶏糞堆肥を生み出す循環システムを整えます。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. Energy Section */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">オフグリッド太陽光 ＆ 蓄電</h3>
              <span className="text-[11px] text-stone-500">電力会社に頼らない独立電源</span>
            </div>
          </div>

          {/* Solar Watts */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-700 font-medium">太陽光パネル容量</span>
              <span className="font-mono font-bold text-stone-900">{infra.solarWatts} W</span>
            </div>
            <input
              id="solar-watts-slider"
              type="range"
              min="0"
              max="5000"
              step="100"
              value={infra.solarWatts}
              onChange={(e) => onUpdateInfra({ ...infra, solarWatts: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>0W (商用)</span>
              <span>1000W (中型)</span>
              <span>3000W (本格)</span>
              <span>5000W</span>
            </div>
          </div>

          {/* Battery kWh */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-700 font-medium">ポータブル / 定置型蓄電池</span>
              <span className="font-mono font-bold text-stone-900">{infra.batteryKwh} kWh</span>
            </div>
            <input
              id="battery-kwh-slider"
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={infra.batteryKwh}
              onChange={(e) => onUpdateInfra({ ...infra, batteryKwh: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>0kWh</span>
              <span>3kWh (夜間OK)</span>
              <span>7kWh (連雨OK)</span>
              <span>15kWh</span>
            </div>
          </div>

          {/* Wood Stove */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600" />
              <div>
                <span className="text-xs font-bold text-stone-800 block">薪ストーブ・ロケットコンロ</span>
                <span className="text-[10px] text-stone-500">調理・冬季暖房の熱源を木質バイオマスで代替</span>
              </div>
            </div>
            <button
              id="toggle-woodstove-btn"
              onClick={() => onUpdateInfra({ ...infra, woodStove: !infra.woodStove })}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                infra.woodStove ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-700'
              }`}
            >
              {infra.woodStove ? '導入済' : '未導入'}
            </button>
          </div>

          <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200/60 text-xs text-amber-900 font-mono space-y-0.5">
            <div className="flex justify-between">
              <span>推定平均日発電量:</span>
              <strong>{dailyKwhGen} kWh / 日</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>世帯目標電力:</span>
              <span>約 {targetKwhDay} kWh / 日</span>
            </div>
          </div>
        </div>

        {/* 2. Water & Soil Cycling */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">水資源 ＆ 堆肥コンポスト</h3>
              <span className="text-[11px] text-stone-500">渇水耐性・無肥料循環の基盤</span>
            </div>
          </div>

          {/* Rainwater tank */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-700 font-medium">雨水貯留タンク容量</span>
              <span className="font-mono font-bold text-stone-900">{infra.rainWaterTankLiters} L</span>
            </div>
            <input
              id="rain-tank-slider"
              type="range"
              min="0"
              max="3000"
              step="100"
              value={infra.rainWaterTankLiters}
              onChange={(e) => onUpdateInfra({ ...infra, rainWaterTankLiters: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>0L</span>
              <span>500L (菜園水やり)</span>
              <span>1500L</span>
              <span>3000L (完全自給)</span>
            </div>
          </div>

          {/* Natural Well / Spring */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-teal-600" />
              <div>
                <span className="text-xs font-bold text-stone-800 block">井戸水 ＆ 山の湧水</span>
                <span className="text-[10px] text-stone-500">飲用・生活用水の完全自給が可能</span>
              </div>
            </div>
            <button
              id="toggle-well-btn"
              onClick={() => onUpdateInfra({ ...infra, hasWell: !infra.hasWell })}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                infra.hasWell ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-700'
              }`}
            >
              {infra.hasWell ? 'あり' : 'なし'}
            </button>
          </div>

          {/* Compost Bins */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-700 font-medium flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                バイオコンポスト堆肥枠
              </span>
              <span className="font-mono font-bold text-stone-900">{infra.compostBins} 基</span>
            </div>
            <input
              id="compost-bins-slider"
              type="range"
              min="0"
              max="6"
              step="1"
              value={infra.compostBins}
              onChange={(e) => onUpdateInfra({ ...infra, compostBins: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <span className="text-[10px] text-stone-500 block">
              ※生ゴミ・雑草・落ち葉を完熟堆肥に変え、化学肥料購入費をゼロにします。
            </span>
          </div>
        </div>

        {/* 3. Chickens / Animal protein */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-800">
              <Egg className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">平飼い養鶏（採卵鶏）</h3>
              <span className="text-[11px] text-stone-500">毎日の新鮮な卵 ＆ 最強の有機鶏糞</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-700 font-medium">飼育羽数（メス）</span>
              <span className="font-mono font-bold text-stone-900">{infra.chickensCount} 羽</span>
            </div>
            <input
              id="chickens-count-slider"
              type="range"
              min="0"
              max="12"
              step="1"
              value={infra.chickensCount}
              onChange={(e) => onUpdateInfra({ ...infra, chickensCount: Number(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>0羽</span>
              <span>2羽 (1日1〜2個)</span>
              <span>4羽 (家族分充足)</span>
              <span>8羽以上</span>
            </div>
          </div>

          {/* Benefits Cards */}
          <div className="space-y-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200/80">
            <div className="flex justify-between items-center">
              <span>年間採卵数:</span>
              <strong className="text-red-700 font-mono text-sm">{annualEggs} 個 / 年</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>1日平均:</span>
              <strong className="text-stone-800 font-mono">約 {Math.round((annualEggs / 365) * 10) / 10} 個 / 日</strong>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span>必要小屋面積:</span>
              <span className="text-stone-500 font-mono">約 {chickenCoopArea} ㎡</span>
            </div>
            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 leading-relaxed">
              💡 鶏は野菜クズ・雑草・害虫を餌として処理し、窒素・リン酸が豊富な「完熟鶏糞堆肥」を毎日供給してくれる最高の相棒です。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
