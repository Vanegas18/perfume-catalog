'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { initialProducts, type Product } from '@/lib/products'

interface StoreContextValue {
  products: Product[]
  isAdmin: boolean
  login: (user: string, pass: string) => boolean
  logout: () => void
  addProduct: (data: Omit<Product, 'id'>) => void
  updateProduct: (id: string, data: Omit<Product, 'id'>) => void
  deleteProduct: (id: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

// Credenciales simuladas (frontend only)
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAdmin, setIsAdmin] = useState(false)

  const login = useCallback((user: string, pass: string) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => setIsAdmin(false), [])

  const addProduct = useCallback((data: Omit<Product, 'id'>) => {
    setProducts((prev) => [
      { ...data, id: `p${Date.now()}` },
      ...prev,
    ])
  }, [])

  const updateProduct = useCallback(
    (id: string, data: Omit<Product, 'id'>) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...data, id } : p)),
      )
    },
    [],
  )

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return (
    <StoreContext.Provider
      value={{
        products,
        isAdmin,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
