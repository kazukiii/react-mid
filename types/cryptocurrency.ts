export type Order = 'asc' | 'desc'

export interface HeadCell {
  name: string
  order: Order
  setter: (order: Order) => void
}

export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  current_price: number
  market_cap: number
  image: string
  last_updated: string
}
