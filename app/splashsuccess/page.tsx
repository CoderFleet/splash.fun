"use client";

import SplashSuccess from "@/components/SplashSuccess"; // whatever you named it
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading token data...</div>}>
      <SplashSuccess />;
    </Suspense>
  );
}
