import { prisma } from "../../../../database/prismaClient";

import { hash } from "bcrypt";

interface ICreateClient{
    username : string;
    password : string;
}

export class CreateClientUseCase {

  async execute({password, username}: ICreateClient) {
    // Validar se o cliente já existe
    const clientExists = await prisma.clients.findFirst({
        where: {
            username: {
                mode: "insensitive"
            }
        }
    });

    // se existir, retornar erro
    if(clientExists){
        throw new Error("Client already exists");
    }

    // Se não existir, criptografar a senha
    const hashPassword = await hash(password, 10);

    // Criar o cliente
    const client = await prisma.clients.create({
        data: {
            username,
            password: hashPassword
        }
    });

    return client;

  }

}