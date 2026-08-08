export interface BankOption {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const BANKS: BankOption[] = [
  {
    id: "bbva",
    name: "BBVA",
    color: "#004481",
    icon: "Landmark",
  },
  {
    id: "santander",
    name: "Santander",
    color: "#EC0000",
    icon: "Landmark",
  },
  {
    id: "caixabank",
    name: "CaixaBank",
    color: "#0079C1",
    icon: "Landmark",
  },
  {
    id: "sabadell",
    name: "Banco Sabadell",
    color: "#003A70",
    icon: "Landmark",
  },
  {
    id: "bankinter",
    name: "Bankinter",
    color: "#F58220",
    icon: "Landmark",
  },
  {
    id: "abanca",
    name: "ABANCA",
    color: "#003B70",
    icon: "Landmark",
  },
  {
    id: "ing",
    name: "ING",
    color: "#FF6200",
    icon: "Landmark",
  },
  {
    id: "openbank",
    name: "Openbank",
    color: "#E60000",
    icon: "Landmark",
  },
  {
    id: "myinvestor",
    name: "MyInvestor",
    color: "#00A86B",
    icon: "TrendingUp",
  },
  {
    id: "traderepublic",
    name: "Trade Republic",
    color: "#0F8B6D",
    icon: "ChartColumn",
  },
  {
    id: "revolut",
    name: "Revolut",
    color: "#000000",
    icon: "CreditCard",
  },
  {
    id: "n26",
    name: "N26",
    color: "#36A18B",
    icon: "CreditCard",
  },
  {
    id: "wise",
    name: "Wise",
    color: "#00B9FF",
    icon: "Globe",
  },
  {
    id: "cash",
    name: "Efectivo",
    color: "#16A34A",
    icon: "Wallet",
  },
  {
    id: "other",
    name: "Otro",
    color: "#6B7280",
    icon: "Building2",
  },
];