import { OrderList } from 'shared/modules/Order'
import { UserSettings } from './UserSettings'

export const userMenu = [
  {
    title: 'Мои заказы',
    href: '/user/orders',
    Component: OrderList,
  },
  {
    title: 'Настройки',
    href: '/user/settings',
    Component: UserSettings,
  },
]