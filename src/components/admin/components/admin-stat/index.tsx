import { useCountRecordsQuery } from "@/gql/types";
import { assureNumber } from "@/helpers/number";
import { useRouter } from "next/router";
import { matchPath } from "@/helpers/path";
import Link from "next/link";

export const AdminStat = () => {
  const router = useRouter();
  const path = router.asPath;
  const { data } = useCountRecordsQuery();
  return (
    <>
      <div className="stats shadow flex">
        <Link
          className={matchPath(path, "/admin/users") ? "active stat" : "stat"}
          href="/admin/users"
          shallow
        >
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <div className="stat-title">Total users</div>
          <div className="stat-value text-primary">
            {assureNumber(data?.usersCollection?.totalCount)}
          </div>
        </Link>

        <Link
          className={matchPath(path, "/admin/books") ? "active stat" : "stat"}
          href="/admin/books"
          shallow
        >
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <div className="stat-title">Total books</div>
          <div className="stat-value text-secondary">
            {assureNumber(data?.booksCollection?.totalCount)}
          </div>
        </Link>

        <Link
          className={
            matchPath(path, "/admin/questions") ? "active stat" : "stat"
          }
          href="/admin/questions"
          shallow
        >
          <div className="stat-figure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="stat-title">Total questions/answers</div>
          <div className="stat-value">
            {assureNumber(data?.questionsCollection?.totalCount)}
          </div>
        </Link>
      </div>
    </>
  );
};
