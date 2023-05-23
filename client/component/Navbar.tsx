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
        <div className=" shadow-[1px_-4px_16px_rgba(39,37,37,0.15)] fixed bottom-0 z-10 flex flex-col items-center justify-center w-screen h-15">
          <ul className="flex justify-center w-full">
            <li
              className={
                "w-full  p-5 align-center  justify-center flex bg-white"
              }
            >
              <Link href="/">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "clock"]}
                    size="2x"
                    className={
                      router === "/" ? "text-dark" : "text-inactiveGrey"
                    }
                  />
                )}
              </Link>
            </li>

            <li
              className={
                "w-full  p-5 align-center  justify-center flex  bg-white"
              }
            >
              <Link href="/overview">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "calendar"]}
                    size="2x"
                    className={
                      router === "/overview" ? "text-dark" : "text-inactiveGrey"
                    }
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
                    size="2x"
                    className={
                      router === "/analytics"
                        ? "text-dark"
                        : "text-inactiveGrey"
                    }
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
                    className={
                      router === "/settings" ? "text-dark" : "text-inactiveGrey"
                    }
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
