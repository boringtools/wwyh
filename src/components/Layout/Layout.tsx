import React from "react";
import { ReactNode } from "react";
import Header from "./Header"

const Layout: React.FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className="bg-white">
      <Header />
      {children}
    </div>
  )
}

export default Layout
