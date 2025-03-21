import NonDashboardNavbar from "@/components/NonDashboardNavbar";

import Footer from "@/components/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="nondashboard-layout"
      style={{
        backgroundColor: "white",
        minHeight: "100vh", // Ensures full viewport coverage
        margin: 0,
        zIndex: 1, // Ensures it stacks above
        position: "relative", // Sets stacking context
      }}
    >
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">{children}</main>
      <Footer />
    </div>
  );
}
