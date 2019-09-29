import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from 'util/format';
import * as CartActions from 'store/modules/cart/actions';
import * as S from './styles';

export default function Cart() {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (productsTotalPrice, product) =>
          productsTotalPrice + product.price * product.amount,
        0
      )
    )
  );
  const dispatch = useDispatch();

  const incrementAmount = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  };

  const decrementAmount = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  };

  const handleRemoveFromCart = productId => {
    dispatch(CartActions.removeFromCart(productId));
  };

  return (
    <S.Container>
      <S.ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(p => (
            <tr>
              <td>
                <img src={p.image} alt={p.title} />
              </td>
              <td>
                <strong>{p.title}</strong>
                <span>{p.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrementAmount(p)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={p.amount} />
                  <button type="button" onClick={() => incrementAmount(p)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{p.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(p.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </S.ProductTable>

      <footer>
        <button type="submit">Finalizar pedido</button>

        <S.Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </S.Total>
      </footer>
    </S.Container>
  );
}
