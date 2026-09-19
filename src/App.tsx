import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SufficiencyOverview } from './components/SufficiencyOverview';
import { CropPlanner } from './components/CropPlanner';
import { InfraPlanner } from './components/InfraPlanner';
import { SeasonalTimeline } from './components/SeasonalTimeline';
import { HomesteadWisdom } from './components/HomesteadWisdom';
import {
  INITIAL_CROPS,
  HOMESTEAD_PRESETS,
  SEASONAL_CALENDAR,
  HOMESTEAD_GUIDES
} from './data';
import { HouseholdProfile, CropItem, EnergyWaterState, HomesteadPreset } from './types';
import { calculateSufficiency } from './lib/calc';

export function App() {
  // 1. Initial State: Suburban garden preset as friendly default
  const defaultPreset = HOMESTEAD_PRESETS[1]; // 郊外の一軒家ガーデン (150㎡)

  const [profile, setProfile] = useState<HouseholdProfile>({
    adults: defaultPreset.adults,
    children: defaultPreset.children,
    landAreaSqm: defaultPreset.landAreaSqm,
    landUnit: 'sqm',
    climate: 'temperate',
    activePresetId: defaultPreset.id
  });

  const [crops, setCrops] = useState<CropItem[]>(() => {
    return INITIAL_CROPS.map((c) => {
      const presetArea = defaultPreset.crops[c.id];
      return {
        ...c,
        allocatedAreaSqm: presetArea !== undefined ? presetArea : c.allocatedAreaSqm,
        enabled: (presetArea !== undefined ? presetArea > 0 : c.enabled)
      };
    });
  });

  const [infra, setInfra] = useState<EnergyWaterState>({
    solarWatts: defaultPreset.infra.solarWatts ?? 800,
    batteryKwh: defaultPreset.infra.batteryKwh ?? 3,
    woodStove: defaultPreset.infra.woodStove ?? false,
    rainWaterTankLiters: defaultPreset.infra.rainWaterTankLiters ?? 300,
    hasWell: defaultPreset.infra.hasWell ?? false,
    compostBins: defaultPreset.infra.compostBins ?? 2,
    chickensCount: defaultPreset.infra.chickensCount ?? 0
  });

  const [activeTab, setActiveTab] = useState<string>('overview');

  // 2. Real-time Self-Sufficiency Calculations
  const calc = useMemo(() => {
    return calculateSufficiency(profile, crops, infra);
  }, [profile, crops, infra]);

  // 3. Preset Application
  const handleApplyPreset = (preset: HomesteadPreset) => {
    setProfile({
      ...profile,
      adults: preset.adults,
      children: preset.children,
      landAreaSqm: preset.landAreaSqm,
      activePresetId: preset.id
    });

    setCrops((prevCrops) =>
      prevCrops.map((c) => {
        const area = preset.crops[c.id];
        if (area !== undefined) {
          return {
            ...c,
            allocatedAreaSqm: area,
            enabled: area > 0
          };
        }
        return c;
      })
    );

    setInfra({
      solarWatts: preset.infra.solarWatts ?? 0,
      batteryKwh: preset.infra.batteryKwh ?? 0,
      woodStove: preset.infra.woodStove ?? false,
      rainWaterTankLiters: preset.infra.rainWaterTankLiters ?? 0,
      hasWell: preset.infra.hasWell ?? false,
      compostBins: preset.infra.compostBins ?? 1,
      chickensCount: preset.infra.chickensCount ?? 0
    });
  };

  // 4. Crop Area Update
  const handleUpdateCropArea = (cropId: string, area: number) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === cropId ? { ...c, allocatedAreaSqm: area, enabled: area > 0 ? true : c.enabled } : c))
    );
    setProfile((prev) => ({ ...prev, activePresetId: undefined }));
  };

  // 5. Crop Toggle
  const handleToggleCrop = (cropId: string) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === cropId ? { ...c, enabled: !c.enabled } : c))
    );
    setProfile((prev) => ({ ...prev, activePresetId: undefined }));
  };

  // 6. Auto-Optimize Crops Allocation
  const handleAutoOptimize = () => {
    const totalArea = profile.landAreaSqm;
    // Reserve small space for compost and infra
    const coopArea = infra.chickensCount > 0 ? Math.max(4, infra.chickensCount * 1.5) : 0;
    const compostArea = infra.compostBins * 2;
    const netPlantArea = Math.max(10, totalArea - coopArea - compostArea);

    // Distribution:
    // 35% High-Calorie Staple (Sweet potato & Potato)
    // 20% Protein (Soybeans & Broad beans)
    // 30% Healthy Veggies & Root vegetables (Onion, Daikon, Tomato, Winter greens)
    // 15% Perennials, Fruits, Herbs
    const stapleArea = Math.round(netPlantArea * 0.35);
    const proteinArea = Math.round(netPlantArea * 0.20);
    const vegArea = Math.round(netPlantArea * 0.30);
    const fruitArea = Math.round(netPlantArea * 0.15);

    setCrops((prev) =>
      prev.map((c) => {
        let allocated = 0;
        let enabled = true;

        if (c.id === 'sweet_potato') allocated = Math.round(stapleArea * 0.55);
        else if (c.id === 'potato') allocated = Math.round(stapleArea * 0.45);
        else if (c.id === 'soybean') allocated = Math.round(proteinArea * 0.7);
        else if (c.id === 'broad_bean') allocated = Math.round(proteinArea * 0.3);
        else if (c.id === 'onion_garlic') allocated = Math.round(vegArea * 0.25);
        else if (c.id === 'daikon_carrot') allocated = Math.round(vegArea * 0.25);
        else if (c.id === 'tomato_summer') allocated = Math.round(vegArea * 0.2);
        else if (c.id === 'winter_greens') allocated = Math.round(vegArea * 0.2);
        else if (c.id === 'green_onion_nira') allocated = Math.round(vegArea * 0.1);
        else if (c.id === 'ume_persimmon') allocated = Math.round(fruitArea * 0.6);
        else if (c.id === 'chestnut_nuts') allocated = Math.round(fruitArea * 0.4);
        else if (c.id === 'pumpkin') allocated = Math.round(stapleArea * 0.15);
        else if (c.id === 'rice_paddy') {
          // If large plot >= 400m2, allocate rice, otherwise zero
          if (totalArea >= 400) {
            allocated = Math.round(totalArea * 0.25);
          } else {
            allocated = 0;
            enabled = false;
          }
        }

        return {
          ...c,
          allocatedAreaSqm: allocated,
          enabled: allocated > 0 && enabled
        };
      })
    );
  };

  // 7. Reset configuration
  const handleReset = () => {
    handleApplyPreset(HOMESTEAD_PRESETS[1]);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        profile={profile}
        presets={HOMESTEAD_PRESETS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileChange={(newProf) => {
          setProfile(newProf);
        }}
        onApplyPreset={handleApplyPreset}
        onReset={handleReset}
      />

      {/* Main App Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'overview' && (
          <SufficiencyOverview
            calc={calc}
            profile={profile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'crops' && (
          <CropPlanner
            crops={crops}
            profile={profile}
            allocatedLandAreaSqm={calc.allocatedLandAreaSqm}
            onUpdateCropArea={handleUpdateCropArea}
            onToggleCrop={handleToggleCrop}
            onAutoOptimize={handleAutoOptimize}
          />
        )}

        {activeTab === 'infra' && (
          <InfraPlanner
            infra={infra}
            profile={profile}
            onUpdateInfra={setInfra}
          />
        )}

        {activeTab === 'calendar' && (
          <SeasonalTimeline
            calendar={SEASONAL_CALENDAR}
            userCrops={crops}
          />
        )}

        {activeTab === 'wisdom' && (
          <HomesteadWisdom
            guides={HOMESTEAD_GUIDES}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-medium text-stone-700">
            自給自足ライフプランナー（食料・エネルギー・水資源の年間循環設計）
          </p>
          <p className="text-stone-400 text-[11px]">
            カロリー推定値・野菜摂取推奨量・太陽光日射データは日本の標準値に基づき算出しています。土壌環境や気候により収穫量は変動します。
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
