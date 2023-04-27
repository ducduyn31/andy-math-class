import Navbar from "@/components/Navbar";

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <section>
      <Navbar />
      <div className={"container mx-auto mt-5 h-fullpage"}>{children}</div>
    </section>
  );
};

export default Layout;
