// import { PageComponent } from "@/types/Timer";
// import {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";
// import ShowPage from "../overview/ShowPage";

// const TimerContext = createContext<{
//   setShowComponent: Dispatch<SetStateAction<PageComponent>>;
// }>({ setShowComponent: () => null });

// export default function ComponentWrapper() {
//   const [showComponent, setShowComponent] = useState(PageComponent.SETTINGS);
//   return (
//     <div>
//       <TimerContext.Provider value={{ setShowComponent }}>
//         <ShowPage />
//       </TimerContext.Provider>
//     </div>
//   );
// }

// export function useAppContext() {
//   return useContext(TimerContext);
// }
