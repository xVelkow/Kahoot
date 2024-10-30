import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";

const app: Express = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});