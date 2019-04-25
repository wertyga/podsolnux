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
    slug: 'about',
    isStatic: false,
  },
  {
    _id: '3',
    title: 'Как заказать',
    slug: 'how-to-order',
    isStatic: false,
  },
  {
    _id: '4',
    title: 'Цены',
    slug: 'prices',
  },
  {
    _id: '5',
    title: 'Услуги',
    slug: 'service',
    submenu: menuItemMock,
    isStatic: false,
  },
  {
    _id: '6',
    title: 'Заказать',
    slug: 'set-order',
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
    return items.map(item => ({ ...item, href: item.isStatic ? `/static/${item.slug}` : `/${item.slug}` }))
  }

  setLocation = () => {
    const { history: { location: { pathname } } } = this.rootStore;

    return this.menuList.find(item => item.href === pathname)
  }
}