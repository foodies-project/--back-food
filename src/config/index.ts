import { config } from "dotenv";

// завантажує змінні з .env
config({ path: ".env" });

export const { PORT } = process.env;
