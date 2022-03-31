import express, { response } from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));