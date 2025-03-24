import { config } from "dotenv";

// завантажує змінні з .env
config({ path: ".env" });

export const { PORT, NODE_ENV } = process.env;
