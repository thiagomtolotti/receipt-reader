export interface Receipt {
  id: string
  date: Date
  store_name: string
  total: string
  items: ReceiptItem[]
}

export interface ReceiptItem {
  id: string
  name: string
  price: string
  quantity: number
}

export interface CreateReceiptDTO {
  date: string
  store_name: string
  total: number
  items: ReceiptItemDTO[]
}

export interface ReceiptDTO {
  id: string
  date: string
  store_name: string
  total: number
  items: ReceiptItemDTO[]
}

export interface ReceiptItemDTO {
  id: string
  name: string
  price: number
  quantity: number
}
