import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./lib/RootLayout";
import Home from "./pages/Home";
import AuthLayout from "./lib/AuthLayout";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { loging } from "./features/auth/authSlice";
import MyList from "./pages/MyList";
import { updateList } from "./features/watchList/listSlice";

function App() {
  const { isLoggedin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const data = localStorage.getItem("user");
  const watchlists = localStorage.getItem("mylist");
  useEffect(() => {
    let userData = data ? JSON.parse(data) : "";
    if (userData) {
      dispatch(loging(userData));
    }
    if (userData && watchlists) {
      let watchList = JSON.parse(watchlists);
      if (watchList[userData.email]) {
        dispatch(updateList(watchList[userData.email]));
      }
    }
  }, [data]);

  const router = createBrowserRouter([
    isLoggedin
      ? {
          path: "/",
          element: <RootLayout />,
          children: [
            { path: "/", element: <Home /> },
            { path: "watchlists", element: <MyList /> },
            {
              path: "*",
              element: <Navigate to="/" replace />,
            },
          ],
        }
      : {
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "*",
              element: <Navigate to="/login" replace />,
            },
          ],
        },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
