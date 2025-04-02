// src/swaggerDocs.ts
import { OpenAPIV3 } from "openapi-types";

// Інформація про API
export const swaggerInfo: OpenAPIV3.InfoObject = {
  title: "API Documentation",
  version: "1.0.0",
  description: "Документація для API з Auth, Cuisines та Restaurants",
};

// Налаштування серверів
export const swaggerServers: OpenAPIV3.ServerObject[] = [
  {
    url: "http://localhost:3004/api/v1",
    description: "Локальний сервер",
  },
];

// Опис ендпоінтів Auth
const authPaths: OpenAPIV3.PathsObject = {
  "/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "Створити юзера",
      description: "Реєстрація нового користувача",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "example@gmail.com" },
                name: { type: "string", example: "denys" },
                password: { type: "string", example: "12345678" },
              },
              required: ["email", "name", "password"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Користувача створено успішно",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "User created successfully" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Логін користувача",
      description: "Аутентифікація користувача",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "example@gmail.com" },
                password: { type: "string", example: "1234567" },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Успішний логін",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: { type: "string", example: "jwt-token" },
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
  "/cuisines": {
    get: {
      tags: ["Cuisines"],
      summary: "Отримання даних про кухні",
      description: "Повертає список доступних кухонь",
      responses: {
        "200": {
          description: "Успішне отримання даних",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Italian" },
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
  "/restaurants/cuisines": {
    get: {
      tags: ["Restaurants"],
      summary: "Отримати ресторани по кухні та типу доставки",
      description:
        "Отримання ресторанів за заданою кухнею (cuisine) та типом доставки (delivery або pickup)",
      parameters: [
        {
          name: "cuisine",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "Тип кухні (наприклад, 'sushi')",
        },
        {
          name: "type",
          in: "query",
          required: true,
          schema: { type: "string", enum: ["delivery", "pickup"] },
          description: "Тип замовлення: 'delivery' або 'pickup'",
        },
      ],
      responses: {
        "200": {
          description: "Список ресторанів",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Sushi Bar" },
                    cuisine: { type: "string", example: "sushi" },
                    type: { type: "string", example: "delivery" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/restaurants/{id}": {
    get: {
      tags: ["Restaurants"],
      summary: "Отримати ресторан за ID",
      description: "Повертає детальну інформацію про ресторан за його ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "Ідентифікатор ресторану",
        },
      ],
      responses: {
        "200": {
          description: "Дані ресторану",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  name: { type: "string", example: "Sushi Bar" },
                  cuisine: { type: "string", example: "sushi" },
                  // Можна додати додаткові властивості за потребою
                },
              },
            },
          },
        },
      },
    },
  },
  "/cart": {
    get: {
      tags: ["Cart"],
      summary: "Отримати дані в корзині",
      description: "Повертає детальну інформацію в корзині",
      responses: {
        "200": {
          description: "Дані корзини",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  Meal: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      name: { type: "string", example: "Salmon Futomaki" },
                      price: { type: "number", example: 8.0 },
                      quantity: { type: "integer", example: 2 },
                      cartId: { type: "integer", example: 1 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Cart"],
      summary: "Додати страви до корзини",
      description: "Додавання страви до коризини",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Dragon Uramaki" },
                price: { type: "number", example: 9.0 },
              },
              required: ["name", "price"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Страва успішно додана до корзини",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  name: { type: "string", example: "Dragon Uramaki" },
                  price: { type: "number", example: 9.0 },
                  quantity: { type: "integer", example: 1 },
                  cartId: { type: "integer", example: 1 },
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
  openapi: "3.0.0",
  info: swaggerInfo,
  servers: swaggerServers,
  paths: swaggerPaths,
};
