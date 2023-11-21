import { Role, PrismaClient} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Response {
    roles?: Role[];
    message?: string;
}

const handler = async (req: NextApiRequest, res:NextApiResponse<Response>)=> {
    if(req.method === 'GET'){
        const roles = await prisma.role.findMany();
        return res.status(200).json({roles});
    }
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;