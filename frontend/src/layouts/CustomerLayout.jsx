import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import PageContainer from "@/components/layout/PageContainer";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
