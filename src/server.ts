import { CuisineRoute } from "@routes/cuisine.route";
import { App } from "./app";
import { UserRoute } from "./routes/user.route";

const app = new App([new UserRoute(), new CuisineRoute()]);

app.listen();
