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
import { useEffect, useState } from 'react'
import ImageUpload from '@/src/components/ui/form-elements/image-upload/ImageUpload'

interface ProductFormProps {
  product?: IProduct | null
}

const ProductForm = ({ product } :ProductFormProps ) => {

  const [sizes, setSizes] = useState<any[]>([])

  useEffect(() => {
    if (product && product.size) setSizes(product.size)
  }, [product])

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
      size: undefined
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
    data.size = sizes
    if (product) updateProduct(data)
    else createProduct(data)
  }

  return (
  <div className={'container'}>
    <div className={'py-5'}>
      <div className={'flex flex-col gap-3'}>
        <h1 className={'text-2xl font-bold'}>{title}</h1>
        <p className={'text-xl text-gray-600 mb-3'}>{description}</p>
        {product && (
          <div className={'mb-5'}>
            <ConfirmModal handleClick={() => deleteProduct()}>
              <Button
                size={'icon'}
                variant={'default'}
                disabled={isLoadingDelete}
                className={'flex gap-5 w-[200px]'}
              >
                <span>Удаление товара</span>
                <Trash className={'size-4'}/>
              </Button>
            </ConfirmModal>
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-5'}>
          {/*{ Image Upload }*/}
          <FormField
            control={form.control}
            name={'images'}
            rules={{
              required: 'Загрузите хотя бы одно изображение'
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Изображения товара</FormLabel>
                <FormControl>
                  <ImageUpload isDisabled={isLoadingCreate || isLoadingUpdate} onChange={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className={'flex gap-5'}>
            <div className={'w-full'}>
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
            </div>
            <div className={'w-full'}>
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
            </div>
          </div>
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
          <div className={'flex flex-col gap-3'}>
            <div className={'flex flex-col gap-3'}>
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
              <div>
                <Button type={'button'} onClick={() => {
                  const field = form.getValues('size')
                  if (field?.length && !sizes.includes(field)) setSizes([...sizes, form.getValues('size')])
                  form.setValue('size', [])
                }}>Добавить размер</Button>
              </div>
            </div>
            <div className={'flex flex-col gap-2'}>
              <p>
                <span>
                  Текущие размеры:
                  {sizes.length
                    ? sizes.join(', ')
                    : <span className={'text-gray-400'}>Пока что размеры не указаны.</span>}
                </span>
              </p>
              <p><Button type={'button'} onClick={() => setSizes([])}>Удалить текущие размеры</Button></p>
            </div>
          </div>
          <div className={'flex justify-center'}>
            <Button className={'max-w-1/2 w-full'} variant={'default'} disabled={isLoadingUpdate || isLoadingCreate}>{action} товар</Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
 );
};

export default ProductForm;