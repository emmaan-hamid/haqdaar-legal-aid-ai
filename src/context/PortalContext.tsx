import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Lang = "en" | "ur";
export type PortalKind = "lawyer" | "ngo";
type Ctx = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  kind: PortalKind;
};
const PortalContext = createContext<Ctx | null>(null);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const { pathname } = useLocation();
  const kind: PortalKind = pathname.startsWith("/ngo") ? "ngo" : "lawyer";

  useEffect(() => {
    const m = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCollapsed(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  return (
    <PortalContext.Provider value={{ collapsed, toggleCollapsed: () => setCollapsed((c) => !c), lang, setLang, kind }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal outside provider");
  return ctx;
};
