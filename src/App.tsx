import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer  = lazy(() => import("./components/MainContainer"));

const Portfolio = () => (
  <Suspense>
    <MainContainer>
      <Suspense>
        <CharacterModel />
      </Suspense>
    </MainContainer>
  </Suspense>
);

const App = () => (
  <HashRouter>
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        {/* All project details now open as popups — no separate route needed */}
      </Routes>
    </LoadingProvider>
  </HashRouter>
);

export default App;
