import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";

import { automationService } from "./core/finance/services/automationService";

export default function App() {

  useEffect(() => {

    void automationService.execute();

  }, []);

  return (
    <RouterProvider router={router} />
  );

}