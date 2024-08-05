import Link from "next/link";
import {
  ImageContainer,
  SuccessContainer,
  ProductsWrapper,
} from "../styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Head from "next/head";

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
    id: string;
  }[];
  quantity: number;
}

export default function Success({ costumerName, products, quantity }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ProductsWrapper>
          {products?.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ProductsWrapper>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
          <strong>{quantity > 1 ? `${quantity} camisetas` : `${quantity} camiseta`}</strong> já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session.customer_details?.name;
  
  const quantity = session.line_items?.data.reduce((acc, item) => {
    return acc + (item?.quantity || 0);
  }, 0);

  const products = session.line_items?.data.map((item) => {
    const product = item?.price?.product as Stripe.Product;

    return {
      name: product?.name,
      imageUrl: product?.images[0],
    };
  });

  return {
    props: {
      costumerName,
      quantity,
      products,
    },
  };
};
