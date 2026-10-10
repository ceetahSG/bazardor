"use client";

import { useSyncExternalStore } from "react";

const getCurrentDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

const CurrentDate = () => {
  const formattedDate = useSyncExternalStore(
    () => () => {},
    getCurrentDate,
    () => "",
  );

  return <span suppressHydrationWarning>{formattedDate}</span>;
};

export default CurrentDate;
