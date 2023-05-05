/* eslint-disable react/jsx-filename-extension */
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ hideNavbar }: { hideNavbar: boolean }) {
  const router = useRouter().route;
  return (
    <>
      {!hideNavbar && (
        <div className="fixed bottom-0 flex flex-col items-center justify-center w-screen">
          <ul className="flex justify-center w-full">
            <li
              className={
                "w-full  p-5 align-center  justify-center flex " +
                (router === "/" && "bg-metal")
              }
            >
              <Link href="/">Timer</Link>
            </li>
            <li
              className={
                "w-full  p-5 align-center  justify-center flex " +
                (router === "/overview" && "bg-metal")
              }
            >
              <Link href="/overview">Overview</Link>
            </li>{" "}
            <li
              className={
                "w-full  p-5 align-center  justify-center flex " +
                (router === "/analytics" && "bg-metal")
              }
            >
              <Link href="/analytics">Analytics</Link>
            </li>{" "}
            <li
              className={
                "w-full  p-5 align-center  justify-center flex " +
                (router === "/settings" && "bg-metal")
              }
            >
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
