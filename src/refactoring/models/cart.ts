import { CartItem, Coupon, Product } from '../../types';

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let maxDiscount = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      maxDiscount = Math.max(maxDiscount, discount.rate);
    }
  }
  return maxDiscount;
};

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  const totalPrice = price * quantity;
  const appliedDiscount = getMaxApplicableDiscount(item);

  return totalPrice * (1 - appliedDiscount);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce(
    (acc, { product, quantity }: CartItem) => acc + product.price * quantity,
    0,
  );
  let totalAfterDiscount = cart.reduce(
    (acc, item) => acc + calculateItemTotal(item),
    0,
  );

  if (selectedCoupon) {
    const { discountType, discountValue } = selectedCoupon;
    if (discountType === 'amount') {
      totalAfterDiscount -= discountValue;
    } else {
      totalAfterDiscount -=
        +(1 - (100 - discountValue) / 100).toFixed(2) * totalAfterDiscount;
    }
  }

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount: totalBeforeDiscount - totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return [];
};
