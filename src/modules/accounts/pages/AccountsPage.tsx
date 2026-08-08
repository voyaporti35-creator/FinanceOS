import { useMemo, useState } from "react";
import {
  CreditCard,
  Landmark,
  Search,
  Wallet,
} from "lucide-react";

import AccountForm from "../components/AccountForm";
import AccountList from "../components/AccountList";
import { useAccounts } from "../hooks/useAccounts";
import { useAccountBalances } from "../hooks/useAccountBalances";

import type {
  Account,
  AccountType,
} from "../types/account";


export default function AccountsPage() {

  const {
    accounts,
    createAccount,
    updateAccount,
    deleteAccount,
    error,
  } = useAccounts();


  const balances =
    useAccountBalances();


  const [showForm, setShowForm] =
    useState(false);

  const [editingAccount, setEditingAccount] =
    useState<Account>();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<AccountType | "all">("all");


  const filteredAccounts = useMemo(() => {

    return accounts.filter((account) => {

      const matchesSearch =
        account.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesFilter =
        filter === "all"
          ? true
          : account.type === filter;


      return (
        matchesSearch &&
        matchesFilter
      );

    });

  }, [
    accounts,
    search,
    filter,
  ]);



  const totalBalance = useMemo(() => {

    return filteredAccounts.reduce(
      (sum, account) =>
        sum + (balances[account.id] ?? 0),
      0
    );

  }, [
    filteredAccounts,
    balances,
  ]);



  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Cuentas
          </h1>

          <p className="text-slate-400">
            Gestiona tus cuentas bancarias
          </p>

        </div>


        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          onClick={() => {

            setEditingAccount(undefined);

            setShowForm(!showForm);

          }}
        >

          {showForm
            ? "Cancelar"
            : "Nueva cuenta"}

        </button>


      </div>



      <div className="grid gap-4 md:grid-cols-3">


        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <Wallet />

            <span>
              Total cuentas
            </span>

          </div>


          <p className="mt-3 text-3xl font-bold">

            {filteredAccounts.length}

          </p>

        </div>




        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <CreditCard />

            <span>
              Saldo total
            </span>

          </div>


          <p className="mt-3 text-3xl font-bold">

            {totalBalance.toLocaleString(
              "es-ES",
              {
                style: "currency",
                currency: "EUR",
              }
            )}

          </p>

        </div>




        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <Landmark />

            <span>
              Bancos
            </span>

          </div>


          <p className="mt-3 text-3xl font-bold">

            {
              new Set(
                filteredAccounts.map(
                  (a) => a.bankId
                )
              ).size
            }

          </p>

        </div>


      </div>




      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">


        <div className="flex flex-col gap-4 md:flex-row">


          <div className="relative flex-1">


            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-500"
            />


            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-3"
              placeholder="Buscar cuenta..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />


          </div>



          <select
            className="rounded-lg border border-slate-700 bg-slate-800 px-3"
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as
                  | AccountType
                  | "all"
              )
            }
          >

            <option value="all">
              Todas
            </option>

            <option value="bank">
              Bancos
            </option>

            <option value="cash">
              Efectivo
            </option>

            <option value="savings">
              Ahorro
            </option>

            <option value="card">
              Tarjetas
            </option>

          </select>


        </div>


      </div>




      {error && (

        <div className="rounded-lg border border-red-500 bg-red-950 p-3 text-red-300">

          {error}

        </div>

      )}






      {showForm && (

        <AccountForm
          initialAccount={editingAccount}
          onCancel={() => {

            setEditingAccount(undefined);

            setShowForm(false);

          }}
          onSubmit={async (account) => {


            if (editingAccount) {

              await updateAccount({
                ...editingAccount,
                ...account,
              });


            } else {

              await createAccount(account);

            }


            setEditingAccount(undefined);

            setShowForm(false);


          }}
        />

      )}






      <AccountList

        accounts={filteredAccounts}

        onEdit={(account) => {

          setEditingAccount(account);

          setShowForm(true);

        }}

        onDelete={deleteAccount}

      />


    </div>

  );

}