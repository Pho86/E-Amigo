import React from "react";

export default function HeroBanner({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {

  return (
    <div
      className={
        "relative h-[100dvh] flex items-center  justify-center w-full group"}
    >
      <div className={"flex items-center justify-center flex-col gap-2 md:px-0 px-4"}>{children}</div>
    </div>
  );
};