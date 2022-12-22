import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export default {
  // findMany: async (req: Request, res: Response) => {},

  findOne: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id },
      });
    } catch (e) {
      res.status(400).json(e);
    }
    return res.json(user);
  },

  createOne: async (req: Request, res: Response) => {
    const { data } = req.body;
    let user;
    try {
      user = await prisma.user.create({
        data,
      });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.json(user?.id);
  },

  updateOne: async (req: Request, res: Response) => {
    const { data } = req.body;
    // const userId = Number(req.params.userId);

    let user;
    try {
      user = await prisma.user.update({
        where: { id: data.id },
        data: { ...data },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  },

  deleteOne: async (req: Request, res: Response) => {
    // TODO: 원칙적으로 유저와 연결된 모든 리뷰를 지워야 삭제가 가능
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
    const id = Number(req.params.id);
    let user;
    try {
      user = await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
    return res.json(user.id);
  },
};
