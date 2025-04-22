import { EditProductForm } from './EditProductForm';
import { ProductDiscountEditor } from './ProductDiscountEditor';
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
            <ProductDiscountEditor
              product={product}
              onProductEdit={onProductEdit}
            />
          )}
        </div>
      )}
    </div>
  );
};
