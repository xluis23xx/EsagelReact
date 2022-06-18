import { GeneralResponse } from "../types";

export type DateBody = {
  startDate: string,
  endDate:string
}

export type DashboardParams = DateBody[];

export type DashboardDataResult = DateBody & {
  totalMonthSold: number
  quantityMonthSold: number
  totalMonthPurchased: number
  quantityMonthPurchased: number
}

export type DashboardResult = GeneralResponse & {
  data: DashboardDataResult[]
  totalSoldSale?: number;
  totalQuantitySales?: number;
  totalPurchased?: number;
  quantityTotalPurchased?: number;

}
