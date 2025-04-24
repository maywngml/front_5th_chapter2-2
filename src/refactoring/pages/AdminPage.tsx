import { useState } from 'react';
import { CouponList, NewCouponForm } from '@/refactoring/components/coupon';
import { Button } from '../components/ui';
import {
  NewProductForm,
  ProductAccordion,
} from '@/refactoring/components/product';
import { Coupon, Product } from '../../types.ts';

interface AdminPageProps {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: AdminPageProps) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProductId, setEditingProductId] = useState<string>('');
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const changeShowNewProductForm = () => {
    setShowNewProductForm((prevShowNewProductForm) => !prevShowNewProductForm);
  };

  const handleEditComplete = (newProduct: Product) => {
    onProductUpdate(newProduct);
    setEditingProductId('');
  };

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
  };

  const handleAddNewProduct = (newProduct: Product) => {
    onProductAdd(newProduct);
    changeShowNewProductForm();
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>관리자 페이지</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>상품 관리</h2>
          <Button
            className='px-4 py-2 mb-4'
            variant='solid'
            color='green'
            onClick={changeShowNewProductForm}
          >
            {showNewProductForm ? '취소' : '새 상품 추가'}
          </Button>
          {showNewProductForm && (
            <NewProductForm onAddNewProduct={handleAddNewProduct} />
          )}
          <div className='space-y-2'>
            {products.map((product, index) => (
              <ProductAccordion
                key={`product-${product.id}-accordion`}
                product={product}
                index={index}
                isOpen={openProductIds.has(product.id)}
                isEditing={editingProductId === product.id}
                onProductEdit={handleEditProduct}
                onCompleteEdit={handleEditComplete}
                onProductUpdate={onProductUpdate}
                onToggleButtonClick={toggleProductAccordion}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>쿠폰 관리</h2>
          <div className='bg-white p-4 rounded shadow'>
            <NewCouponForm onCouponAdd={onCouponAdd} />
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
