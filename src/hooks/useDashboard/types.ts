import { GeneralResponse } from "../types";

export type DateBody = {
  startDate: string,
  endDate:string
}

export type DashboardParams = DateBody[];

// export type DashboardParams = DateBody[]

// export type SaleDashboardResult = {
//   totalFirstMonth: number | null,
//   totalSecondMonth: number | null,
//   totalThirdMonth:  number | null,
//   quantityFirstMonth:  number | null,
//   quantitySecondMonth: number | null,
//   quantityThirdMonth:number | null,
//   quantitiesTotal: number | null,
//   quantitiesSold: number | null,
//   amountTotal: number  | null,
//   amountsSold: number | null,
// }
// const retorno = {
//   data: [{totalMonthSold, quantityMonthSold, totalMonthPurchased, quantityMonthPurchased},{},{},{}],
//   totalSoldSale:number,
//   totalquantitySales: number,
//   totalPurchased: number,
//   quantityTotalPurchased: number
// }

// export type PurchaseDashboardResult = {
//   totalFirstMonth: number | null,
//   totalSecondMonth: number | null,
//   totalThirdMonth:  number | null,
//   quantityFirstMonth:  number | null,
//   quantitySecondMonth: number | null,
//   quantityThirdMonth:number | null,
//   quantitiesTotal: number | null,
//   quantitiesPurchased: number | null,
//   amountTotal: number | null,
//   amountsPurchased: number | null,
// }

// export type DashboardResult = {
//   status: number,
//   sales: SaleDashboardResult,
//   purchases: PurchaseDashboardResult,
// }

export type ObjectResult = {
  totalMonthSold: number
  quantityMonthSold: number
  totalMonthPurchased: number
  quantityMonthPurchased: number
}

export type DashboardResult = GeneralResponse & {
  data: ObjectResult[]
  totalSoldSale?: number;
  totalQuantitySales?: number;
  totalPurchased?: number;
  quantityTotalPurchased?: number;

}
