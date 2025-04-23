import { useState } from 'react';
import { validateFields } from '@/refactoring/utils';
import type { Product } from '@/types';

interface NewProductFormProps {
  onAddNewProduct: (newProduct: Product) => void;
}

const initialProduct = {
  name: '',
  price: 0,
  stock: 0,
};

export const NewProductForm = ({ onAddNewProduct }: NewProductFormProps) => {
  const [newProduct, setNewProduct] =
    useState<Omit<Product, 'id' | 'discounts'>>(initialProduct);

  const handleAddNewProduct = (
    newProduct: Omit<Product, 'id' | 'discounts'>,
  ) => {
    if (
      validateFields<Omit<Product, 'id' | 'discounts'>>(
        newProduct,
        '새 상품 정보를 입력해주세요.',
      )
    )
      return;

    const productWithIdAndDiscounts = {
      ...newProduct,
      id: Date.now().toString(),
      discounts: [],
    };

    onAddNewProduct(productWithIdAndDiscounts);
    setNewProduct(initialProduct);
  };

  return (
    <div className='bg-white p-4 rounded shadow mb-4'>
      <h3 className='text-xl font-semibold mb-2'>새 상품 추가</h3>
      <div className='mb-2'>
        <label
          htmlFor='productName'
          className='block text-sm font-medium text-gray-700'
        >
          상품명
        </label>
        <input
          id='productName'
          type='text'
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-2'>
        <label
          htmlFor='productPrice'
          className='block text-sm font-medium text-gray-700'
        >
          가격
        </label>
        <input
          id='productPrice'
          type='number'
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: parseInt(e.target.value),
            })
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-2'>
        <label
          htmlFor='productStock'
          className='block text-sm font-medium text-gray-700'
        >
          재고
        </label>
        <input
          id='productStock'
          type='number'
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              stock: parseInt(e.target.value),
            })
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <button
        onClick={() => {
          handleAddNewProduct(newProduct);
        }}
        className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
      >
        추가
      </button>
    </div>
  );
};
