"use client";
import React from "react";
import Header from "./header";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LayoutContent;
