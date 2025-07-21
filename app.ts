import * as DatabaseService from "./services/database";

import express, { Request, Response } from "express";
import * as counterRoutes from './routes/counter';
import sequelize from "sequelize";
//import sequelize from "./db/database";
//import Counter from './models/counter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/counter', counterRoutes.router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express + TypeScript!");
});

async function init(): Promise<void> {
    await DatabaseService.init();
    console.log("connected to db")  
}

app.listen(PORT, () => {
    console.log("App is running on port: ", PORT);
});

init();