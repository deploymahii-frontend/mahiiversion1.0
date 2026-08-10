import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import BottomNavigation from './MobileBottomNav';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PageContainer from './PageContainer';
import BottomCartBar from '../cart/BottomCartBar';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        <Sidebar />
        
        <main className="flex-1 w-full min-w-0 p-3 sm:p-4 md:p-6 pb-24 md:pb-12">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>

      <BottomCartBar />
      <BottomNavigation />
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default AppLayout;
