import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from 'services/api';
import history from 'services/history';
import { formatPrice } from 'util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ productId }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === productId)
  );

  const stock = yield call(api.get, `/stock/${productId}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Não temos estoque suficiente! :(');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(productId, amount));
  } else {
    const res = yield call(api.get, `/products/${productId}`);

    const data = {
      ...res.data,
      amount: 1,
      priceFormatted: formatPrice(res.data.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ productId, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${productId}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Não temos estoque suficiente! :(');
    return;
  }

  yield put(updateAmountSuccess(productId, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
