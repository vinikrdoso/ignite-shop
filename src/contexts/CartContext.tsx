import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import axios from "axios";

interface Product {
  defaultPriceId: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (data: any) => void;
  totalItems: number;
  removeFromCart: (data: any) => void;
  buyItems: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const addToCart = useCallback(async (product: Product) => {
    setTotalItems((state) => state + 1);
    setCart((state) => {
      const existingProduct = state.find((item) => item.id === product.id);
      if (existingProduct) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback(async (product: Product) => {
    setCart((state) => {
      const existingProduct = state.find((item) => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          return state.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return state.filter((item) => item.id !== product.id);
        }
      } else {
        return state;
      }
    });
    setTotalItems((state) => state - 1);
  }, []);

  async function buyItems() {
    try {
      const itemsFormatted = cart.map((product: Product) => {
        return {
          price: product.defaultPriceId,
          quantity: product.quantity,
        };
      });
      const response = await axios.post("/api/checkout", {
        items: itemsFormatted,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        totalItems,
        removeFromCart,
        buyItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
