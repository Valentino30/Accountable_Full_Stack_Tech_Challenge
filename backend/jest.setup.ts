import dotenv from "dotenv";
import path from "path";

const envFile = path.resolve(process.cwd(), `.env.test`);
dotenv.config({ path: envFile, override: true, quiet: true });
