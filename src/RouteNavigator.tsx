import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContainerWrapper from "./components/ContainerWrapper";
import Dashboard from "./pages/Dashboard";
import TodoItem from "./pages/TodoItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContainerWrapper><Dashboard /></ContainerWrapper>,
  },
  {
    path: "/detail/:item_id",
    element: <ContainerWrapper><TodoItem/></ContainerWrapper>,
  },
]);


export default function RouteNavigator () {
  return <RouterProvider router={router} />
}