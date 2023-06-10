import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectRouter from "./router/ProtectRouter";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "./router/router";

function App() {
  // const dispatch = useDispatch();
  // useLayoutEffect(() => {
  //   if (localStorage.getItem(TOKEN_USER)) {
  //     dispatch(fetchUser());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          {PUBLIC_ROUTER.map((publicRouter, index) => {
            const Comp = publicRouter.component;
            return (
              <Route
                key={index}
                path={publicRouter.path}
                element={<Comp />}
              ></Route>
            );
          })}

          {PRIVATE_ROUTER.map((privateRouter, index) => {
            const Comp = privateRouter.component;
            return (
              <Route
                key={index}
                path={privateRouter.path}
                element={
                  <ProtectRouter>
                    <Comp />
                  </ProtectRouter>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
