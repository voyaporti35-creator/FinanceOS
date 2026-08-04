import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import AccountsPage from "../modules/accounts/pages/AccountsPage";
import TransactionsPage from "../modules/transactions/pages/TransactionsPage";
import CategoriesPage from "../modules/categories/pages/CategoriesPage";
import BackupPage from "../modules/backup/pages/BackupPage";
import AssetsPage from "../modules/assets/pages/AssetsPage";
import LiabilitiesPage from "../modules/liabilities/pages/LiabilitiesPage";
import RecurringTransactionsPage from "../modules/recurring/pages/RecurringTransactionsPage";

import MortgageCenter from "../pages/mortgage/MortgageCenter";


export const router = createBrowserRouter([

  {
    path: "/",

    element: <MainLayout />,

    children: [

      {
        index: true,

        element:
          <DashboardPage />,
      },


      {
        path: "accounts",

        element:
          <AccountsPage />,
      },


      {
        path: "transactions",

        element:
          <TransactionsPage />,
      },


      {
        path: "categories",

        element:
          <CategoriesPage />,
      },


      {
        path: "backup",

        element:
          <BackupPage />,
      },


      {
        path: "assets",

        element:
          <AssetsPage />,
      },


      {
        path: "liabilities",

        element:
          <LiabilitiesPage />,
      },


      {
        path: "recurring",

        element:
          <RecurringTransactionsPage />,
      },


      {
        path: "mortgage",

        element:
          <MortgageCenter />,
      },


    ],
  },

]);