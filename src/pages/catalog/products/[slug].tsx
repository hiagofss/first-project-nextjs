import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function Product() {
  const router = useRouter();
  const [isAddToCardModalVisible, setIsAddToCardModalVisible] = useState(false);

  function hadleAddToCart() {
    setIsAddToCardModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={hadleAddToCart}>Add to card</button>

      {isAddToCardModalVisible && <AddToCartModal />}
    </div>
  );
}
