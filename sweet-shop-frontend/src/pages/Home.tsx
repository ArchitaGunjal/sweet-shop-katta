import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PackageOpen, Search } from 'lucide-react';
import type { Sweet } from '../types';
import { SweetCard } from '../components/SweetCard';

export const Home = () => {
  const { token } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Sweets
  useEffect(() => {
    const endpoint = searchTerm 
      ? `/api/sweets/search?q=${encodeURIComponent(searchTerm)}` 
      : '/api/sweets';

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSweets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch sweets", err);
        setLoading(false);
      });
  }, [token, searchTerm]);

  // Handle Purchase
  const handlePurchase = async (id: number) => {
    setPurchasingId(id);
    try {
      const res = await fetch(`/api/sweets/${id}/purchase`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        }
      });

      if (res.ok) {
        setSweets(prev => prev.map(s => 
          s.id === id ? { ...s, quantity: s.quantity - 1 } : s
        ));
      } else {
        alert("Failed to purchase item (maybe out of stock?)");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-stone-900 rounded-[2rem] shadow-2xl p-8 sm:p-12 relative overflow-hidden text-white">
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            Inventory Dashboard
          </h2>
          <p className="text-stone-300 text-lg sm:text-xl font-medium max-w-xl mb-8">
            Browsing <span className="text-orange-400 font-bold">{sweets.length}</span> delicious items in stock.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search sweets by name or category..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <svg className="w-96 h-96 -mr-20 -mb-20 text-white rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
          </svg>
        </div>
      </div>

      {/* Inventory Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <PackageOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-stone-800">Current Stock</h3>
        </div>

        {loading ? (
          <div className="text-center py-20 text-stone-400 font-medium animate-pulse">Loading sweets...</div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 border-dashed">
            <p className="text-stone-400 font-medium">No sweets found matching "{searchTerm}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sweets.map(sweet => (
              <SweetCard 
                key={sweet.id} 
                sweet={sweet} 
                onPurchase={handlePurchase}
                isPurchasing={purchasingId === sweet.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};