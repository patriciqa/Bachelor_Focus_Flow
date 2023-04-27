import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const ExamContext = createContext<{
  examPhaseId: string;
  setExamPhaseId: Dispatch<SetStateAction<string>>;
}>({ examPhaseId: "", setExamPhaseId: () => null });

export default function ExamContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [examPhaseId, setExamPhaseId] = useState("");
  return (
    <ExamContext.Provider value={{ examPhaseId, setExamPhaseId }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExamPhaseContext() {
  return useContext(ExamContext);
}
