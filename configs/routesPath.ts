export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADD_ORDER: '/add-order'
}

export const menu = {
  [ROUTES.HOME]: {
    id: 1,
    title: 'Все заказы',
    to: ROUTES.HOME
  },
  [ROUTES.ADD_ORDER]: {
    id: 2,
    title: 'Добавить заказ',
    to: ROUTES.ADD_ORDER
  }
}
