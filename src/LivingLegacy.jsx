import React, { useState } from 'react';
import { ChevronDown, ListTodo, Briefcase, Users, User, Flag, Heart, Palette, BookOpen, Activity, HeartHandshake, Calendar, CheckCircle2, Coins, Plus, Trash2, Check, Save, RefreshCw } from 'lucide-react';

const themeStyles = {
  blue: { wrapperHover: 'hover:border-blue-100', shadow: 'shadow-blue-900/5', bg: 'bg-blue-50/50', iconBg: 'bg-blue-500', tagText: 'text-blue-500', bhagBorder: 'border-blue-100/50', listItemHover: 'hover:border-blue-200', checkHover: 'group-hover:border-blue-400', checkActive: 'bg-blue-500 border-blue-500 text-white', addBtn: 'text-blue-500 border-blue-200 hover:bg-blue-50', focusRing: 'focus:ring-blue-200' },
  amber: { wrapperHover: 'hover:border-amber-100', shadow: 'shadow-amber-900/5', bg: 'bg-amber-50/50', iconBg: 'bg-amber-500', tagText: 'text-amber-500', bhagBorder: 'border-amber-100/50', listItemHover: 'hover:border-amber-200', checkHover: 'group-hover:border-amber-400', checkActive: 'bg-amber-500 border-amber-500 text-white', addBtn: 'text-amber-500 border-amber-200 hover:bg-amber-50', focusRing: 'focus:ring-amber-200' },
  purple: { wrapperHover: 'hover:border-purple-100', shadow: 'shadow-purple-900/5', bg: 'bg-purple-50/50', iconBg: 'bg-purple-500', tagText: 'text-purple-500', bhagBorder: 'border-purple-100/50', listItemHover: 'hover:border-purple-200', checkHover: 'group-hover:border-purple-400', checkActive: 'bg-purple-500 border-purple-500 text-white', addBtn: 'text-purple-500 border-purple-200 hover:bg-purple-50', focusRing: 'focus:ring-purple-200' },
  emerald: { wrapperHover: 'hover:border-emerald-100', shadow: 'shadow-emerald-900/5', bg: 'bg-emerald-50/50', iconBg: 'bg-emerald-500', tagText: 'text-emerald-500', bhagBorder: 'border-emerald-100/50', listItemHover: 'hover:border-emerald-200', checkHover: 'group-hover:border-emerald-400', checkActive: 'bg-emerald-500 border-emerald-500 text-white', addBtn: 'text-emerald-500 border-emerald-200 hover:bg-emerald-50', focusRing: 'focus:ring-emerald-200' },
  pink: { wrapperHover: 'hover:border-pink-100', shadow: 'shadow-pink-900/5', bg: 'bg-pink-50/50', iconBg: 'bg-pink-500', tagText: 'text-pink-500', bhagBorder: 'border-pink-100/50', listItemHover: 'hover:border-pink-200', checkHover: 'group-hover:border-pink-400', checkActive: 'bg-pink-500 border-pink-500 text-white', addBtn: 'text-pink-500 border-pink-200 hover:bg-pink-50', focusRing: 'focus:ring-pink-200' },
  cyan: { wrapperHover: 'hover:border-cyan-100', shadow: 'shadow-cyan-900/5', bg: 'bg-cyan-50/50', iconBg: 'bg-cyan-500', tagText: 'text-cyan-500', bhagBorder: 'border-cyan-100/50', listItemHover: 'hover:border-cyan-200', checkHover: 'group-hover:border-cyan-400', checkActive: 'bg-cyan-500 border-cyan-500 text-white', addBtn: 'text-cyan-500 border-cyan-200 hover:bg-cyan-50', focusRing: 'focus:ring-cyan-200' }
};

