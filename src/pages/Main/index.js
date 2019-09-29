import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import * as CartActions from 'store/modules/cart/actions';
import { formatPrice } from 'util/format';
import api from 'services/api';
import * as S from './styles';

export default function Main() {
  const [products, setProducts] = useState([]);
  const amounts = useSelector(state =>
    state.cart.reduce((productAmounts, product) => {
      productAmounts[product.id] = product.amount;
      return productAmounts;
    }, {})
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await api.get('products');
      const data = res.data.map(p => ({
        ...p,
        priceFormatted: formatPrice(p.price),
      }));

      setProducts(data);
    })();
  }, []);

  function handleAddProduct(productId) {
    dispatch(CartActions.addToCartRequest(productId));
  }

  return (
    <S.ProductList>
      {products.map(p => (
        <li key={p.id}>
          <img src={p.image} alt="Product" />
          <strong>{p.title}</strong>
          <span>{p.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(p.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" /> {amounts[p.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </S.ProductList>
  );
}
