import { create } from "zustand";

export type Theme = "dark" | "light";
export type DeploymentState = "idle" | "running" | "success" | "error";

interface PortfolioStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Boot sequence
  bootComplete: boolean;
  setBootComplete: (v: boolean) => void;

  // Active API endpoint (from globe hover)
  activeEndpoint: string | null;
  setActiveEndpoint: (endpoint: string | null) => void;

  // API Docs Drawer
  docsDrawerOpen: boolean;
  setDocsDrawerOpen: (v: boolean) => void;

  // Contact form deployment simulation
  deploymentState: DeploymentState;
  setDeploymentState: (state: DeploymentState) => void;

  // Mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  // Theme — dark by default
  theme: "dark",
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("light", theme === "light");
      localStorage.setItem("hm-theme", theme);
    }
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  // Boot sequence
  bootComplete: false,
  setBootComplete: (v) => set({ bootComplete: v }),

  // Globe active endpoint
  activeEndpoint: null,
  setActiveEndpoint: (endpoint) => set({ activeEndpoint: endpoint }),

  // API Docs Drawer
  docsDrawerOpen: false,
  setDocsDrawerOpen: (v) => set({ docsDrawerOpen: v }),

  // Contact form
  deploymentState: "idle",
  setDeploymentState: (state) => set({ deploymentState: state }),

  // Mobile nav
  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),
}));
