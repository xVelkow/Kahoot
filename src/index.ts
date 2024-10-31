import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes/index.route";

const app: Express = express();

app.use(cors());
app.use(express.json());

// express-session and connect-pg-simple setup
import session from "express-session";
import { Pool } from "pg";
import connectPgSimple from "connect-pg-simple";
const pgSession = connectPgSimple(session);

// creating pg Pool
const pgPool = new Pool({
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
});

// setting up the session middleware
app.use(session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE),
        secure: false,
    },
    store: new pgSession({
        pool: pgPool,
        tableName: "sessions",
    }),
}))

// setup passport and passport strategy
import passport from "passport";
import "./strategies/local.strategy";

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", router);


const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});