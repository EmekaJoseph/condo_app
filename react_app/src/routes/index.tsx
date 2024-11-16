import { lazy } from "react";

// Lazy load components
const Home = lazy(() => import("../views/Home"));
const About = lazy(() => import("../views/About"));
const NotFound = lazy(() => import("../views/NotFound"));

const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default Routes;
