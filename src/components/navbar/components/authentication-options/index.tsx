import React from "react";
import { signOut } from "next-auth/react";
import { useGetMe } from "@/hooks/use-get-user";

interface Props {}

export const AuthenticatedOptions: React.FC<Props> = () => {
  const { me } = useGetMe();
  return (
    <div className="flex flex-row">
      <p className="flex items-center text-center">
        Welcome back &nbsp;
        <b>
          {me.firstName} {me.lastName}
        </b>
      </p>
      <button type="button" className="btn btn-ghost" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};
