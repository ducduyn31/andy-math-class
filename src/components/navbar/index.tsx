import { signOut, useSession } from "next-auth/react";

interface NavbarProps {
  isAdmin?: boolean;
}

const defaultProps: NavbarProps = {
  isAdmin: false,
};
export const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const { status } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className={"navbar-start"}>
        <a className="btn btn-ghost normal-case text-xl">Andy's Math class</a>
        {isAdmin && <div className="badge font-medium">Admin</div>}
      </div>
      {status === "authenticated" && (
        <div className="navbar-end">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

Navbar.defaultProps = defaultProps;

export default Navbar;
