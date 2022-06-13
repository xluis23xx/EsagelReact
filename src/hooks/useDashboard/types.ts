export type DateBody = {
  startDate: "",
  endDate:""
}

export type DashboardParams = {
  firstMonth: DateBody,
  secondMonth: DateBody,
  thirdMonth: DateBody,
};

export type SaleDashboardResult = {
  totalFirstMonth: number | null,
  totalSecondMonth: number | null,
  totalThirdMonth:  number | null,
  quantityFirstMonth:  number | null,
  quantitySecondMonth: number | null,
  quantityThirdMonth:number | null,
  quantitiesTotal: number | null,
  quantitiesSold: number | null,
  amountTotal: number  | null,
  amountsSold: number | null,
}

export type PurchaseDashboardResult = {
  totalFirstMonth: number | null,
  totalSecondMonth: number | null,
  totalThirdMonth:  number | null,
  quantityFirstMonth:  number | null,
  quantitySecondMonth: number | null,
  quantityThirdMonth:number | null,
  quantitiesTotal: number | null,
  quantitiesPurchased: number | null,
  amountTotal: number | null,
  amountsPurchased: number | null,
}

export type DashboardResult = {
  status: number,
  sales: SaleDashboardResult,
  purchases: PurchaseDashboardResult,
}
