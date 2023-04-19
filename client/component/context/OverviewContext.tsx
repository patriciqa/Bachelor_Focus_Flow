// import { PageComponent } from "@/types/Timer";
// import React, {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";
// import ShowPage from "../overview/ShowPage";

// export const OverviewContext = createContext<{
//   showComponent: PageComponent;
//   setShowComponent: Dispatch<SetStateAction<PageComponent>>;
// }>({ showComponent: PageComponent.OVERVIEW, setShowComponent: () => null });

// export default function OverviewProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [showComponent, setShowComponent] = useState(PageComponent.OVERVIEW);
//   return (
//     <OverviewContext.Provider value={{ setShowComponent, showComponent }}>
//       {children}
//     </OverviewContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(OverviewContext);
// }
