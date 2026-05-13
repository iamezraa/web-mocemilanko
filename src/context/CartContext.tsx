'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface CartItem {
  productId: string
  productName: string
  flavor: string
  quantity: number
  price: number
  totalPrice: number
}

export interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'totalPrice'>) => void
  removeItem: (productId: string, flavor: string) => void
  updateQuantity: (productId: string, flavor: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback(
    (newItem: Omit<CartItem, 'totalPrice'>) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.productId === newItem.productId && item.flavor === newItem.flavor
        )

        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === newItem.productId && item.flavor === newItem.flavor
              ? {
                  ...item,
                  quantity: item.quantity + newItem.quantity,
                  totalPrice: (item.quantity + newItem.quantity) * item.price,
                }
              : item
          )
        }

        return [
          ...prevItems,
          {
            ...newItem,
            totalPrice: newItem.quantity * newItem.price,
          },
        ]
      })
    },
    []
  )

  const removeItem = useCallback((productId: string, flavor: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.productId === productId && item.flavor === flavor))
    )
  }, [])

  const updateQuantity = useCallback((productId: string, flavor: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, flavor)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.flavor === flavor
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.price,
            }
          : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.totalPrice, 0)
  }, [items])

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = getCartTotal()

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
