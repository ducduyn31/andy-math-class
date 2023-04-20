interface NavbarProps {
    isAdmin?: boolean
}

const defaultProps: NavbarProps = {
    isAdmin: false
}
const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => <div className="navbar bg-base-100">
    <div className={"navbar-start"}>
        <a className="btn btn-ghost normal-case text-xl">Andy's Math class</a>
        {isAdmin && <div className="badge font-medium">Admin</div>}
    </div>
    <div className="navbar-end">
        <a className="btn btn-ghost">Logout</a>
    </div>
</div>

Navbar.defaultProps = defaultProps
export default Navbar;