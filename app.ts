import * as DatabaseService from "./services/database";
import * as footballDataRoutes from './routes/footballData';

import express, { Request, Response } from "express";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    optionsSuccessStatus: 200
}));

app.use('/data', footballDataRoutes.router);

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello from Express + TypeScript!"});
});

async function init(): Promise<void> {
    await DatabaseService.init();
    console.log("connected to db")  
}

app.listen(PORT, () => {
    console.log("App is running on port: ", PORT);
});

init();