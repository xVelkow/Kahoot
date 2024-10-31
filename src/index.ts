import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes/index.route";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});