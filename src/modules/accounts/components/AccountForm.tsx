import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
  Account,
  AccountType,
} from "../types/account";

import { BANKS } from "../constants/banks";

interface AccountFormProps {
  initialAccount?: Account;

  onSubmit: (
    account: Omit<
      Account,
      "id" | "createdAt" | "updatedAt"
    >
  ) => void;

  onCancel?: () => void;
}

export default function AccountForm({
  initialAccount,
  onSubmit,
  onCancel,
}: AccountFormProps) {

  const defaultBank = BANKS[0];

  const [name, setName] = useState("");
  const [type, setType] =
    useState<AccountType>("bank");
  const [initialBalance, setInitialBalance] =
    useState(0);
  const [selectedBankId, setSelectedBankId] =
    useState(defaultBank.id);

  useEffect(() => {

    if (!initialAccount) {
      return;
    }

    setName(initialAccount.name);
    setType(initialAccount.type);
    setInitialBalance(initialAccount.initialBalance);
    setSelectedBankId(
      initialAccount.bankId ?? defaultBank.id
    );

  }, [initialAccount]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    const selectedBank =
      BANKS.find(
        (bank) =>
          bank.id === selectedBankId
      ) ?? defaultBank;

    onSubmit({

      name,

      type,

      currency: "EUR",

      bankId: selectedBank.id,

      initialBalance,

      archived:
        initialAccount?.archived ?? false,

      color: selectedBank.color,

      icon: selectedBank.icon,

      isDefault:
        initialAccount?.isDefault ?? false,

      displayOrder:
        initialAccount?.displayOrder ?? 0,

    });

    if (!initialAccount) {

      setName("");
      setInitialBalance(0);
      setSelectedBankId(defaultBank.id);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-5"
    >

      <input
        className="w-full rounded border border-slate-600 bg-slate-800 p-2"
        placeholder="Nombre de la cuenta"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <select
        className="w-full rounded border border-slate-600 bg-slate-800 p-2"
        value={selectedBankId}
        onChange={(event) =>
          setSelectedBankId(
            event.target.value
          )
        }
      >
        {BANKS.map((bank) => (
          <option
            key={bank.id}
            value={bank.id}
          >
            {bank.name}
          </option>
        ))}
      </select>

      <select
        className="w-full rounded border border-slate-600 bg-slate-800 p-2"
        value={type}
        onChange={(event) =>
          setType(
            event.target.value as AccountType
          )
        }
      >
        <option value="bank">
          Banco
        </option>

        <option value="cash">
          Efectivo
        </option>

        <option value="savings">
          Ahorro
        </option>

        <option value="card">
          Tarjeta
        </option>
      </select>

      <input
        className="w-full rounded border border-slate-600 bg-slate-800 p-2"
        type="number"
        placeholder="Saldo inicial"
        value={initialBalance}
        onChange={(event) =>
          setInitialBalance(
            Number(event.target.value)
          )
        }
      />

      <div className="flex gap-2">

        <button
          type="submit"
          className="flex-1 rounded bg-blue-600 px-4 py-2 text-white"
        >
          {initialAccount
            ? "Guardar cambios"
            : "Crear cuenta"}
        </button>

        {onCancel && (

          <button
            type="button"
            className="rounded bg-slate-700 px-4 py-2"
            onClick={onCancel}
          >
            Cancelar
          </button>

        )}

      </div>

    </form>

  );

}