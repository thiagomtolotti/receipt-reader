export interface Receipt {
  id: string
  date: Date
  store_name: string
  total: number
  items: ReceiptItem[]
}

export interface ReceiptItem {
  name: string
  price: number
  quantity: number
}

export interface CreateReceiptDTO {
  date: string
  store_name: string
  total: number
  items: CreateReceiptItemDTO[]
}

export interface CreateReceiptItemDTO {
  name: string
  price: number
  quantity: number
}

export interface ReceiptDTO {
  id: string
  date: string
  store_name: string
  total: number
  items: ReceiptItemDTO[]
}

export interface ReceiptItemDTO {
  name: string
  price: number
  quantity: number
}
