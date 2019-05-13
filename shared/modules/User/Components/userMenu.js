import { OrderList, OrderView } from 'shared/modules/Order'
import { UserSettings } from './UserSettings'

export const userMenu = [
  {
    title: 'Мои заказы',
    href: '/user/orders',
    Component: OrderList,
  },
  {
    href: '/user/order',
    Component: OrderView,
  },
  {
    title: 'Настройки',
    href: '/user',
    Component: UserSettings,
  },
]