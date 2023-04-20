import { getElement } from "@/db/Actions";
import { Cause } from "@/types/Timer";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function CausesOverview() {
  const [studyCauses, setStudyCauses] = useState<Cause[]>();
  const causes: Cause[] = [];

  const getPhases = async (): Promise<Cause[]> => {
    const a = (await getElement("causes", "all").then((result) => {
      return result;
    })) as Cause[];
    return a;
  };

  useEffect(() => {
    getPhases().then((c: Cause[]) => {
      c.forEach((p) => {
        causes.push(p);
        setStudyCauses(c);
      });
    });
  });

  return (
    <div>
      <div>
        {studyCauses !== undefined &&
          studyCauses.map((p) => <div key={p.title}>{p.title}</div>)}
      </div>
å      <Link href="/settings/causes/create">Create Cause</Link>
    </div>
  );
}
