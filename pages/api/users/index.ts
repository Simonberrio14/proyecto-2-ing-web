import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient()

type ResponseData = {
  users?: User[];
  user?: User;
  newUser?: User;
  message?: String;
}

const usersApi = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {

    if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      return res.status(200).json({ users });
    }

    if (req.method === 'POST') {
      const { email, name, roleId } = req.body;

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          roleId
        }
      });

      return res.status(201).json({ newUser });
    }

    if (req.method === 'PUT') {
      const userId = req.query.id as string;

      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: req.body.name,
          roleId: req.body.roleId,
        }
      });

      return res.status(200).json({ user: updateUser });
    }

    if (req.method === 'DELETE') {
      console.log("req", req)
      const userId = req.query.id as string;

      const deleteUser = await prisma.user.delete({
        where: {
          id: userId,
        }
      });

      return res.status(200).json({ user: deleteUser });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default usersApi
