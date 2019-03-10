import { observable } from 'mobx';

const mockItem = [
  {
    _id: 'asd',
    title: 'Pages',
    href: '#',
    children: [],
  },
  {
    _id: 'qweqw',
    title: 'Mega menu',
    href: '#',
    children: [],
  },
  {
    _id: 'jkjkjk',
    title: 'Mega menu',
    href: '#',
    children: [],
  },
  {
    _id: 'yytyt',
    title: 'Mega menu',
    href: '#',
    children: [],
  },
  {
    _id: 'aasdasdasd',
    title: 'Mega menu',
    href: '#',
    children: [],
  },
]

const menuItemMock = [
  {
    _id: 'asd',
    title: 'Pages',
    children: mockItem,
  },
  {
    _id: 'qweqw',
    title: 'Mega menu',
    children: mockItem,
  },
  {
    _id: 'jkjkjk',
    title: 'Mega menu',
    children: mockItem,
  },
  {
    _id: 'yytyt',
    title: 'Mega menu',
    children: mockItem,
  },
  {
    _id: 'aasdasdasd',
    title: 'Mega menu',
    children: mockItem,
  },
  {
    _id: 'ffgfgf',
    title: 'Mega menu',
    children: mockItem,
  },
  {
    _id: '323123',
    title: 'Mega menu',
    children: mockItem,
  },
];

const priceMenuItemMock = [
  {
    _id: 'asd',
    title: 'Mega menu Price',
    children: mockItem,
  },
  {
    _id: 'qweqw',
    title: 'Mega menu Price',
    children: mockItem,
  },
  {
    _id: 'jkjkjk',
    title: 'Mega menu Price',
    children: mockItem,
  },
  {
    _id: 'yytyt',
    title: 'Mega menu Price',
    children: mockItem,
  },
  {
    _id: 'aasdasdasd',
    title: 'Mega menu Price',
    children: mockItem,
  },
  {
    _id: 'ffgfgf',
    title: 'Mega menu',
    children: mockItem,
  },
  {
    _id: '323123',
    title: 'Mega menu Price',
    children: mockItem,
  },
];

const itemsMock = [
  {
    _id: '1',
    title: 'Главная',
    // href: '/',
    slug: '',
  },
  {
    _id: '2',
    title: 'О нас',
    // href: '/static/about',
    slug: 'static/about',
  },
  {
    _id: '3',
    title: 'Как заказать',
    // href: '/static/how-to-order',
    slug: 'static/how-to-order',
  },
  {
    _id: '4',
    title: 'Цены',
    slug: 'prices',
    submenu: priceMenuItemMock,
  },
  {
    _id: '5',
    title: 'Услуги',
    slug: 'static/service',
    submenu: menuItemMock,
  },
  {
    _id: '6',
    title: 'Заказать',
    slug: 'set-order',
    // href: '/set-order',
  },
]

export class MenuStore {
  @observable.ref menuList = []

  constructor(data = {}) {
    Object.assign(this, data);
  }

  getList = async () => {

    const items = await itemsMock;

    this.menuList = this.prepareMenuItems(items);
  }

  prepareMenuItems = (items) => {
    return items.map(item => ({ ...item, href: `/${item.slug}` }))
  }

  setLocation = () => {
    const { history: { location: { pathname } } } = this.rootStore;

    return this.menuList.find(item => item.href === pathname)
  }
}