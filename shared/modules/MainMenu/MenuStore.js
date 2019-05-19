import { observable } from 'mobx';

const itemsMock = [
  {
    _id: '1',
    title: 'Главная',
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
    isStatic: false,
  },
  {
    _id: '6',
    title: 'Заказать',
    slug: 'set-order',
  },
  {
    _id: '7',
    title: 'Адрес',
    slug: 'address',
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