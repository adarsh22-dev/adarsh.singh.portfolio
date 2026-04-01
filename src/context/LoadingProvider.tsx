import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  // sessionStorage persists for the entire browser tab session.
  // Once the portfolio has loaded once, we NEVER show the loader again —
  // this prevents the loading screen from replaying when the user clicks
  // Back from a project detail page.
  const alreadyLoaded = sessionStorage.getItem("portfolio_loaded") === "true";
  const [isLoading, setIsLoading] = useState(!alreadyLoaded);
  const [loading, setLoading] = useState(alreadyLoaded ? 100 : 0);

  const handleSetIsLoading = (state: boolean) => {
    if (!state) {
      // Mark as loaded in sessionStorage so re-mounts skip the loader
      sessionStorage.setItem("portfolio_loaded", "true");
    }
    setIsLoading(state);
  };

  // Extra safety: if sessionStorage says loaded but state disagrees, sync it
  useEffect(() => {
    if (alreadyLoaded && isLoading) {
      setIsLoading(false);
    }
  }, []);

  const value = {
    isLoading,
    setIsLoading: handleSetIsLoading,
    setLoading,
  };
  useEffect(() => {}, [loading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
