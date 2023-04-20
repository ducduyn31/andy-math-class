import Navbar from "@/components/Navbar";

// @ts-ignore
const Layout = ({ children }) => {
    return <section>
        <Navbar/>
        {children}
    </section>
}

export default Layout