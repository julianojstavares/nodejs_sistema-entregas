import express, { response } from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));