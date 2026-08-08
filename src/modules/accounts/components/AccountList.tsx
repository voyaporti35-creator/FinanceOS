import {
  Pencil,
  Trash2,
  Landmark,
  Building2,
  CreditCard,
  Wallet,
  Globe,
  TrendingUp,
  ChartColumn,
} from "lucide-react";

import { BANKS } from "../constants/banks";
import { useAccountBalances } from "../hooks/useAccountBalances";

import type { Account } from "../types/account";


interface AccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}


function formatAmount(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}


function getBankIcon(icon?: string) {

  switch (icon) {

    case "Building2":
      return <Building2 size={22} />;

    case "CreditCard":
      return <CreditCard size={22} />;

    case "Wallet":
      return <Wallet size={22} />;

    case "Globe":
      return <Globe size={22} />;

    case "TrendingUp":
      return <TrendingUp size={22} />;

    case "ChartColumn":
      return <ChartColumn size={22} />;

    default:
      return <Landmark size={22} />;

  }

}


export default function AccountList({
  accounts,
  onEdit,
  onDelete,
}: AccountListProps) {


  const balances =
    useAccountBalances();


  if (accounts.length === 0) {

    return (
      <div className="rounded-xl border border-slate-700 p-8 text-center text-slate-400">
        No hay cuentas creadas.
      </div>
    );

  }


  return (

    <div className="space-y-4">

      {accounts.map((account) => {


        const bank =
          BANKS.find(
            (b) => b.id === account.bankId
          );


        const currentBalance =
          balances[account.id] ??
          account.initialBalance;


        return (

          <div
            key={account.id}
            className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow transition hover:border-slate-500"
          >

            <div
              className="h-1"
              style={{
                background:
                  bank?.color ?? "#2563eb",
              }}
            />


            <div className="flex items-center justify-between p-5">


              <div className="flex items-center gap-4">


                <div
                  className="rounded-full p-3"
                  style={{
                    backgroundColor:
                      bank?.color ?? "#2563eb",
                    color: "white",
                  }}
                >
                  {getBankIcon(bank?.icon)}
                </div>


                <div>

                  <h3 className="text-lg font-bold">
                    {account.name}
                  </h3>


                  <p className="text-sm text-slate-400">
                    {bank?.name ?? "Sin banco"}
                  </p>


                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {account.type}
                  </p>

                </div>


              </div>


              <div className="text-right">


                <div className="text-2xl font-bold">
                  {formatAmount(
                    currentBalance
                  )}
                </div>


                <div className="mt-4 flex justify-end gap-2">


                  <button
                    type="button"
                    className="rounded-lg border border-slate-600 p-2 hover:bg-slate-800"
                    title="Editar"
                    onClick={() =>
                      onEdit(account)
                    }
                  >
                    <Pencil size={18} />
                  </button>


                  <button
                    type="button"
                    className="rounded-lg border border-red-600 p-2 text-red-500 hover:bg-red-950"
                    title="Eliminar"
                    onClick={() => {

                      if (
                        window.confirm(
                          `¿Eliminar "${account.name}"?`
                        )
                      ) {
                        onDelete(account.id);
                      }

                    }}
                  >
                    <Trash2 size={18} />
                  </button>


                </div>


              </div>


            </div>


          </div>

        );

      })}


    </div>

  );

}