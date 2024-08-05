import logoImg from "../assets/logo.svg";
import { HeaderContainer, CartBtn } from "../styles/components/header";
import Image from "next/image";
import Cart from "@/components/cart";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { CartContext } from "@/contexts/CartContext";
import { useContextSelector } from "use-context-selector";

export function Header() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const totalItems = useContextSelector(CartContext, (ctx) => ctx.totalItems);

  const handleViewCart = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <CartBtn onClick={() => handleViewCart()}>
        <ShoppingBag size={24} />
        {totalItems > 0 && <div>{totalItems}</div>}
      </CartBtn>
      <Cart open={sidebarOpen} toggleCart={handleViewCart} />
    </HeaderContainer>
  );
}
