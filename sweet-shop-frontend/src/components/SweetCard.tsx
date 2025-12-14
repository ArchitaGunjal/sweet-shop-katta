import React from 'react';
import { Plus } from 'lucide-react';
import type { Sweet } from '../types'; // Added 'type' keyword

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: number) => void;
  isPurchasing: boolean;
}

export const SweetCard = ({ sweet, onPurchase, isPurchasing }: SweetCardProps) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className={`group relative overflow-hidden rounded-[1.5rem] bg-white border border-stone-100 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isOutOfStock ? 'opacity-75 grayscale' : ''}`}>
      
      {/* Image / Icon Area */}
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100 transition-colors">
        <span className="text-6xl drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
          {sweet.image || '🍬'}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 rounded-lg">
              {sweet.category}
            </span>
            <h3 className="text-lg font-black text-stone-800 leading-tight mb-1">{sweet.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-stone-800">${sweet.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : sweet.quantity < 10 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
            <span className={`text-xs font-bold ${isOutOfStock ? 'text-red-600' : 'text-stone-500'}`}>
              {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} left`}
            </span>
          </div>

          <button
            onClick={() => onPurchase(sweet.id)}
            disabled={isOutOfStock || isPurchasing}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 text-white hover:bg-orange-600 shadow-lg shadow-stone-200 active:scale-95'
            }`}
          >
            {isPurchasing ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};