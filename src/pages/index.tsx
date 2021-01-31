import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  async function handleSum() {
    const { sum } = (await import('../lib/math')).default;
    alert(sum(2, 3));
  }
  return (
    <div>
      <Title>Home</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
