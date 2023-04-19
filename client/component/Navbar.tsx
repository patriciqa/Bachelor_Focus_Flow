import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter().route;

  return (
    <div className="fixed bottom-0 flex flex-col items-center justify-center w-screen">
      <ul className="flex justify-center w-full">
        <li
          className={
            "w-full  p-5 align-center  justify-center flex " +
            (router === "/overview/" && "bg-metal")
          }
        >
          <Link href="/">Timer</Link>
        </li>
        <li
          className={
            "w-full  p-5 align-center  justify-center flex " +
            (router === "/Overview" && "bg-metal")
          }
        >
          <Link href="/Overview">Overview</Link>
        </li>
      </ul>
    </div>
  );
}
