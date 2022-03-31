import express, { response } from 'express';
import "express-async-errors";
import { routes } from './routes';

// A ordem de execução é de cima para baixo. A ordem aqui é importante

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(routes);

app.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    if(err instanceof Error) {
        response.status(400).json({
            message: err.message
        });
    }

    return response.status(500).json({
        message: 'Internal server error'
    });

});

app.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));