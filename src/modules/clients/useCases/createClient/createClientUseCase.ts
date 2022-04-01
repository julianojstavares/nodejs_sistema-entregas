import { prisma } from "../../../../database/prismaClient";

import { hash } from "bcrypt";

interface ICreateClient{
    username : string;
    password : string;
}

export class CreateClientUseCase {

  async execute({password, username}: ICreateClient) {

    if(!username) {
        throw new Error("Username is required");
    }

    // Validar se o cliente já existe
    const clientExists = await prisma.clients.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        }
    });

    // se existir, retornar erro
    if(clientExists){
        throw new Error("Client already exists");
    }

    // Se não existir, criptografar a senha
    let hashPassword = ""; 

    if(password) { hashPassword = await hash(password, 10); }
    else { throw new Error("Password not informed"); }

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