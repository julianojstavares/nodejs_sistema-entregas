import { prisma } from "../../../../database/prismaClient";

import { hash } from "bcrypt";

interface ICreateDeliveryman {
    username : string;
    password : string;
}

export class CreateDeliverymanUseCase {

  async execute({password, username}: ICreateDeliveryman) {
    // Validar se o cliente já existe
    const deliverymanExist = await prisma.deliveryman.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        }
    });

    // se existir, retornar erro
    if(deliverymanExist){
        throw new Error("Deliveryman already exists");
    }

    // Se não existir, criptografar a senha
    const hashPassword = await hash(password, 10);

    // Criar o entregador
    const deliveryman = await prisma.deliveryman.create({
        data: {
            username,
            password: hashPassword
        }
    });

    return deliveryman;

  }

}