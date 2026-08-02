import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import AccountsPage from "../modules/accounts/pages/AccountsPage";
import TransactionsPage from "../modules/transactions/pages/TransactionsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "accounts",
        element: <AccountsPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);