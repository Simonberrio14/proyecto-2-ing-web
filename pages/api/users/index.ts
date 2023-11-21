import { User, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

interface Response{
   users?:User[];
   message?: string;
}

const handler = async (req:NextApiRequest, res:NextApiResponse<Response>) => {
    if(req.method ==='GET'){
        const users = await prisma.user.findMany();
        return res.status(200).json({users});
    }

};

export default handler;