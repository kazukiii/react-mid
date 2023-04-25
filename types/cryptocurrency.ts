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
  price: number
  marketCap: number
  image: string
  last_updated: string
}
