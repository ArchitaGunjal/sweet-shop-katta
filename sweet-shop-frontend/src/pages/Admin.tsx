import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, ArrowLeft, PackagePlus, Save, X, Edit3 } from 'lucide-react';
import type { Sweet } from '../types';

export const Admin = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', quantity: ''
  });

  useEffect(() => {
    // Basic role check
    if (user?.role !== 'admin') {
      navigate('/'); 
      return;
    }
    fetchSweets();
  }, [user, navigate]);

  const fetchSweets = () => {
    fetch('/api/sweets', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSweets(data);
      });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sweet?')) return;
    
    await fetch(`/api/sweets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    // Optimistic update
    setSweets(prev => prev.filter(s => s.id !== id));
  };

  const handleRestock = async (id: number) => {
    const qty = prompt("How many to add?", "10");
    if (!qty) return;

    await fetch(`/api/sweets/${id}/restock`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ quantity: parseInt(qty) })
    });
    fetchSweets(); // Refresh data from server to get accurate new stock
  };

  const startEdit = (sweet: Sweet) => {
    setEditingId(sweet.id);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString()
    });
    setShowForm(true);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startAdd = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', price: '', quantity: '' });
    setShowForm(!showForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingId ? `/api/sweets/${editingId}` : '/api/sweets';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      })
    });

    if (res.ok) {
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', category: '', price: '', quantity: '' });
      fetchSweets();
    } else {
      alert("Failed to save sweet. Check your input.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans p-8 text-stone-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-3 bg-white rounded-xl shadow-sm border border-stone-200 hover:bg-stone-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-stone-800">Admin Inventory</h1>
              <p className="text-stone-500">Manage products and stock levels</p>
            </div>
          </div>
          <button 
            onClick={startAdd}
            className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all active:scale-95"
          >
            {showForm && !editingId ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm && !editingId ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 mb-10 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-stone-800">
                {editingId ? <Edit3 className="w-5 h-5 text-orange-500" /> : <PackagePlus className="w-5 h-5 text-orange-500" />}
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              {editingId && (
                <button onClick={() => setShowForm(false)} className="text-sm text-red-500 font-bold hover:underline">Cancel Edit</button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                placeholder="Product Name" 
                className="p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input 
                placeholder="Category (e.g. Gummies)" 
                className="p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                required
              />
              <input 
                type="number" 
                placeholder="Price ($)" 
                step="0.01"
                className="p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                required
              />
              <input 
                type="number" 
                placeholder="Quantity" 
                className="p-4 bg-stone-50 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
                value={formData.quantity}
                onChange={e => setFormData({...formData, quantity: e.target.value})}
                required
              />
              <div className="md:col-span-2 mt-2">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99]">
                  <Save className="w-5 h-5" />
                  {editingId ? 'Update Product' : 'Save to Inventory'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="p-6 font-bold text-stone-500 text-xs uppercase tracking-wider">Product</th>
                  <th className="p-6 font-bold text-stone-500 text-xs uppercase tracking-wider">Category</th>
                  <th className="p-6 font-bold text-stone-500 text-xs uppercase tracking-wider">Price</th>
                  <th className="p-6 font-bold text-stone-500 text-xs uppercase tracking-wider">Stock</th>
                  <th className="p-6 font-bold text-stone-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {sweets.map(sweet => (
                  <tr key={sweet.id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="p-6 font-bold text-stone-800">{sweet.name}</td>
                    <td className="p-6">
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {sweet.category}
                      </span>
                    </td>
                    <td className="p-6 font-medium text-stone-600">${sweet.price.toFixed(2)}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${sweet.quantity < 10 ? 'text-red-500' : 'text-stone-800'}`}>
                          {sweet.quantity}
                        </span>
                        {sweet.quantity < 10 && (
                          <span className="text-[10px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">Low</span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(sweet)}
                          className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          title="Edit"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleRestock(sweet.id)}
                          className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                          title="Restock"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(sweet.id)}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sweets.length === 0 && (
            <div className="p-16 text-center">
              <div className="bg-stone-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PackagePlus className="w-8 h-8 text-stone-300" />
              </div>
              <p className="text-stone-500 font-medium">No items in inventory yet.</p>
              <p className="text-stone-400 text-sm mt-1">Click "Add Product" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};