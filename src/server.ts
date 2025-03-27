import { CuisineRoute } from "@routes/cuisine.route";
import { App } from "./app";
import { UserRoute } from "./routes/user.route";
import { UploadRoute } from "@routes/upload.route";

const app = new App([new UserRoute(), new CuisineRoute(), new UploadRoute()]);

app.listen();
