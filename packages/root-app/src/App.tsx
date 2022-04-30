import Landing from "@pages/Landing/Landing.page";
import NotFound from "@pages/NotFound/NotFound";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const Home = React.lazy(() => import("./app/pages/Home/Home.page"));
const Wheel = React.lazy(() => import("./app/remote/Wheel.remote"));

const App: React.FC = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };
  useEffect(() => {
    const el = document.querySelector(".overlay");
    // @ts-ignore
    el.style.display = "none";
  }, []);

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <AnimatePresence exitBeforeEnter>
        <Routes
          location={state?.backgroundLocation || location}
          key={location.pathname}
        >
          <Route path="/landing" element={<Landing />} />
          <Route path="app" element={<Home />}>
            <Route path="wheel/*" element={<Wheel />} />
            {/* <Route path="game/*" element={<Game />} /> */}
            <Route path="/app" element={<Navigate replace to="wheel" />} />
          </Route>
          <Route path="/" element={<Navigate replace to="/app" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </React.Suspense>
  );
};

export default App;
