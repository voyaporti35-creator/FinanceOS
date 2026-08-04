import { AdvisorPanel } from "../components/AdvisorPanel";
import { CashFlowCard } from "../components/CashFlowCard";
import { FinancialHealthCard } from "../components/FinancialHealthCard";
import { FinancialSummary } from "../components/FinancialSummary";
import { MortgageOverview } from "../components/MortgageOverview";
import { AccountsOverview } from "../components/AccountsOverview";
import { RecentTransactions } from "../components/RecentTransactions";
import { SystemStatus } from "../components/SystemStatus";

import { useDashboard } from "../hooks/useDashboard";


export default function DashboardPage() {


  const {
    viewModel,
    isLoading,
    error,
  } = useDashboard();



  if (error) {

    return (

      <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-red-300">

        {error}

      </div>

    );

  }



  return (

    <div className="space-y-6">


      <FinancialSummary

        data={viewModel}

        isLoading={isLoading}

      />



      <div className="grid gap-6 lg:grid-cols-2">


        <FinancialHealthCard />


        <CashFlowCard

          data={viewModel}

        />


      </div>



      <AdvisorPanel />



      <div className="grid gap-6 lg:grid-cols-2">


        <AccountsOverview

          data={viewModel}

        />


        <MortgageOverview />

        
      </div>



      <RecentTransactions

        data={viewModel}

      />



      <SystemStatus

        data={viewModel}

      />


    </div>

  );

}