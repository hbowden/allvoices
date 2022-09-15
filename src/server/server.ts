import express, {Request, Response} from 'express';

const port = "9990";
const app = express();

app.post("/v1/upload", (req: Request, res: Response) => {
    // tslint:disable-next-line:no-console
    console.log('API');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${port}`);
});