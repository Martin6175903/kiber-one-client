'use client'
import { IProduct, IProductInput } from '@/src/shared/types/product.types'
import { useCreateProduct } from '@/src/hooks/queries/products/useCreateProduct'
import { useUpdateProduct } from '@/src/hooks/queries/products/useUpdateProduct'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/src/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { Textarea } from '@/src/components/ui/Textarea'
import { useEffect, useState } from 'react'
import ImageUpload from '@/src/components/ui/form-elements/image-upload/ImageUpload'
import { Checkbox } from '@/src/components/ui/Checkbox'

interface ProductFormProps {
  product?: IProduct | null
}

const ProductForm = ({ product }: ProductFormProps ) => {

  const [sizes, setSizes] = useState<any[]>([])

  useEffect(() => {
    if (product && product.size) setSizes(product.size)
  }, [product])

  const { createProduct, isLoadingCreate } = useCreateProduct()
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
      isStock: product.isStock,
      size: undefined
    }) : {
      title: '',
      description: '',
      images: [],
      price: 0,
      isStock: true,
      size: undefined
    }
  })

  const termsCheked = form.watch('isStock')

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
            name={'isStock'}
            render={() => (
              <FormItem>
                <FormControl>
                  <div className={'w-1/5'}>
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox className={'size-6 duration-500'} id="terms" checked={termsCheked} onCheckedChange={(checked) => form.setValue('isStock', !!checked)}/>
                      Товар в наличии
                    </label>
                  </div>
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