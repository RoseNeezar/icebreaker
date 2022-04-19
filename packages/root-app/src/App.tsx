import Home from "@pages/Home/Home.page";
import Landing from "@pages/Landing/Landing.page";
import NotFound from "@pages/NotFound/NotFound";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// const Wheel = React.lazy(() => import("./app/remote/Wheel.remote"));

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
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/landing" element={<Landing />} />
        <Route path="app" element={<Home />}>
          <Route
            path="wheel/*"
            element={<h1 className="text-white bg-red-400">Wheel</h1>}
          />
          {/* <Route path="game/*" element={<Game />} /> */}
          {/* <Route path="/app" element={<Navigate replace to="wheel" />} /> */}
        </Route>
        <Route path="/" element={<Navigate replace to="/app" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default App;
