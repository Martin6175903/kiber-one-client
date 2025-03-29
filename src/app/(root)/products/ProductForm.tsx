'use client'

import { IProduct, IProductInput } from '@/src/shared/types/product.types'
import { useCreateProduct } from '@/src/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/src/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/src/hooks/queries/products/useUpdateProduct'
import { SubmitHandler, useForm } from 'react-hook-form'
import ConfirmModal from '@/src/components/ui/ConfirmModal'
import { Button } from '@/src/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Textarea } from '@/src/components/ui/Textarea'

interface ProductFormProps {
  product: IProduct | null
}

const ProductForm = ({ product } :ProductFormProps ) => {
  const { createProduct, isLoadingCreate } = useCreateProduct()
  const { deleteProduct, isLoadingDelete } = useDeleteProduct()
  const { updateProduct, isLoadingUpdate } = useUpdateProduct()

  const title = product ? 'Изменить данные' : 'Создать товар'
  const description = product
    ? 'Изменить данные о товаре'
    : 'Добавить новый товар в магазин'
  const action = product ? 'Сохранить' : 'Создать'

  const form = useForm<IProductInput>({
    mode: 'onChange',
    values:  product ? ({
      title: product.title,
      description: product.description,
      images: product.images,
      price: product.price,
      size: product.size
    }) : {
      title: '',
      description: '',
      images: [],
      price: 0,
      size: undefined
    }
  })

  const onSubmit:SubmitHandler<IProductInput> = data => {
    data.price = Number(data.price)
    if (product) updateProduct(data)
    else createProduct(data)
  }

  return (
  <div className={'container'}>
    <div className={'flex flex-col gap-3'}>
      <h1 className={'text-2xl font-bold'}>{title}</h1>
      <p className={'text-xl text-gray-600'}>{description}</p>
      {product && (
        <ConfirmModal handleClick={() => deleteProduct()}>
          <Button
            size={'icon'}
            variant={'default'}
            disabled={isLoadingDelete}
          >
            <Trash className={'size-4'}/>
          </Button>
        </ConfirmModal>
      )}
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/*{ Image Upload }*/}
        <FormField
          control={form.control}
          name={'title'}
          rules={{
            required: 'Название обязательно'
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder={'Название товара'} disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'description'}
          rules={{
            required: 'Описание обязательно'
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder={'Описание товара'} disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'price'}
          rules={{
            required: 'Цена обязательна'
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input placeholder={'Цена товара'} disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'size'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Размер</FormLabel>
              <FormControl>
                <Input placeholder={'Размер товара'} disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button variant={'default'} disabled={isLoadingUpdate || isLoadingCreate}>{action}</Button>
      </form>
    </Form>
  </div>
 );
};

export default ProductForm;