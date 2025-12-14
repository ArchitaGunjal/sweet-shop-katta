import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, UserPlus } from 'lucide-react';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess(true);
      // Optional: Redirect after a short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FDFBF7] p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Left Side - Hero (Hidden on Mobile) */}
        <div className="hidden w-1/2 flex-col justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-12 text-white md:flex relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner">
              <UserPlus className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight">Join Us!</h1>
            <p className="text-orange-100 text-lg">Create an account to start your sweet journey.</p>
          </div>
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-stone-800">Create Account</h2>
            <p className="mt-2 text-stone-500">Sign up to get started.</p>
          </div>

          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-700 font-medium animate-pulse">
              Success! Redirecting to login...
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700 font-medium">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-xl border border-stone-200 bg-stone-50 pl-12 p-3.5 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-stone-200 bg-stone-50 pl-12 p-3.5 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-stone-900 px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-stone-200 transition-all hover:bg-orange-600 hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none focus:outline-none focus:ring-4 focus:ring-stone-200"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-orange-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};