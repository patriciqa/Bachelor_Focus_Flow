import HideNavbarProvider, {
  NavbarContext,
  useNavbarContext,
} from "@/context/HideNavbarContext";
import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  const { hideNavbar } = useNavbarContext();
  return (
    <>
        {!hideNavbar && <Navbar hideNavbar={hideNavbar} />}

        <div className="container">{children}</div>
    </>
  );
};

export default Layout;
