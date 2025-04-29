'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/src/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form-elements/Form'
import { Input } from '@/src/components/ui/form-elements/Input'
import { EnumGroupCategory, IGroup, IGroupInput } from '@/src/shared/types/group.types'
import { useCreateGroup } from '@/src/hooks/queries/group/useCreateGroup'
import { useUpdateGroup } from '@/src/hooks/queries/group/useUpdateGroup'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/src/components/ui/Select'
import toast from 'react-hot-toast'
import { useGetUsers } from '@/src/hooks/queries/user/useGetUsers'

interface GroupFormProps {
  group?: IGroup | null
}

const ProductForm = ({ group } :GroupFormProps ) => {

  const { createGroup, isLoadingCreateGroup } = useCreateGroup()
  const { updateGroup, isPendingGroup } = useUpdateGroup(group?.id!)
  const { users, isLoadingUsers } = useGetUsers()

  const title = group ? 'Изменение группы' : 'Создание группы'
  const description = group
    ? 'Изменить данные о группе'
    : 'Создать новую группу'
  const action = group ? 'Сохранить' : 'Создать'

  const form = useForm<IGroupInput>({
    mode: 'onChange',
    values:  group ? ({
      title: group.title,
      ageCategory: group.ageCategory,
      yearOfGroup: group.yearOfGroup,
      dayOfStudy: group.dayOfStudy,
      startTimeLearning: group.startTimeLearning,
      endTimeLearning: group.endTimeLearning,
      assistant: group.assistant
    }) : {
      title: "",
      ageCategory: "" as EnumGroupCategory,
      yearOfGroup: 1,
      dayOfStudy: "",
      startTimeLearning: "",
      endTimeLearning: "",
      assistant: "",
      membersCount: 0
    }
  })

  const onSubmit:SubmitHandler<IGroupInput> = data => {
    if (!(new Date(`1970-01-01T${data.endTimeLearning}`) > new Date(`1970-01-01T${data.startTimeLearning}`))) {
      toast.error('Указан неверный интервал занятия!')
      return false
    }
    data.yearOfGroup = Number(data.yearOfGroup)

    if (group) updateGroup(data)
    else createGroup(data)
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
          <FormField
            control={form.control}
            name={'title'}
            rules={{
              required: 'Название группы обязательно'
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название группы</FormLabel>
                <FormControl>
                  <Input placeholder={'Название группы'} disabled={isLoadingCreateGroup || isPendingGroup} {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className={'grid gap-5 grid-cols-2'}>
            <div className={'w-full'}>
              <FormField
                control={form.control}
                name={'ageCategory'}
                rules={{
                  required: 'Возрастная категория обязательна'
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Возрастная категория</FormLabel>
                    <FormControl>
                      <Select disabled={isPendingGroup || isLoadingCreateGroup} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={'w-full'}>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Категория</SelectLabel>
                            <SelectItem value="YOUNGER">Младшие</SelectItem>
                            <SelectItem value="MEDIUM">Средние</SelectItem>
                            <SelectItem value="ADULTS">Старшие</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className={'w-full'}>
              <FormField
                control={form.control}
                name={'yearOfGroup'}
                rules={{
                  required: 'Год обучения обязателен'
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Год обучения</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} disabled={isPendingGroup || isLoadingCreateGroup} value={String(field.value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите год обучения" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Год обучения</SelectLabel>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className={'grid gap-5 grid-cols-2'}>
            <FormField
              control={form.control}
              name={'dayOfStudy'}
              rules={{
                required: 'День занятия обязателен'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>День занятия</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} disabled={isPendingGroup || isLoadingCreateGroup} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите день занятия" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>День</SelectLabel>
                          <SelectItem value="1">Понедельник</SelectItem>
                          <SelectItem value="2">Вторник</SelectItem>
                          <SelectItem value="3">Среда</SelectItem>
                          <SelectItem value="4">Четверг</SelectItem>
                          <SelectItem value="5">Пятница</SelectItem>
                          <SelectItem value="6">Суббота</SelectItem>
                          <SelectItem value="7">Воскресенье</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'assistant'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Преподаватель занятия</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} disabled={isPendingGroup || isLoadingCreateGroup} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите преподавателя" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Преподаватели</SelectLabel>
                          {!isLoadingUsers && users!.filter(user => user.role === "MODERATOR").map(user => (
                            <SelectItem value={user.firstName + ' ' + user.lastName}>{user.firstName} {user.lastName}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            {/* Поле для времени начала */}
            <FormField
              control={form.control}
              name="startTimeLearning"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Время начала</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Поле для времени окончания */}
            <FormField
              control={form.control}
              name="endTimeLearning"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Время окончания</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={'flex justify-center'}>
            <Button className={'max-w-1/2 w-full'} variant={'default'} disabled={isLoadingCreateGroup || isPendingGroup}>{action} группу</Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
 );
};

export default ProductForm;