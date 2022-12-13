import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContainerWrapper from "./components/ContainerWrapper";
import Dashboard from "./pages/Dashboard";
import TodoItem from "./pages/TodoItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContainerWrapper>{(loading) => <Dashboard {...loading}/>}</ContainerWrapper>,
  },
  {
    path: "/detail/:item_id",
    element: <ContainerWrapper>{(loading) => <TodoItem {...loading}/>}</ContainerWrapper>,
  },
]);


export default function RouteNavigator () {
  return <RouterProvider router={router} />
}