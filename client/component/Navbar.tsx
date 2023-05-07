import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar({ hideNavbar }: { hideNavbar: boolean }) {
  const router = useRouter().route;
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  return (
    <>
      {!hideNavbar && (
        <div className="fixed bottom-0 flex flex-col items-center justify-center w-screen">
          <ul className="flex justify-center w-full">
            <Link href="/">
              <li
                className={
                  "w-full  p-5 align-center  justify-center flex bg-white"
                }
              >
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "clock"]}
                    color={router === "/" ? "#5A55F4" : "#CFCFD9"}
                    size="2x"
                  />
                )}
              </li>
            </Link>

            <li
              className={
                "w-full  p-5 align-center  justify-center flex  bg-white"
              }
            >
              <Link href="/overview">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "calendar"]}
                    color={router === "/overview" ? "#5A55F4" : "#CFCFD9"}
                    size="2x"
                  />
                )}
              </Link>
            </li>
            <li
              className={
                "w-full  p-5 align-center  justify-center flex bg-white "
              }
            >
              <Link href="/analytics">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "chart-pie"]}
                    color={router === "/analytics" ? "#5A55F4" : "#CFCFD9"}
                    size="2x"
                  />
                )}
              </Link>
            </li>
            <li
              className={
                "w-full  p-5 align-center  justify-center flex bg-white"
              }
            >
              <Link href="/settings">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "gear"]}
                    color={router === "/settings" ? "#5A55F4" : "#CFCFD9"}
                    size="2x"
                  />
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
