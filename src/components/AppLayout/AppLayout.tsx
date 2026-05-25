import { Outlet, NavLink } from 'react-router';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="sticky top-0 z-50 bg-linear-to-b from-red-600 to-red-700 shadow-xl border-b-4 border-red-900">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-md">
            Pokemon
          </span>
          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default AppLayout;
