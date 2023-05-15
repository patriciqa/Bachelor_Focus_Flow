import { createContext, ReactNode, useContext, useState } from "react";

const ExamContext = createContext<{
  examPhaseId: number;
  setExamPhaseId: (d: number) => void;
}>({ examPhaseId: -1, setExamPhaseId: () => null });

export default function ExamContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [examPhaseId, setExamPhaseId] = useState(-1);
  return (
    <ExamContext.Provider value={{ examPhaseId, setExamPhaseId }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExamPhaseContext() {
  return useContext(ExamContext);
}
