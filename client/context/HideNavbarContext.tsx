import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const NavbarContext = createContext<{
  hideNavbar: boolean;
  setHideNavbar: Dispatch<SetStateAction<boolean>>;
}>({ hideNavbar: false, setHideNavbar: () => null });

export default function HideNavbarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hideNavbar, setHideNavbar] = useState(false);
  return (
    <NavbarContext.Provider value={{ hideNavbar, setHideNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}
