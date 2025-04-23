// src/swaggerDocs.ts
import { OpenAPIV3 } from 'openapi-types';

// Інформація про API
export const swaggerInfo: OpenAPIV3.InfoObject = {
  title: 'API Documentation',
  version: '1.0.0',
  description: 'Документація для API з Auth, Cuisines та Restaurants',
};

// Налаштування серверів
export const swaggerServers: OpenAPIV3.ServerObject[] = [
  {
    url: 'http://localhost:3004/api/v1',
    description: 'Локальний сервер',
  },
];

// Опис ендпоінтів Auth
const authPaths: OpenAPIV3.PathsObject = {
  '/auth/signup': {
    post: {
      tags: ['Auth'],
      summary: 'Створити юзера',
      description: 'Реєстрація нового користувача',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'example@gmail.com' },
                name: { type: 'string', example: 'denys' },
                password: { type: 'string', example: '12345678' },
              },
              required: ['email', 'name', 'password'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Користувача створено успішно',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'User created successfully' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Логін користувача',
      description: 'Аутентифікація користувача',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'example@gmail.com' },
                password: { type: 'string', example: '1234567' },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Успішний логін',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string', example: 'jwt-token' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/auth/users': {
    get: {
      tags: ['Auth'],
      summary: 'Отримати інформацію про користувача',
      description: 'Інформація про користувача',
      responses: {
        '200': {
          description: 'Успішний логін',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: 'denis' },
                  email: { type: 'string', example: 'example@gmail.com' },
                  password: {
                    type: 'string',
                    example: '$2b$10$6ITOp3DZQRecOq.5g4ABNefl..guqFrwiu3Y0jhs84gVmsaoCEZia',
                  },
                  createdAt: { type: 'string', example: '2025-04-19T05:00:32.138Z' },
                  updatedAt: { type: 'string', example: '2025-04-19T05:00:32.138Z' },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Опис ендпоінтів для кухонь
export const cuisinesPaths: OpenAPIV3.PathsObject = {
  '/cuisines': {
    get: {
      tags: ['Cuisines'],
      summary: 'Отримання даних про кухні',
      description: 'Повертає список доступних кухонь',
      responses: {
        '200': {
          description: 'Успішне отримання даних',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Italian' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Опис ендпоінтів для ресторанів
export const restaurantsPaths: OpenAPIV3.PathsObject = {
  '/restaurants/cuisines': {
    get: {
      tags: ['Restaurants'],
      summary: 'Отримати ресторани по кухні та типу доставки',
      description:
        'Отримання ресторанів за заданою кухнею (cuisine) та типом доставки (delivery або pickup)',
      parameters: [
        {
          name: 'cuisine',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: "Тип кухні (наприклад, 'sushi')",
        },
        {
          name: 'type',
          in: 'query',
          required: true,
          schema: { type: 'string', enum: ['delivery', 'pickup'] },
          description: "Тип замовлення: 'delivery' або 'pickup'",
        },
      ],
      responses: {
        '200': {
          description: 'Список ресторанів',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Sushi Bar' },
                    cuisine: { type: 'string', example: 'sushi' },
                    type: { type: 'string', example: 'delivery' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/restaurants/{id}': {
    get: {
      tags: ['Restaurants'],
      summary: 'Отримати ресторан за ID',
      description: 'Повертає детальну інформацію про ресторан за його ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'Ідентифікатор ресторану',
        },
      ],
      responses: {
        '200': {
          description: 'Дані ресторану',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: 'Sushi Bar' },
                  cuisine: { type: 'string', example: 'sushi' },
                  // Можна додати додаткові властивості за потребою
                },
              },
            },
          },
        },
      },
    },
  },
  '/dishes': {
    get: {
      tags: ['Dish'],
      summary: 'Отримати страви по категорії та ресторану',
      description: 'Повертає страви по категорії',
      parameters: [
        {
          name: 'category',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: 'Назва категорії',
        },
        {
          name: 'restaurantId',
          in: 'query',
          required: true,
          schema: { type: 'integer' },
          description: 'Айді ресторану',
        },
      ],
      responses: {
        '200': {
          description: 'Повертає страви відповідної категорії',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  message: { type: 'string', example: 'Dishes by category are retrieved' },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Salmon futomaki' },
                        price: { type: 'number', example: 9.6 },
                        description: {
                          type: 'string',
                          example: 'Salmon, cream cheese, cucumber, avocado',
                        },
                        photo: { type: 'string', example: '/files/salmon-futomaki.jpg' },
                        numberOfOrders: { type: 'integer', example: 0 },
                        categoryId: { type: 'integer', example: 2 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/orders-history': {
    get: {
      tags: ['Orders history'],
      summary: 'Отримати історію замовлень',
      description: 'Повертає історію замовлень',
      parameters: [
        {
          name: 'userId',
          in: 'query',
          required: true,
          schema: { type: 'number' },
          description: 'Айді користувача по якому отримуємо історію замовлень',
        },
      ],
      responses: {
        '200': {
          description: 'Повертає історію замовлень користувача',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  message: { type: 'string', example: 'Dishes by category are retrieved' },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      userId: { type: 'integer', example: 1 },
                      Orders: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', example: 1 },
                            createdAt: { type: 'string', example: 'Salmon futomaki' },
                            orderHistoryId: { type: 'number', example: 1 },
                            Dishes: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer', example: 1 },
                                  name: { type: 'string', example: 'Chicken teriyaki BENTO' },
                                  price: { type: 'integer', example: 13 },
                                  description: {
                                    type: 'string',
                                    example:
                                      '3 Futomaki, 3 California maki, Teriyaki chicken, Yasai sarada - vegetable salad, Onigiri - rice sandwich',
                                  },
                                  photo: {
                                    type: 'string',
                                    example: '/files/chicken-teriyaki-bento.jpg',
                                  },
                                  numberOfOrders: { type: 'number', example: 0 },
                                  categoryId: { type: 'integer', example: 1 },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/order/{userId}': {
    post: {
      tags: ['Order'],
      summary: 'Створити замовлення',
      description: 'Повертає створене замовленя',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                dishes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      name: { type: 'string', example: 'Nanapuki' },
                      price: { type: 'number', example: 15.5 },
                      description: { type: 'string', example: 'nanapouki description' },
                      photo: { type: 'string', example: '/files/nanapuki' },
                      numberOfOrders: { type: 'integer', example: 0 },
                      categoryId: { type: 'integer', example: 1 },
                    },
                  },
                },
              },
              required: ['email', 'name', 'password'],
            },
          },
        },
      },
      parameters: [
        {
          name: 'userId',
          in: 'query',
          required: true,
          schema: { type: 'number' },
          description: 'Айді користувача по якому отримуємо історію замовлень',
        },
      ],
      responses: {
        '200': {
          description: 'Повертає історію замовлень користувача',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  message: { type: 'string', example: 'Dishes by category are retrieved' },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      userId: { type: 'integer', example: 1 },
                      Orders: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', example: 1 },
                            createdAt: { type: 'string', example: 'Salmon futomaki' },
                            orderHistoryId: { type: 'number', example: 1 },
                            Dishes: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer', example: 1 },
                                  name: { type: 'string', example: 'Chicken teriyaki BENTO' },
                                  price: { type: 'integer', example: 13 },
                                  description: {
                                    type: 'string',
                                    example:
                                      '3 Futomaki, 3 California maki, Teriyaki chicken, Yasai sarada - vegetable salad, Onigiri - rice sandwich',
                                  },
                                  photo: {
                                    type: 'string',
                                    example: '/files/chicken-teriyaki-bento.jpg',
                                  },
                                  numberOfOrders: { type: 'number', example: 0 },
                                  categoryId: { type: 'integer', example: 1 },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Об'єднуємо всі шляхи в один об'єкт
export const swaggerPaths: OpenAPIV3.PathsObject = {
  ...authPaths,
  ...cuisinesPaths,
  ...restaurantsPaths,
};

// Головний документ Swagger
export const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: swaggerInfo,
  servers: swaggerServers,
  paths: swaggerPaths,
};
