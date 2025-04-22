import { EditProductForm } from './EditProductForm';
import type { Product } from '@/types';

interface ProductAccordionProps {
  product: Product;
  index: number;
  isOpen: boolean;
  isEditing: boolean;
  onProductUpdate: (product: Product) => void;
  onProductEdit: (productId: string) => void;
  onCompleteEdit: (newProduct: Product) => void;
  onToggleButtonClick: (id: string) => void;
}

export const ProductAccordion = ({
  product,
  index,
  isOpen,
  isEditing,
  onProductUpdate,
  onProductEdit,
  onCompleteEdit,
  onToggleButtonClick,
}: ProductAccordionProps) => {
  return (
    <div
      data-testid={`product-${index + 1}`}
      className='bg-white p-4 rounded shadow'
    >
      <button
        data-testid='toggle-button'
        onClick={() => onToggleButtonClick(product.id)}
        className='w-full text-left font-semibold'
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isOpen && (
        <div className='mt-2'>
          {isEditing ? (
            <EditProductForm
              product={product}
              onProductUpdate={onProductUpdate}
              onCompleteEdit={onCompleteEdit}
            />
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div
                  key={index}
                  className='mb-2'
                >
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid='modify-button'
                onClick={() => onProductEdit(product.id)}
                className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2'
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
