import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import RoleSelection from "./components/RoleSelection";
import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";

function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "role-selection",
          element: <RoleSelection />,
        },
        {
          path: "user-dashboard",
          element: <UserDashboard />,
        },
        {
          path: "author-dashboard",
          element: <AuthorDashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouterObj} />;
}

export default App;
