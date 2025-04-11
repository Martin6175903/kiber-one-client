import { PUBLIC_URL } from '@/src/config/url.config'
import { CalendarCheck, GraduationCap, KeyRound, LogOut, Settings, UserCog, Users } from 'lucide-react'
import AsideNavbarItem from '@/src/components/layouts/admin-layout/aside/navbar/AsideNavbarItem'
import { Button } from '@/src/components/ui/Button'

const navbarInfo = [
  {
    title: 'Настройки города',
    link: PUBLIC_URL.admin('/settings-city'),
    icon: <Settings className={'size-6'}/>
  },
  {
    title: 'Пользователи',
    link: PUBLIC_URL.admin('/users'),
    icon: <GraduationCap className={'size-6'}/>
  },
  {
    title: 'Расписание',
    link: PUBLIC_URL.admin('/schedule'),
    icon: <CalendarCheck className={'size-6'}/>
  },
  {
    title: 'Группы',
    link: PUBLIC_URL.admin('/groups'),
    icon: <Users className={'size-6'}/>
  },
  {
    title: 'Редактирование персональных данных',
    link: PUBLIC_URL.admin('/personal-data'),
    icon: <UserCog className={'size-6'}/>
  },
  {
    title: 'Изменить пароль',
    link: PUBLIC_URL.admin('/reset-password'),
    icon: <KeyRound className={'size-6'}/>
  },
  {
    title: 'Выход из личного кабинета',
    link: PUBLIC_URL.admin('/auth'),
    icon: <LogOut className={'size-6'}/>
  }
]

const AsideNavbar = () => {
  return (
    <div>
      <ul className={'flex flex-col'}>
        {navbarInfo.map(item => (
          <AsideNavbarItem key={item.link} title={item.title} link={item.link} icon={item.icon}/>
        ))}
      </ul>
    </div>
  )
}

export default AsideNavbar