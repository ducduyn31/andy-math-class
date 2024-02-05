import React from "react";
import Link from "next/link";

interface Props {}

export const SideNavigation: React.FC<Props> = ({}) => {
  return (
    <aside className="bg-base-300 h-screen overflow-y-scroll w-[300px]">
      <ul className="menu">
        <li>
          <Link href="/admin/users">Users</Link>
        </li>
        <li>
          <Link href="/admin/books">Books</Link>
        </li>
        <li>
          <Link href="/admin/questions">Questions</Link>
        </li>
      </ul>
    </aside>
  );
};
