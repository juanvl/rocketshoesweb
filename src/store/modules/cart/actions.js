export const addToCartRequest = productId => ({
  type: '@cart/ADD_REQUEST',
  productId,
});

export const addToCartSuccess = product => ({
  type: '@cart/ADD_SUCCESS',
  product,
});

export const removeFromCart = productId => ({
  type: '@cart/REMOVE',
  productId,
});

export const updateAmountRequest = (productId, amount) => ({
  type: '@cart/UPDATE_AMOUNT_REQUEST',
  productId,
  amount,
});

export const updateAmountSuccess = (productId, amount) => ({
  type: '@cart/UPDATE_AMOUNT_SUCCESS',
  productId,
  amount,
});