const LivingLegacy = () => {
  // ★ スプレッドシート連携用URL
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzqen-eDOkjrooiQWMzGGMTxFrZkSvfghh2A2FFSSO4EztPaqY2RneXMMJ27mAt45hxZw/exec'; 

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // カテゴリーとBHAGの状態管理
  const [categories, setCategories] = useState([
    { id: 'work', title: '仕事', icon: Briefcase, color: 'blue', bhag: '1000億の\nエッセンシャルワーカー\n産業にする' },
    { id: 'hobby', title: '趣味', icon: Palette, color: 'amber', bhag: '心の底から\nワクワクする体験で\n人生を遊び尽くす' },
    { id: 'intellect', title: '知性', icon: BookOpen, color: 'purple', bhag: '常に学び続け\n専門知識と教養を\n深める' },
    { id: 'health', title: '美容・健康', icon: Activity, color: 'emerald', bhag: '50代、60代を\n現役で走れる\n健康作り' },
    { id: 'family', title: '家族', icon: Users, color: 'pink', bhag: '家と資産を作って\n安心安全な家庭を\n続ける' },
    { id: 'social', title: '社会貢献', icon: HeartHandshake, color: 'cyan', bhag: '培った経験と資産で\n次世代の挑戦を\n支援する' }
  ]);

  // バケットリストの状態管理
  const [items, setItems] = useState({
    work: [], hobby: [], intellect: [], health: [], family: [], social: []
  });

  // 初回データ読み込み
  React.useEffect(() => {
    if (GAS_URL) {
      fetchData();
    } else {
      setItems({
        work: [{ id: 'w1', title: '', when: '', completedDate: '', amount: '', isCompleted: false }],
        hobby: [{ id: 'h1', title: '', when: '', completedDate: '', amount: '', isCompleted: false }],
        intellect: [{ id: 'i1', title: '', when: '', completedDate: '', amount: '', isCompleted: false }],
        health: [{ id: 'he1', title: '', when: '', completedDate: '', amount: '', isCompleted: false }],
        family: [{ id: 'f1', title: '', when: '', completedDate: '', amount: '', isCompleted: false }],
        social: [{ id: 's1', title: '', when: '', completedDate: '', amount: '', isCompleted: false }],
      });
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GAS_URL);
      const data = await response.json();
      
      if (data.categories) {
        setCategories(prev => prev.map(cat => ({
          ...cat,
          bhag: data.categories[cat.id] || cat.bhag
        })));
      }
      
      if (data.items) {
        const newItems = { work: [], hobby: [], intellect: [], health: [], family: [], social: [] };
        Object.keys(data.items).forEach(catId => {
          if (newItems[catId]) {
            newItems[catId] = data.items[catId];
          }
        });
        setItems(newItems);
      }
    } catch (error) {
      console.error("データの読み込みに失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    if (!GAS_URL) return;
    
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ categories, items })
      });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("保存に失敗しました", error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateBhag = (catId, newBhag) => {
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, bhag: newBhag } : cat));
  };

  const addItem = (catId) => {
    const newItem = { id: Date.now().toString(), title: '', when: '', completedDate: '', amount: '', isCompleted: false };
    setItems(prev => ({ ...prev, [catId]: [...prev[catId], newItem] }));
  };

  const updateItem = (catId, itemId, field, value) => {
    setItems(prev => ({
      ...prev,
      [catId]: prev[catId].map(item => item.id === itemId ? { ...item, [field]: value } : item)
    }));
  };

  const deleteItem = (catId, itemId) => {
    setItems(prev => ({ ...prev, [catId]: prev[catId].filter(item => item.id !== itemId) }));
  };

  const toggleComplete = (catId, itemId) => {
    setItems(prev => ({
      ...prev,
      [catId]: prev[catId].map(item => item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item)
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-800">
      
      {/* 操作パネル */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={fetchData} 
          disabled={isLoading || !GAS_URL}
          className="bg-white px-4 py-2 rounded-full shadow-md border border-slate-200 text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-2 disabled:opacity-50 transition-all"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          再読み込み
        </button>
        <button 
          onClick={saveData} 
          disabled={isSaving || !GAS_URL}
          className={`px-5 py-2 rounded-full shadow-md text-sm font-bold text-white flex items-center gap-2 disabled:opacity-50 transition-all
            ${saveStatus === 'success' ? 'bg-emerald-500 hover:bg-emerald-600' : saveStatus === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}
          `}
        >
          {isSaving ? <RefreshCw size={16} className="animate-spin" /> : saveStatus === 'success' ? <Check size={16} /> : <Save size={16} />}
          {isSaving ? '保存中...' : saveStatus === 'success' ? '保存しました！' : 'スプレッドシートに保存'}
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 mt-8">
        
        {/* Header Section */}
        <header className="text-center space-y-6 relative">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-400 rounded-full blur opacity-30"></div>
            <div className="relative bg-white px-8 py-3 rounded-full border border-amber-100 shadow-sm flex items-center gap-3">
              <span className="text-3xl">🦒</span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                リビングレガシー
              </h1>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300"></div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-amber-600 flex items-center justify-center gap-2">
                <Heart size={20} className="fill-amber-500" />
                自分の人生・幸せ、楽しい最大化
              </h2>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">全体俯瞰・永続性</p>
                <p className="text-slate-600 text-lg">争いなく戦わない。<br />平和と愛がある、永続性の高いコミュニティを作る。</p>
              </div>
            </div>
          </div>
        </header>

        {/* Core Values Section */}
        <section className="space-y-8 relative">
          <div className="text-center">
            <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Core Values</h3>
            <h2 className="text-2xl font-bold text-slate-800">コアバリュー</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🐟</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">フナ <span className="text-sm font-normal text-slate-500 ml-1">ハブ・異質の統合</span></h4>
              <p className="text-slate-600 leading-relaxed">様々なコミュニティと交流し、異質なものを組み合わせる。</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:indigo-200 transition-all group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🐧</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">ファーストペンギン <span className="text-sm font-normal text-slate-500 ml-1">最前線・挑戦</span></h4>
              <p className="text-slate-600 leading-relaxed">非属の人。皆の前例となり、未知の領域へ挑戦する。</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:emerald-200 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🦎</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">カメレオン <span className="text-sm font-normal text-slate-500 ml-1">環境・変化適応</span></h4>
              <p className="text-slate-600 leading-relaxed">学習し、変わりゆく環境に素早く適応し続ける。</p>
            </div>
          </div>

          <div className="flex justify-center pt-8 pb-4 opacity-50">
            <div className="flex flex-col items-center gap-1">
              <div className="w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent"></div>
              <ChevronDown className="text-slate-400" />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Categories & Goals</h3>
            <h2 className="text-2xl font-bold text-slate-800">カテゴリー別目標</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const style = themeStyles[cat.color];
              const Icon = cat.icon;
              return (
                <div key={cat.id} className={`bg-white rounded-3xl p-1 border-2 border-transparent ${style.wrapperHover} transition-colors shadow-xl ${style.shadow} flex flex-col h-full`}>
                  <div className={`${style.bg} rounded-[1.4rem] p-6 flex-1 flex flex-col`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2.5 ${style.iconBg} text-white rounded-xl shadow-sm`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">{cat.title}</h3>
                    </div>
                    
                    <div className="mb-8 group/bhag">
                      <div className="flex items-center gap-2 mb-2">
                        <Flag size={16} className={style.tagText} />
                        <span className={`text-xs font-bold ${style.tagText} tracking-wider uppercase`}>BHAG</span>
                      </div>
                      <textarea
                        value={cat.bhag}
                        onChange={(e) => updateBhag(cat.id, e.target.value)}
                        className={`w-full text-lg font-bold text-slate-800 leading-snug bg-white p-4 rounded-xl border ${style.bhagBorder} shadow-sm resize-none outline-none focus:ring-2 ${style.focusRing} transition-shadow`}
                        rows={3}
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <ListTodo size={18} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-500">バケットリスト</span>
                      </div>
                      
                      <div className="space-y-3 mb-4 flex-1">
                        {items[cat.id]?.map((item) => (
                          <div key={item.id} className={`p-3 bg-white rounded-xl border ${item.isCompleted ? 'border-slate-200 bg-slate-50/50' : 'border-slate-100'} shadow-sm transition-colors group ${style.listItemHover}`}>
                            <div className="flex items-start gap-3 mb-3">
                              <button 
                                onClick={() => toggleComplete(cat.id, item.id)}
                                className={`w-5 h-5 rounded-full border-2 transition-colors mt-0.5 shrink-0 flex items-center justify-center ${item.isCompleted ? style.checkActive : `border-slate-200 ${style.checkHover}`}`}
                              >
                                {item.isCompleted && <Check size={12} strokeWidth={3} />}
                              </button>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => updateItem(cat.id, item.id, 'title', e.target.value)}
                                placeholder="やりたいことを入力..."
                                className={`flex-1 bg-transparent outline-none text-sm font-medium w-full ${item.isCompleted ? 'line-through text-slate-400' : 'text-slate-700'}`}
                              />
                              <button 
                                onClick={() => deleteItem(cat.id, item.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className={`grid grid-cols-2 gap-2 pl-8 ${item.isCompleted ? 'opacity-60' : ''}`}>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100/50 px-2 py-1.5 rounded focus-within:border-slate-300 focus-within:bg-white transition-colors">
                                <Calendar size={13} className="text-slate-400 shrink-0" />
                                <span className="shrink-0">いつ:</span>
                                <input 
                                  type="text" 
                                  value={item.when} 
                                  onChange={(e) => updateItem(cat.id, item.id, 'when', e.target.value)}
                                  className="bg-transparent outline-none w-full text-slate-700" 
                                  placeholder="未定" 
                                />
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100/50 px-2 py-1.5 rounded focus-within:border-slate-300 focus-within:bg-white transition-colors">
                                <CheckCircle2 size={13} className="text-slate-400 shrink-0" />
                                <span className="shrink-0">完了日:</span>
                                <input 
                                  type="text" 
                                  value={item.completedDate} 
                                  onChange={(e) => updateItem(cat.id, item.id, 'completedDate', e.target.value)}
                                  className="bg-transparent outline-none w-full text-slate-700" 
                                  placeholder="未定" 
                                />
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100/50 px-2 py-1.5 rounded focus-within:border-slate-300 focus-within:bg-white transition-colors col-span-2">
                                <Coins size={13} className="text-slate-400 shrink-0" />
                                <span className="shrink-0">金額: ¥</span>
                                <input 
                                  type="number" 
                                  value={item.amount} 
                                  onChange={(e) => updateItem(cat.id, item.id, 'amount', e.target.value)}
                                  className="bg-transparent outline-none w-full text-slate-700" 
                                  placeholder="0" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => addItem(cat.id)}
                        className={`w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold ${style.addBtn} bg-white rounded-xl border border-dashed transition-colors`}
                      >
                        <Plus size={16} /> 追加する
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default LivingLegacy;