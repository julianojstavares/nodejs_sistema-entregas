import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"; 
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}


export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Receber username e password
                

        // Validar se username é valido
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        // Validar se password é valido para esse username
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        // Gerar token
        const token = sign({username}, "23220c28d37c8e942347d2502d73f327", {
            subject: client.id,
            expiresIn: "1d"
        });

        return token;

    }
}