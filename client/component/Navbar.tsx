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
        <div className=" shadow-[1px_-4px_16px_rgba(39,37,37,0.15)] fixed bottom-0 z-20 flex flex-col items-center justify-center w-screen  h-[10vh] bg-white">
          <ul className="fixed flex justify-center w-full bottom-[4.5vh] ">
            <li className={"w-full  align-center  justify-center flex"}>
              <Link href="/">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "clock"]}
                    size="xl"
                    className={
                      router === "/" ? "text-dark" : "text-inactiveGrey"
                    }
                  />
                )}
              </Link>
            </li>

            <li className={"w-full  pb- align-center  justify-center flex  "}>
              <Link href="/overview">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "calendar"]}
                    size="xl"
                    className={
                      router === "/overview" ? "text-dark" : "text-inactiveGrey"
                    }
                  />
                )}
              </Link>
            </li>
            <li className={"w-full  pb3 align-center  justify-center flex "}>
              <Link href="/analytics">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "chart-pie"]}
                    size="xl"
                    className={
                      router === "/analytics"
                        ? "text-dark"
                        : "text-inactiveGrey"
                    }
                  />
                )}
              </Link>
            </li>
            <li className={"w-full  pb- align-center  justify-center flex"}>
              <Link href="/settings">
                {initialRenderComplete && (
                  <FontAwesomeIcon
                    icon={["fas", "gear"]}
                    className={
                      router === "/settings" ? "text-dark" : "text-inactiveGrey"
                    }
                    size="xl"
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
