import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"; 
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}


export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // Receber username e password
                

        // Validar se username é valido
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if (!deliveryman) {
            throw new Error("Deliveryman not found");
        }

        // Validar se password é valido para esse username
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        // Gerar token
        const token = sign({username}, "99990c28d37c8e942347d2502d73f327", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });

        return token;

    }
}