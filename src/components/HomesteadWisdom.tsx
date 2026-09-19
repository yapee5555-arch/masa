import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Search,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { HomesteadGuideArticle } from '../types';

interface HomesteadWisdomProps {
  guides: HomesteadGuideArticle[];
}

export const HomesteadWisdom: React.FC<HomesteadWisdomProps> = ({ guides }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string>(guides[0]?.id || '');

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'storage', label: '食料戦略・備蓄' },
    { id: 'companion', label: 'コンパニオンプランツ' },
    { id: 'soil', label: '土作り・コンポスト' },
    { id: 'gap_period', label: '端境期・越冬' },
    { id: 'energy', label: 'オフグリッド電力' }
  ];

  const filtered = guides.filter((g) => {
    const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.keyAdvice.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              自給自足の知恵袋・実践マニュアル
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              無農薬栽培の知恵、土壌循環、カロリー計算の極意、オフグリッド電気など、失敗しない自給生活の重要原則をまとめています。
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="キーワード検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-stone-100">
          {categories.map((c) => {
            const active = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guide Cards */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header clickable */}
              <button
                id={`guide-toggle-${item.id}`}
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                    {item.summary}
                  </p>
                </div>

                <div className="p-1 rounded-md text-stone-400 hover:text-stone-700 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/40 space-y-4 text-xs">
                  {/* Steps / Points */}
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                      実践手順・重要ポイント
                    </h4>
                    <ul className="space-y-2">
                      {item.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-stone-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Golden Advice Box */}
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong className="font-bold block mb-0.5">自給の極意:</strong>
                      {item.keyAdvice}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
