/* eslint-disable react/jsx-filename-extension */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                "w-full  p-5 align-center  justify-center flex bg-white"
              }
            >
              <Link href="/">
                <FontAwesomeIcon
                  icon={["fas", "clock"]}
                  color={router === "/" ? "#5A55F4" : "#CFCFD9"}
                  size="2x"
                />
              </Link>
            </li>
            <li
              className={
                "w-full  p-5 align-center  justify-center flex  bg-white"
              }
            >
              <Link href="/overview">
                <FontAwesomeIcon
                  icon={["fas", "calendar"]}
                  color={router === "/overview" ? "#5A55F4" : "#CFCFD9"}
                  size="2x"
                />
              </Link>
            </li>{" "}
            <li
              className={
                "w-full  p-5 align-center  justify-center flex bg-white "
              }
            >
              <Link href="/analytics">
                <FontAwesomeIcon
                  icon={["fas", "chart-pie"]}
                  color={router === "/analytics" ? "#5A55F4" : "#CFCFD9"}
                  size="2x"
                />
              </Link>
            </li>{" "}
            <li
              className={
                "w-full  p-5 align-center  justify-center flex bg-white"
              }
            >
              <Link href="/settings">
                <FontAwesomeIcon
                  icon={["fas", "gear"]}
                  color={router === "/settings" ? "#5A55F4" : "#CFCFD9"}
                  size="2x"
                />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
