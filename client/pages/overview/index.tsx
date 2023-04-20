import Link from "next/link";
import React, { useEffect, useState } from "react";

const Overview = () => {

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        <Link href="/settings">settings</Link>
      </div>
    </>
  );
};
export default Overview;
