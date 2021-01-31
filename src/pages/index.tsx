import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/lib/primic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  async function handleSum() {
    const { sum } = (await import('../lib/math')).default;
    alert(sum(2, 3));
  }
  return (
    <div>
      <SEO
        title='DevCommerece, your nbest ecommerce!'
        image='boost.png'
        shouldExcludeTitleSffix
      ></SEO>

      <Title>Home</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  console.log(recommendedProducts);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
