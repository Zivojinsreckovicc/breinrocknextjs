"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  Suspense,
  type ReactNode,
} from "react";
import { DemoPopup } from "./DemoPopup";

type DemoPopupContextValue = {
  open: () => void;
  close: () => void;
};

const DemoPopupContext = createContext<DemoPopupContextValue | null>(null);

export function DemoPopupProvider({
  pageSlug,
  children,
}: {
  pageSlug: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DemoPopupContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <DemoPopup pageSlug={pageSlug} isOpen={isOpen} onClose={close} />
      </Suspense>
    </DemoPopupContext.Provider>
  );
}

export function useDemoPopup(): DemoPopupContextValue {
  const context = useContext(DemoPopupContext);
  if (!context) {
    throw new Error("useDemoPopup must be used within DemoPopupProvider");
  }
  return context;
}

/** Returns null when rendered outside a landing page provider. */
export function useDemoPopupOptional(): DemoPopupContextValue | null {
  return useContext(DemoPopupContext);
}
