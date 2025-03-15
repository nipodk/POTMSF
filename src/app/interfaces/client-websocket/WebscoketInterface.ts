export interface OrderTradeUpdate {
  name: string,
  client: string,
  side: string,
  orderType: string,
  orderQuantity: number,
  definedOrderPrice: number,
  actualOrderPrice: number,
  positionCommission: number,
  positionPnl: number,
  isMaker: boolean,
  status: string
}

export interface SpecifiedTradeUpdate {
  key: string,
  orderTradeUpdate: OrderTradeUpdate
}
