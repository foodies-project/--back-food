import { CuisineRoute } from "@routes/cuisine.route";
import { App } from "./app";
import { UserRoute } from "./routes/user.route";
import { UploadRoute } from "@routes/upload.route";
import { RestaurantRoute } from "@routes/restaurant.route";
import { CartRoute } from "@routes/cart.route";

const app = new App([
  new UserRoute(),
  new CuisineRoute(),
  new UploadRoute(),
  new RestaurantRoute(),
  new CartRoute(),
]);

app.listen();
