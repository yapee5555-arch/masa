import React from 'react';
import { Sprout, Home, Trees, ShieldCheck, Users, MapPin, Layers, RefreshCw } from 'lucide-react';
import { HouseholdProfile, HomesteadPreset, LandUnit, ClimateRegion } from '../types';

interface HeaderProps {
  profile: HouseholdProfile;
  presets: HomesteadPreset[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProfileChange: (profile: HouseholdProfile) => void;
  onApplyPreset: (preset: HomesteadPreset) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  presets,
  activeTab,
  onTabChange,
  onProfileChange,
  onApplyPreset,
  onReset
}) => {
  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'Home':
        return <Home className="w-4 h-4 text-amber-600" />;
      case 'Trees':
        return <Trees className="w-4 h-4 text-green-700" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-teal-600" />;
      default:
        return <Sprout className="w-4 h-4 text-emerald-600" />;
    }
  };

  const handleLandAreaChange = (val: number) => {
    const safeVal = Math.max(10, val);
    if (profile.landUnit === 'tsubo') {
      // 1坪 ≒ 3.3㎡
      onProfileChange({ ...profile, landAreaSqm: Math.round(safeVal * 3.30578) });
    } else {
      onProfileChange({ ...profile, landAreaSqm: safeVal });
    }
  };

  const currentDisplayLand = profile.landUnit === 'tsubo'
    ? Math.round(profile.landAreaSqm / 3.30578)
    : profile.landAreaSqm;

  const tabs = [
    { id: 'overview', label: '自給率シミュレーター' },
    { id: 'crops', label: '作付・食料プランナー' },
    { id: 'infra', label: 'エネルギー・水・養鶏' },
    { id: 'calendar', label: '12ヶ月農事暦＆保存食' },
    { id: 'wisdom', label: '自給知恵袋・実践ガイド' },
  ];

  return (
    <header className="w-full bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-700/80 rounded-lg text-emerald-100 shadow-inner">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  自給自足ライフプランナー
                  <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-700/50">
                    食料・エネルギー・水資源設計
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
                  家族構成・土地面積から年間カロリー・野菜・電力の自給率を算出し、持続可能な自立生活を設計します
                </p>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-stone-400 mr-1 hidden lg:inline">規模プリセット:</span>
            {presets.map((preset) => {
              const isActive = profile.activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  id={`preset-btn-${preset.id}`}
                  onClick={() => onApplyPreset(preset)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
                  }`}
                  title={preset.tagline}
                >
                  {getPresetIcon(preset.iconName)}
                  <span>{preset.name.split('（')[0]}</span>
                </button>
              );
            })}
            <button
              id="reset-config-btn"
              onClick={onReset}
              className="p-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 transition-colors"
              title="初期設定に戻す"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Controls Bar */}
        <div className="mt-4 pt-3 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Adults */}
          <div className="bg-stone-800/80 border border-stone-700/70 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-300">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>大人 (15歳以上)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                id="decrease-adults-btn"
                onClick={() => onProfileChange({ ...profile, adults: Math.max(1, profile.adults - 1) })}
                className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-white font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-stone-100 text-sm">{profile.adults}</span>
              <button
                id="increase-adults-btn"
                onClick={() => onProfileChange({ ...profile, adults: Math.min(10, profile.adults + 1) })}
                className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
              <span className="text-stone-400 ml-0.5">名</span>
            </div>
          </div>

          {/* Children */}
          <div className="bg-stone-800/80 border border-stone-700/70 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-300">
              <Users className="w-4 h-4 text-amber-400" />
              <span>子ども (〜14歳)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                id="decrease-children-btn"
                onClick={() => onProfileChange({ ...profile, children: Math.max(0, profile.children - 1) })}
                className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-white font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-stone-100 text-sm">{profile.children}</span>
              <button
                id="increase-children-btn"
                onClick={() => onProfileChange({ ...profile, children: Math.min(10, profile.children + 1) })}
                className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
              <span className="text-stone-400 ml-0.5">名</span>
            </div>
          </div>

          {/* Land Area */}
          <div className="bg-stone-800/80 border border-stone-700/70 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-stone-300">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>利用可能面積</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="land-area-input"
                type="number"
                min="10"
                max="10000"
                step="10"
                value={currentDisplayLand}
                onChange={(e) => handleLandAreaChange(Number(e.target.value))}
                className="w-16 bg-stone-900 border border-stone-700 rounded px-1.5 py-0.5 text-right font-bold text-stone-100 text-xs"
              />
              <button
                id="toggle-land-unit-btn"
                onClick={() =>
                  onProfileChange({
                    ...profile,
                    landUnit: profile.landUnit === 'sqm' ? 'tsubo' : 'sqm'
                  })
                }
                className="px-1.5 py-0.5 bg-stone-700 hover:bg-stone-600 rounded text-[11px] text-stone-300 font-mono transition-colors"
                title="単位切替 (㎡ / 坪)"
              >
                {profile.landUnit === 'sqm' ? '㎡' : '坪'}
              </button>
            </div>
          </div>

          {/* Climate */}
          <div className="bg-stone-800/80 border border-stone-700/70 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>気候区分</span>
            </div>
            <select
              id="climate-select"
              value={profile.climate}
              onChange={(e) => onProfileChange({ ...profile, climate: e.target.value as ClimateRegion })}
              className="bg-stone-900 border border-stone-700 rounded px-2 py-0.5 text-stone-200 text-xs"
            >
              <option value="warm">暖地（関東以南）</option>
              <option value="temperate">中間地（本州平野）</option>
              <option value="cold">寒冷地（東北・高冷）</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto py-2 scrollbar-none border-t border-stone-800/60">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                id={`tab-nav-${t.id}`}
                onClick={() => onTabChange(t.id)}
                className={`whitespace-nowrap px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
