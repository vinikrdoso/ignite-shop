import Image from "next/image";
import {
  HomeContainer,
  Product,
  NavigationWrapper,
  ArrowLeftContainer,
  ArrowRightContainer,
} from "../styles/pages/home";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "@/contexts/CartContext";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

function ArrowLeft(props: { disabled: boolean; onClick: (e: any) => void }) {
  return (
    <ArrowLeftContainer
      css={{
        display: props.disabled ? "none" : "block",
      }}
    >
      <svg
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
    </ArrowLeftContainer>
  );
}
function ArrowRight(props: { disabled: boolean; onClick: (e: any) => void }) {
  return (
    <ArrowRightContainer
      css={{
        display: props.disabled ? "none" : "block",
      }}
    >
      <svg
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
    </ArrowRightContainer>
  );
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 48,
    },
    slideChanged(slider) {
      const rel = slider.track.details.rel;
      const currentSlide = rel === 0 ? 0 : rel + 2;
      setCurrentSlide(currentSlide);
    },
    created() {
      setLoaded(true);
    },
  });

  const addToCart = useContextSelector(CartContext, ctx => ctx.addToCart)

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <NavigationWrapper className="navigation-wrapper">
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map((product) => {
            const price = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((product.price as number) / 100)
            return (
              <Product className="keen-slider__slide" key={product.id}>
                <Link
                  href={`/product/${product.id}`}
                  
                  prefetch={false}
                >
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                  />
                </Link>
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{price}</span>
                  </div>

                  <button>
                    <ShoppingBag onClick={() => addToCart(product)} />
                  </button>
                </footer>
              </Product>
            );
          })}
        </HomeContainer>
        {loaded && instanceRef.current && (
          <>
            <ArrowLeft
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <ArrowRight
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </NavigationWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  };
};
