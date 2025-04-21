import { CuisineRoute } from '@routes/cuisine.route';
import { App } from './app';
import { UserRoute } from './routes/user.route';
import { UploadRoute } from '@routes/upload.route';
import { RestaurantRoute } from '@routes/restaurant.route';
import { CategoryRoute } from '@routes/dish.route';
import { OderHistoryRoute } from '@routes/order-history.route';
import { OrderRoute } from '@routes/order.route';

const app = new App([
  new UserRoute(),
  new CuisineRoute(),
  new UploadRoute(),
  new RestaurantRoute(),
  new CategoryRoute(),
  new OderHistoryRoute(),
  new OrderRoute(),
]);

app.listen();
