"use client";

import { useState, useEffect } from "react";
import { loginAdmin, logoutAdmin, getSchedule, updateSchedule, getMenuItems, toggleMenuItemSoldOut, saveMenuItem, deleteMenuItem, uploadImage } from "@/app/actions";
import Link from "next/link";
import { Utensils, Clock, LogOut, ExternalLink, Plus, Edit2, Trash2, Check, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";

const DAYS = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

const defaultImages = [
  { label: "Smash Burgare", url: "/assets/images/IMG_5803.jpeg" },
  { label: "Gourmet Körv", url: "/assets/images/IMG_5802.jpeg" },
  { label: "Dirty Fries", url: "/assets/images/IMG_5801.jpeg" },
  { label: "Halv Special", url: "/assets/images/IMG_5800.jpeg" },
  { label: "Bacon & Smoke Burgare", url: "/assets/images/IMG_5799.jpeg" },
  { label: "Laget & Restaurang", url: "/assets/images/IMG_5805.jpeg" },
];

export default function AdminClient({ initialIsAdmin }: { initialIsAdmin: boolean }) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [password, setPassword] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<any>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchData = async () => {
    try {
      const s = await getSchedule();
      if (s.length === 0) {
        setSchedule([
          { day_of_week: "Måndag", location_name: "Falköping & Lidköping", time_range: "Stängt", is_active: false },
          { day_of_week: "Tisdag", location_name: "Järnvägsgatan 12 (Falköping) & Stenportgatan 35 (Lidköping)", time_range: "12:00 - 20:00", is_active: true },
          { day_of_week: "Onsdag", location_name: "Järnvägsgatan 12 (Falköping) & Stenportgatan 35 (Lidköping)", time_range: "12:00 - 20:00", is_active: true },
          { day_of_week: "Torsdag", location_name: "Järnvägsgatan 12 (Falköping) & Stenportgatan 35 (Lidköping)", time_range: "12:00 - 20:00", is_active: true },
          { day_of_week: "Fredag", location_name: "Järnvägsgatan 12 (Falköping) & Stenportgatan 35 (Lidköping)", time_range: "12:00 - 20:00", is_active: true },
          { day_of_week: "Lördag", location_name: "Järnvägsgatan 12 (Falköping) & Stenportgatan 35 (Lidköping)", time_range: "12:00 - 20:00", is_active: true },
          { day_of_week: "Söndag", location_name: "Falköping & Lidköping", time_range: "Stängt", is_active: false },
        ]);
      } else {
        setSchedule(s);
      }
      const m = await getMenuItems();
      setMenuItems(m);
    } catch (e) {
      console.error("Error loading admin data:", e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginAdmin(password);
    if (res.success) {
      setIsAdmin(true);
      showNotification("Inloggad som admin!");
    } else {
      alert("Fel lösenord. Kontrollera lösenordet i .env");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAdmin(false);
  };

  const handleSaveSchedule = async () => {
    setLoading(true);
    await updateSchedule(schedule);
    showNotification("Öppettider och schema sparades!");
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isAdditional: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    
    try {
      const urls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const formData = new FormData();
        formData.append("file", e.target.files[i]);
        const url = await uploadImage(formData);
        urls.push(url);
      }
      
      if (isAdditional) {
        const current = editingMenuItem.additional_images ? editingMenuItem.additional_images + ", " : "";
        setEditingMenuItem({ ...editingMenuItem, additional_images: current + urls.join(", ") });
      } else {
        setEditingMenuItem({ ...editingMenuItem, image: urls[0] });
      }
      showNotification("Bild uppladdad!");
    } catch (err) {
      alert("Kunde inte ladda upp bilden.");
    }
    
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-zinc-900/90 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-lg">
              JW
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Admin Gateway</h2>
              <p className="text-xs text-zinc-400">Skyddad inloggning för meny & priser</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Admin Lösenord / .env Kod
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Skriv admin-lösenord"
                autoFocus
                className="w-full bg-black/60 border border-white/15 focus:border-yellow-400 rounded-xl p-3.5 text-white placeholder-zinc-500 outline-none transition-colors text-base"
              />
            </div>

            <button 
              type="submit"
              disabled={loading} 
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black p-4 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
            >
              {loading ? "Loggar in..." : "Öppna Admin"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-yellow-400 text-black font-black px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900 p-5 rounded-2xl border border-white/10 gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wide">JW Streetfood Admin Dashboard</h2>
          <p className="text-xs text-zinc-400">Järnvägsgatan 12 (Falköping) & Stenportgatan 35 (Lidköping)</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-white hover:text-yellow-400 font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors text-xs uppercase tracking-wider"
          >
            <span>Visa Hemsidan</span>
            <ExternalLink size={14} />
          </Link>
          <button 
            onClick={handleLogout} 
            className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            <LogOut size={14} />
            <span>Logga ut</span>
          </button>
        </div>
      </div>

      {/* Menu Management Section */}
      <section className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-tight flex items-center gap-2">
              <Utensils size={24} />
              <span>Meny & Prisjustering</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Ändra priser, lägg till nya rätter eller markera slutsålt direkt</p>
          </div>
          
          <button 
            onClick={() => setEditingMenuItem({ 
              title_sv: "", 
              title_en: "", 
              desc_sv: "", 
              desc_en: "", 
              price: "125 kr", 
              image: "/assets/images/IMG_5803.jpeg", 
              additional_images: "", 
              tags: "Burgare", 
              is_sold_out: false 
            })}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 font-black rounded-xl uppercase text-xs tracking-wider transition-all shadow-md"
          >
            <Plus size={16} />
            <span>Lägg till menyobjekt</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div className="grid gap-4">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className={`flex flex-col md:flex-row justify-between md:items-center bg-black/50 p-4 sm:p-5 rounded-2xl border transition-all gap-4 ${
                item.is_sold_out ? 'border-red-500/30 opacity-75' : 'border-white/10 hover:border-yellow-400/40'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title_sv || item.title_en} 
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-white text-base sm:text-lg">{item.title_sv || item.title_en}</h3>
                    {item.is_sold_out && (
                      <span className="px-2 py-0.5 rounded bg-red-600/30 text-red-400 border border-red-500/30 text-[10px] font-black uppercase tracking-wider">
                        Slutsåld
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-black text-yellow-400">{item.price} <span className="text-zinc-500 font-normal">{item.tags ? `• ${item.tags}` : ''}</span></p>
                  <p className="text-xs text-zinc-400 line-clamp-1 max-w-lg mt-0.5">{item.desc_sv || item.desc_en}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-xs font-bold text-zinc-300">Slutsåld?</span>
                  <input 
                    type="checkbox" 
                    checked={item.is_sold_out} 
                    onChange={async (e) => {
                      await toggleMenuItemSoldOut(item.id, e.target.checked);
                      fetchData();
                      showNotification(e.target.checked ? "Markerad som slutsåld" : "Markerad som tillgänglig");
                    }}
                    className="w-4 h-4 accent-red-500 rounded"
                  />
                </label>
                
                <button 
                  onClick={() => setEditingMenuItem(item)} 
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <Edit2 size={13} />
                  <span>Redigera</span>
                </button>
                
                <button 
                  onClick={async () => {
                    if (confirm("Vill du verkligen ta bort denna rätt från menyn?")) {
                      await deleteMenuItem(item.id);
                      fetchData();
                      showNotification("Objekt borttaget");
                    }
                  }} 
                  className="inline-flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule / Hours Section */}
      <section className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-tight flex items-center gap-2">
              <Clock size={24} />
              <span>Öppettider & Veckoschema</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Falköping (Järnvägsgatan 12) & Lidköping (Stenportgatan 35)</p>
          </div>
          
          <button 
            onClick={handleSaveSchedule} 
            disabled={loading} 
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 font-black rounded-xl uppercase text-xs tracking-wider transition-all shadow-md"
          >
            {loading ? "Sparar..." : "Spara Schema"}
          </button>
        </div>

        <div className="grid gap-3">
          {schedule.map((day, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row gap-3 lg:items-center bg-black/50 p-4 rounded-xl border border-white/5">
              <div className="w-28 font-black text-sm text-white uppercase">{day.day_of_week}</div>
              
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-300 shrink-0">
                <input 
                  type="checkbox" 
                  checked={day.is_active} 
                  onChange={(e) => {
                    const newS = [...schedule];
                    newS[idx].is_active = e.target.checked;
                    setSchedule(newS);
                  }}
                  className="w-4 h-4 accent-yellow-400 rounded"
                />
                Öppet denna dag
              </label>

              <input 
                type="text" 
                placeholder="Platsbeskrivning" 
                value={day.location_name}
                onChange={(e) => {
                  const newS = [...schedule];
                  newS[idx].location_name = e.target.value;
                  setSchedule(newS);
                }}
                className="flex-1 bg-zinc-950 border border-white/10 rounded-lg p-2.5 text-xs text-white disabled:opacity-40"
                disabled={!day.is_active}
              />

              <input 
                type="text" 
                placeholder="Tider (t.ex. 12:00 - 20:00)" 
                value={day.time_range}
                onChange={(e) => {
                  const newS = [...schedule];
                  newS[idx].time_range = e.target.value;
                  setSchedule(newS);
                }}
                className="w-full lg:w-48 bg-zinc-950 border border-white/10 rounded-lg p-2.5 text-xs text-white disabled:opacity-40 font-mono"
                disabled={!day.is_active}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Edit / Add Menu Item Modal */}
      {editingMenuItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/15 p-6 sm:p-8 rounded-3xl w-full max-w-2xl my-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
              {editingMenuItem.id ? "Redigera Menyobjekt" : "Lägg Till Ny Rätt"}
            </h2>

            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await saveMenuItem(editingMenuItem.id || null, editingMenuItem);
              setEditingMenuItem(null);
              fetchData();
              showNotification("Menyobjekt sparat!");
              setLoading(false);
            }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Titel (Svenska)</label>
                  <input 
                    required 
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm" 
                    value={editingMenuItem.title_sv || ""} 
                    onChange={e => setEditingMenuItem({...editingMenuItem, title_sv: e.target.value})} 
                    placeholder="t.ex. JW Smash Burgare"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Pris</label>
                  <input 
                    required 
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm font-bold text-yellow-400" 
                    value={editingMenuItem.price || ""} 
                    onChange={e => setEditingMenuItem({...editingMenuItem, price: e.target.value})} 
                    placeholder="t.ex. 125 kr"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Beskrivning (Svenska)</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm" 
                  value={editingMenuItem.desc_sv || ""} 
                  onChange={e => setEditingMenuItem({...editingMenuItem, desc_sv: e.target.value})} 
                  placeholder="Beskriv ingredienser, såser och tillbehör..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Taggar (kommaseparerat)</label>
                  <input 
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm" 
                    value={editingMenuItem.tags || ""} 
                    onChange={e => setEditingMenuItem({...editingMenuItem, tags: e.target.value})} 
                    placeholder="Burgare, Wagyu, Bestseller"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Titel (Engelska - valfritt)</label>
                  <input 
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm" 
                    value={editingMenuItem.title_en || ""} 
                    onChange={e => setEditingMenuItem({...editingMenuItem, title_en: e.target.value})} 
                    placeholder="t.ex. JW Smash Burger"
                  />
                </div>
              </div>

              {/* Quick Image Picker from JW Assets */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Välj Bild (Snabbval eller Ladda upp)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {defaultImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setEditingMenuItem({...editingMenuItem, image: img.url})}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        editingMenuItem.image === img.url ? 'border-yellow-400 scale-95 shadow-md' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-white p-0.5 truncate text-center">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input 
                    className="w-full bg-black/60 border border-white/15 p-2.5 rounded-xl text-white text-xs flex-1" 
                    value={editingMenuItem.image || ""} 
                    onChange={e => setEditingMenuItem({...editingMenuItem, image: e.target.value})} 
                    placeholder="Bild-URL (/assets/images/...)" 
                  />
                  <label className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl cursor-pointer font-bold text-xs whitespace-nowrap text-white">
                    <Upload size={14} />
                    <span>Ladda upp fil</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, false)} />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setEditingMenuItem(null)} 
                  className="px-5 py-2.5 hover:bg-white/10 rounded-xl text-sm font-bold text-zinc-300 transition-colors"
                >
                  Avbryt
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg"
                >
                  {loading ? "Sparar..." : "Spara Ändringar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
