import { ReactNode } from "react";
import { LawyerCursor } from "@/components/lawyer/LawyerCursor";
import { QuickExit } from "@/components/lawyer/layout/QuickExit";
import { PortalFooter } from "@/components/lawyer/layout/PortalFooter";
import { PublicNav } from "./PublicNav";

export const PublicLayout = ({ children }: { children: ReactNode }) => (
  <div className="lp-root min-h-screen">
    <LawyerCursor />
    <PublicNav />
    <main style={{ paddingTop: 80, paddingBottom: 48 }}>
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">{children}</div>
    </main>
    <PortalFooter />
    <QuickExit />
  </div>
);