import { Order } from '../types/Order';

export const ordersMock: Order[] = [
  {
    _id: '6372e48cbcd195b0d3d0f7v3',
    table: '2',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1689457645644-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '6372e48cbcd195b0d3d0f7f4'
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1689458835868-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '6372e48cbcd195b0d3d0f7f5'
      }
    ],
  },
  {
    _id: '6372e48cbcd195b0d3d0f7f3',
    table: '4',
    status: 'DONE',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1689457645644-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '6372e48cbcd195b0d3d0f7f4'
      },
      {
        product: {
          name: 'Coca cola',
          imagePath: '1689458835868-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '6372e48cbcd195b0d3d0f7f5'
      }
    ],
  }
];
