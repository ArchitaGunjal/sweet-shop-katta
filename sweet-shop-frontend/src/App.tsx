import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { LogOut, Candy, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-orange-500 p-2.5 rounded-xl shadow-md group-hover:bg-orange-600 transition-colors">
              <Candy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black text-stone-800 tracking-tight group-hover:text-orange-600 transition-colors">
              SweetShop
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {/* Admin Link - Only visible to admins */}
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className="hidden md:flex items-center gap-2 text-stone-500 hover:text-orange-600 font-bold transition-colors"
              >
                <Settings className="w-5 h-5" />
                Admin Panel
              </Link>
            )}

            {/* Profile Link (User Badge) */}
            <Link 
              to="/profile" 
              className="hidden md:flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-full border border-stone-200 hover:bg-orange-50 hover:border-orange-100 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white group-hover:bg-orange-600 transition-colors">
                {user.email[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-stone-700 leading-tight group-hover:text-orange-800">{user.email}</span>
                <span className="text-[10px] uppercase tracking-wider text-orange-600 font-bold leading-tight">
                  {user.role}
                </span>
              </div>
            </Link>

            <button 
              onClick={logout} 
              className="flex items-center justify-center p-2.5 sm:px-5 sm:py-2.5 border-2 border-stone-200 rounded-xl text-stone-600 font-bold hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-stone-400">Loading...</div>;
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-[#FDFBF7]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Home />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;