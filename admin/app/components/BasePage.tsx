import Link from "next/link";
import React from "react";

export default function BasePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-200 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-outfit text-2xl">
            Admin Panel
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link href="/" className="font-outfit">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/verification" className="font-outfit">
                  Verification
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <div className="w-full flex flex-col items-center justify-center py-10">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/verification">Verification</Link>
          </li>
        </ul>
      </div>
    </div>
    // <div className="min-h-screen bg-base-100">
    //   <div className="navbar">
    //     <div className="navbar-start">
    //       <div className="dropdown">
    //         <div
    //           tabIndex={0}
    //           role="button"
    //           className="btn btn-ghost btn-circle"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M4 6h16M4 12h16M4 18h7"
    //             />
    //           </svg>
    //         </div>
    //         <ul
    //           tabIndex={0}
    //           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    //         >
    //           <li>
    //             <Link href="/">Homepage</Link>
    //           </li>
    //           <li>
    //             <Link href="/form">Add Report</Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="navbar-center">
    //       <Link href="/" className="font-outfit font-bold text-2xl">
    //         Monitoring and Evaluation System
    //       </Link>
    //     </div>
    //     <div className="navbar-end">
    //       <button className="btn btn-ghost btn-circle">
    //         <div className="indicator">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    //             />
    //           </svg>
    //           <span className="badge badge-xs badge-primary indicator-item"></span>
    //         </div>
    //       </button>
    //     </div>
    //   </div>
    //   <div className="w-full flex flex-col items-center justify-center py-10">{children}</div>
    // </div>
  );
}
