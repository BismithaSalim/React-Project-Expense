import { lazy } from "react";
import Loadable from "../components/Loadable";

// Front page
const FrontPage = Loadable(lazy(() => import("../pages/front")));

const FrontRoutes = {
  path: "/",
  element: <FrontPage />
};

export default FrontRoutes;