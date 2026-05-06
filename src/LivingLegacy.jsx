import React, { useState } from 'react';
import { ChevronDown, ListTodo, Briefcase, Users, User, Flag, Heart, Palette, BookOpen, Activity, HeartHandshake, Calendar, CheckCircle2, Coins, Plus, Trash2, Check, Save, RefreshCw, AlertCircle } from 'lucide-react';

const themeStyles = {
  blue: { wrapperHover: 'hover:border-blue-100', shadow: 'shadow-blue-900/5', bg: 'bg-blue-50/50', iconBg: 'bg-blue-500', tagText: 'text-blue-500', bhagBorder: 'border-blue-100/50', listItemHover: 'hover:border-blue-200', checkHover: 'group-hover:border-blue-400', checkActive: 'bg-blue-500 border-blue-500 text-white', addBtn: 'text-blue-500 border-blue-200 hover:bg-blue-50', focusRing: 'focus:ring-blue-200' },
  amber: { wrapperHover: 'hover:border-amber-100', shadow: 'shadow-amber-900/5', bg: 'bg-amber-50/50', iconBg: 'bg-amber-500', tagText: 'text-amber-500', bhagBorder: 'border-amber-100/50', listItemHover: 'hover:border-amber-200', checkHover: 'group-hover:border-amber-400', checkActive: 'bg-amber-500 border-amber-500 text-white', addBtn: 'text-amber-500 border-amber-200 hover:bg-amber-50', focusRing: 'focus:ring-amber-200' },
  purple: { wrapperHover: 'hover:border-purple-100', shadow: 'shadow-purple-900/5', bg: 'bg-purple-50/50', iconBg: 'bg-purple-500', tagText: 'text-purple-500', bhagBorder: 'border-purple-100/50', listItemHover: 'hover:border-purple-200', checkHover: 'group-hover:border-purple-400', checkActive: 'bg-purple-500 border-purple-500 text-white', addBtn: 'text-purple-500 border-purple-200 hover:bg-purple-50', focusRing: 'focus:ring-purple-200' },
  emerald: { wrapperHover: 'hover:border-emerald-100', shadow: 'shadow-emerald-900/5', bg: 'bg-emerald-50/50', iconBg: 'bg-emerald-500', tagText: 'text-emerald-500', bhagBorder: 'border-emerald-100/50', listItemHover: 'hover:border-emerald-200', checkHover: 'group-hover:border-emerald-400', checkActive: 'bg-emerald-500 border-emerald-500 text-white', addBtn: 'text-emerald-500 border-emerald-200 hover:bg-emerald-50', focusRing: 'focus:ring-emerald-200' },
  pink: { wrapperHover: 'hover:border-pink-100', shadow: 'shadow-pink-900/5', bg: 'bg-pink-50/50', iconBg: 'bg-pink-500', tagText: 'text-pink-500', bhagBorder: 'border-pink-100/50', listItemHover: 'hover:border-pink-200', checkHover: 'group-hover:border-pink-400', checkActive: 'bg-pink-500 border-pink-500 text-white', addBtn: 'text-pink-500 border-pink-200 hover:bg-pink-50', focusRing: 'focus:ring-pink-200' },
  cyan: { wrapperHover: 'hover:border-cyan-100', shadow: 'shadow-cyan-900/5', bg: 'bg-cyan-50/50', iconBg: 'bg-cyan-500', tagText: 'text-cyan-500', bhagBorder: 'border-cyan-100/50', listItemHover: 'hover:border-cyan-200', checkHover: 'group-hover:border-cyan-400', checkActive: 'bg-cyan-500 border-cyan-500 text-white', addBtn: 'text-cyan-500 border-cyan-200 hover:bg-cyan-50', focusRing: 'focus:ring-cyan-200' }
};

