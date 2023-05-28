import NavBarDashboard from "@/components/navBar/navBarDashBoard";
import HeaderDashboard from "@/components/headerDashboard";
import Footer from "@/components/footer";
function LayoutDashboard({ children }) {
  return (
    <>
      <section className="min-h-screen grid grid-col-1 lg:grid-cols-6 bg-white text-black">
        <NavBarDashboard />
        <section className="col-span-5">
          <HeaderDashboard />
          <section className="p-4 lg:p-12 bg-gray-100 min-h-[50%]">
            {children}
          </section>
          <Footer />
        </section>
      </section>
    </>
  );
}

export default LayoutDashboard;
