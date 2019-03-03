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

const itemsMock = [
  {
    _id: '1',
    title: 'Главная',
    href: '/',
  },
  {
    _id: '2',
    title: 'О нас',
    href: '/static/about',
  },
  {
    _id: '3',
    title: 'Как заказать',
    href: '/static/how-to-order',
  },
  {
    _id: '4',
    title: 'Цены',
    submenu: menuItemMock,
  },
  {
    _id: '5',
    title: 'Услуги',
    submenu: menuItemMock,
  },
  {
    _id: '6',
    title: 'Заказать',
    href: '/set-order',
  },
]

export class MenuStore {
  @observable.ref menuList = []

  constructor(data = {}) {
    Object.assign(this, data);
  }

  register() {
    this.getList();
  }

  getList = async () => {
    this.menuList = itemsMock;
  }

  setLocation = () => {
    const { history: { location: { pathname } } } = this.rootStore;

    return this.menuList.find(item => item.href === pathname)
  }
}