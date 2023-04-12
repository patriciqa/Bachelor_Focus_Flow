import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-center flex-row fixed bottom-0">
      <ul className="flex justify-center items-center	">
        <li className=" text-3xl font-bold ">
          <Link href="/Timer">Timer</Link>
        </li>
        <li className=" text-3xl font-bold">
          <Link href="/Overview">Overview</Link>
        </li>
      </ul>
    </div>
  );
}
