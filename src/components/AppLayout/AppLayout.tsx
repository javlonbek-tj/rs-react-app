import { Outlet } from 'react-router';
import Header from '../Header/Header';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-800">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
