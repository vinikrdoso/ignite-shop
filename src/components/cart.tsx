import Image from "next/image";
import {
  CartContainer,
  ImageContainer,
  ProductContainer,
  ProductInfo,
  ProductsWrapper,
  GeneralInfo,
  Button,
  Quantity,
  Value,
  CloseBtn,
  Header,
  QuantityAndPrice,
} from "../styles/components/cart";
import { XIcon } from "lucide-react";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/contexts/CartContext";

interface CartProps {
  open: boolean;
  toggleCart: () => void;
}

export default function Cart({ open, toggleCart }: CartProps) {
  const cartItems = useContextSelector(CartContext, (context) => {
    return context.cart;
  });

  const totalItems = useContextSelector(CartContext, (context) => {
    return context.totalItems;
  });

  const removeFromCart = useContextSelector(
    CartContext,
    (ctx) => ctx.removeFromCart
  );
  const buyItems = useContextSelector(CartContext, (ctx) => ctx.buyItems);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <CartContainer open={open}>
      <Header>
        <h2>Sacola de compras</h2>

        <CloseBtn type="button" onClick={toggleCart}>
          <XIcon />
        </CloseBtn>
      </Header>

      {cartItems.length > 0 ? (
        <>
          <ProductsWrapper>
            {cartItems.map((product) => (
              <ProductContainer key={product.id}>
                <ImageContainer>
                  <Image
                    src={product.imageUrl}
                    width={100}
                    height={100}
                    alt=""
                  />
                </ImageContainer>

                <ProductInfo>
                  <span>{product.name}</span>
                  <QuantityAndPrice>
                    <strong>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price / 100)}
                    </strong>
                    <span>{product.quantity}</span>
                  </QuantityAndPrice>

                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product)}
                    >
                      Remover
                    </button>
                  </div>
                </ProductInfo>
              </ProductContainer>
            ))}
          </ProductsWrapper>

          <GeneralInfo>
            <Quantity>
              <span>Quantidade</span>
              <strong>{totalItems}</strong>
            </Quantity>

            <Value>
              <span>Valor total</span>
              <strong>{Number(total / 100).toFixed(2)}</strong>
            </Value>
          </GeneralInfo>

          <Button type="button" onClick={() => buyItems()}>
            Finalizar compra
          </Button>
        </>
      ) : (
        <p>Sua sacola está vazia</p>
      )}
    </CartContainer>
  );
}
