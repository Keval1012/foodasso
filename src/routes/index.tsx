// import React, { useCallback } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { NavItem, navConfig } from "./navData";
// import Layout from "../component/layout/Layout";

// const unAuthRoute = ["/login", "/signup", "/login/passcode"];

// const CustomRoutes: React.FC = () => {
//   const isLogin: string | null = localStorage.getItem("isLogin");

//   const switchLoginRoutes = useCallback(() => {
//     if (isLogin && unAuthRoute.includes(window.location.pathname)) {
//       return <Navigate to="/" />;
//     }
//   }, [isLogin]);

//   const switchPrivateRoutes = useCallback(
//     (routes: NavItem[]) => {
//       if (isLogin) {
//         return (
//           <Layout>
//             <Routes>
//               {routes?.map((route, key) =>
//                 route.subNav ? (
//                   route.subNav.map((subRoute, subKey) => (
//                     <Route
//                       key={${key}-${subKey}}
//                       path={subRoute.path}
//                       element={subRoute.component}
//                     />
//                   ))
//                 ) : (
//                   <Route
//                     key={key}
//                     path={route.path}
//                     element={route.component}
//                   />
//                 )
//               )}
//             </Routes>
//           </Layout>
//         );
//       } else if (!isLogin) {
//         return <Navigate to="/login/passcode" />;
//       }
//     },
//     [isLogin]
//   );

//   const switchRoutes = useCallback((routes: NavItem[]) => {
//     return routes?.map((route, key) => (
//       <Route key={key} path={route.path} element={route.component} />
//     ));
//   }, []);

//   return (
//     <Router>
//       <Routes>{switchRoutes(navConfig["common"])}</Routes>
//       {/ {switchPrivateRoutes(navConfig["all_outlet"])} /}
//       {switchPrivateRoutes(navConfig["seven_foodies"])}
//       {switchLoginRoutes()}
//     </Router>
//   );
// };

// export default CustomRoutes;

import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NavItem, navConfig } from "./navData";
import Layout from "../component/layout/Layout";

const unAuthRoutePaths = [
  "/sync",
  "/sync/billing_setup",
  "/sync/billing_setup/configure_system",
  "/login",
  // "/login/passcode",
];

const CustomRoutes: React.FC = () => {
  // const isLogin: string | null = localStorage.getItem("isLogin");

  const unAuthRoute = ["/login", "/logout"];

  const accessToken: string | null = localStorage.getItem("access_token");

  const switchLoginRoutes = useCallback(() => {
    if (accessToken && unAuthRoute.includes(window.location.pathname)) {
      return <Navigate to="/" />;
    }
  }, [accessToken]);

  // Function to render unauthenticated routes
  const renderUnauthRoutes = useCallback(
    () => (
      <Routes>
        {navConfig["common"]?.map((route, key) => (
          <Route key={key} path={route.path} element={route.component} />
        ))}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    ),
    []
  );

  // Function to render authenticated routes
  const renderAuthRoutes = useCallback(
    () => (
      <Layout>
        <Routes>
          {navConfig["seven_foodies"]?.map((route, key) =>
            route.subNav ? (
              route.subNav.map((subRoute, subKey) => (
                <Route
                  key={`${key}-${subKey}`}
                  path={subRoute.path}
                  element={subRoute.component}
                />
              ))
            ) : (
              <Route key={key} path={route.path} element={route.component} />
            )
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {switchLoginRoutes()}
      </Layout>
    ),
    []
  );

  // Determine which routes to render based on authentication status
  const renderRoutes = () => {
    // if (isLogin) {
    if (accessToken) {
      return renderAuthRoutes();
    } else {
      return renderUnauthRoutes();
    }
  };

  return <Router>{renderRoutes()}</Router>;
};

export default CustomRoutes;
