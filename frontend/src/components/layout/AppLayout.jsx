import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PageContainer from './PageContainer';

const AppLayout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 180px)' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '24px 16px 80px' }}>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
      <BottomNavigation />
      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default AppLayout;