const LivingLegacy = () => {
  // ★ ここにご自身のGAS URLを貼り付けてください
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzqen-eDOkjrooiQWMzGGMTxFrZkSvfghh2A2FFSSO4EztPaqY2RneXMMJ27mAt45hxZw/exec'; 

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [categories, setCategories] = useState([
    { id: 'work', title: '仕事', icon: Briefcase, color: 'blue', bhag: '1000億の\nエッセンシャルワーカー\n産業にする' },
    { id: 'hobby', title: '趣味', icon: Palette, color: 'amber', bhag: '心の底から\nワクワクする体験で\n人生を遊び尽くす' },
    { id: 'intellect', title: '知性', icon: BookOpen, color: 'purple', bhag: '常に学び続け\n専門知識と教養を\n深める' },
    { id: 'health', title: '美容・健康', icon: Activity, color: 'emerald', bhag: '50代、60代を\n現役で走れる\n健康作り' },
    { id: 'family', title: '家族', icon: Users, color: 'pink', bhag: '家と資産を作って\n安心安全な家庭を\n続ける' },
    { id: 'social', title: '社会貢献', icon: HeartHandshake, color: 'cyan', bhag: '培った経験と資産で\n次世代の挑戦を\n支援する' }
  ]);

  const [items, setItems] = useState({
    work: [], hobby: [], intellect: [], health: [], family: [], social: []
  });

  React.useEffect(() => {
    if (GAS_URL) fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(GAS_URL);
      const data = await response.json();
      if (data.status === 'error') throw new Error(data.message);
      if (data.categories) setCategories(prev => prev.map(cat => ({ ...cat, bhag: data.categories[cat.id] || cat.bhag })));
      if (data.items) {
        const newItems = { work: [], hobby: [], intellect: [], health: [], family: [], social: [] };
        Object.keys(data.items).forEach(catId => { if (newItems[catId]) newItems[catId] = data.items[catId]; });
        setItems(newItems);
      }
    } catch (error) { setErrorMessage("データの読み込みに失敗しました。"); } finally { setIsLoading(false); }
  };

  const saveData = async () => {
    if (!GAS_URL) return;
    setIsSaving(true);
    setSaveStatus(null);
    setErrorMessage(null);
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ categories, items })
      });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) { setSaveStatus('error'); setErrorMessage("保存に失敗しました。"); } finally { setIsSaving(false); }
  };

  const updateBhag = (catId, newBhag) => setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, bhag: newBhag } : cat));
  const addItem = (catId) => setItems(prev => ({ ...prev, [catId]: [...prev[catId], { id: Date.now().toString(), title: '', when: '', completedDate: '', amount: '', isCompleted: false }] }));
  const updateItem = (catId, itemId, field, value) => setItems(prev => ({ ...prev, [catId]: prev[catId].map(item => item.id === itemId ? { ...item, [field]: value } : item) }));
  const deleteItem = (catId, itemId) => setItems(prev => ({ ...prev, [catId]: prev[catId].filter(item => item.id !== itemId) }));
  const toggleComplete = (catId, itemId) => setItems(prev => ({ ...prev, [catId]: prev[catId].map(item => item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item) }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 font-sans text-slate-800">
      {/* 操作パネル */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <button onClick={fetchData} className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-slate-200 text-sm font-bold flex items-center gap-2"><RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />再読込</button>
          <button onClick={saveData} className={`px-5 py-2 rounded-full shadow-lg text-sm font-bold text-white flex items-center gap-2 transition-all ${saveStatus === 'success' ? 'bg-emerald-500' : 'bg-slate-800'}`}>{isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}保存</button>
        </div>
        {errorMessage && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-red-100 shadow-sm"><AlertCircle size={14} />{errorMessage}</div>}
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-6 pt-8">
          <div className="bg-white px-8 py-3 rounded-full border border-amber-100 shadow-sm inline-flex items-center gap-3">
            <span className="text-3xl">🦒</span><h1 className="text-2xl font-bold tracking-tight">リビングレガシー</h1>
          </div>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-lg font-semibold text-amber-600 flex items-center justify-center gap-2"><Heart size={20} className="fill-amber-500" />人生の最大化</h2>
            <p className="text-xl font-medium mt-2 leading-relaxed">全体俯瞰・永続性</p>
            <p className="text-slate-500 text-sm md:text-base">平和と愛がある、永続性の高いコミュニティを作る。</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map(cat => {
            const style = themeStyles[cat.color];
            return (
              <div key={cat.id} className={`bg-white rounded-[2.5rem] p-6 shadow-xl ${style.bg} border-2 border-transparent hover:border-white transition-all flex flex-col`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 ${style.iconBg} text-white rounded-2xl shadow-lg`}><cat.icon size={24} /></div>
                  <h3 className="text-2xl font-bold text-slate-800">{cat.title}</h3>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Flag size={14} className={style.tagText} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${style.tagText}`}>BHAG</span>
                  </div>
                  <textarea value={cat.bhag} onChange={e => updateBhag(cat.id, e.target.value)} className="w-full p-4 bg-white/80 rounded-2xl border border-slate-100 text-base font-bold resize-none outline-none focus:ring-2 shadow-inner min-h-[100px]" rows={3} />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <ListTodo size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bucket List</span>
                  </div>
                  
                  <div className="space-y-4">
                    {items[cat.id]?.map(item => (
                      <div key={item.id} className="bg-white/90 rounded-2xl border border-slate-100 shadow-sm p-4 group transition-all hover:shadow-md">
                        <div className="flex items-start gap-3 mb-4">
                          <button onClick={() => toggleComplete(cat.id, item.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${item.isCompleted ? style.checkActive : 'border-slate-200 bg-slate-50'}`}>{item.isCompleted && <Check size={14} strokeWidth={3} />}</button>
                          <input value={item.title} onChange={e => updateItem(cat.id, item.id, 'title', e.target.value)} className={`flex-1 text-sm font-bold outline-none bg-transparent ${item.isCompleted ? 'line-through text-slate-300' : 'text-slate-700'}`} placeholder="やりたいこと..." />
                          <button onClick={() => deleteItem(cat.id, item.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                        </div>
                        
                        {/* 3行構成の入力エリア */}
                        <div className={`space-y-2 transition-opacity ${item.isCompleted ? 'opacity-40' : 'opacity-100'}`}>
                          {/* 1段目: いつ */}
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <Calendar size={12} className="text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 w-12 shrink-0">いつ:</span>
                            <input value={item.when} onChange={e => updateItem(cat.id, item.id, 'when', e.target.value)} className="text-[11px] font-bold bg-transparent outline-none w-full text-slate-600" placeholder="未定" />
                          </div>
                          {/* 2段目: 完了日 */}
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <CheckCircle2 size={12} className="text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 w-12 shrink-0">完了日:</span>
                            <input value={item.completedDate} onChange={e => updateItem(cat.id, item.id, 'completedDate', e.target.value)} className="text-[11px] font-bold bg-transparent outline-none w-full text-slate-600" placeholder="未定" />
                          </div>
                          {/* 3段目: 金額 */}
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <Coins size={12} className="text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 w-12 shrink-0">金額:</span>
                            <span className="text-[11px] font-bold text-slate-400">¥</span>
                            <input type="number" value={item.amount} onChange={e => updateItem(cat.id, item.id, 'amount', e.target.value)} className="text-[11px] font-bold bg-transparent outline-none w-full text-slate-700" placeholder="0" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addItem(cat.id)} className={`w-full py-4 border-dashed border-2 rounded-2xl text-sm font-bold ${style.tagText} bg-white/50 hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2`}><Plus size={18}/> 項目を追加</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default LivingLegacy;