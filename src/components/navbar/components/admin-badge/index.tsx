import React from "react";
import Link from "next/link";
import { useGetMe } from "@/hooks/use-get-user";
import { matchPath } from "@/helpers/path";
import { useRouter } from "next/router";

interface Props {}

export const AdminBadge: React.FC<Props> = () => {
  const router = useRouter();
  const path = router.asPath;
  const { isAdmin } = useGetMe();
  const isAdminPage = matchPath(path, "/admin");
  const message = isAdminPage ? "Switch to user mode" : "Switch to admin mode";
  const targetPath = isAdminPage ? "/" : "/admin";

  if (!isAdmin) return null;
  return (
    <Link
      href={targetPath}
      className="badge font-medium tooltip tooltip-bottom"
      data-tip={message}
    >
      Admin
    </Link>
  );
};
