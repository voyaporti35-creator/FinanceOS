# FinanceOS Architecture

## Visión

FinanceOS es una aplicación Local First para gestionar el patrimonio personal.

El objetivo es controlar cada euro desde un único origen de datos.

No se utilizarán datos duplicados.

No se almacenarán valores calculados.

Todo será reproducible a partir de los movimientos.

---

## Principios

- Single Source of Truth.
- Clean Architecture.
- Modular Design.
- Componentes reutilizables.
- TypeScript estricto.
- Local First.
- Offline First.
- Todo cambio debe compilar con npm run build.

---

## Arquitectura

src/

app/

components/

modules/

db/

stores/

services/

utils/

styles/

---

## Estructura de un módulo

components/

hooks/

pages/

services/

store/

types/

utils/

---

## Núcleo financiero

El Ledger será el centro del sistema.

Todas las operaciones financieras serán transacciones.

Nunca almacenar:

- saldo
- patrimonio
- liquidez
- ahorro mensual

Todos estos valores deberán calcularse dinámicamente.

---

## Roadmap

Fase 1

- Ledger
- Transactions
- Accounts
- Categories
- Budgets

Fase 2

- Assets
- Mortgage
- Investments
- Net Worth

Fase 3

- Reports
- AI
- Forecast
- Goals

---

## Convenciones

Usar Conventional Commits.

Cada commit debe:

- compilar
- mantener compatibilidad
- evitar código duplicado
- incluir tipado estricto
