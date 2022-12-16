import { Comment, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

// const getPageStartEnd = (limit: number, page: number) => {
//   const pageStart = (page - 1) * limit;
//   const pageEnd = pageStart + limit;
//   return { pageStart, pageEnd };
// };

export default {
  findMany: async (req: Request, res: Response) => {
    // const { limit, page } = req.query;
    const reviewId = Number(req.params.id);

    // if (!limit || !page) res.status(400).send('should have pagination parameter');

    // const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

    const result = await prisma.comment.findMany({
      where: {
        reviewId,
      },
      // skip: pageStart,
      // take: pageEnd,
    });

    return res.json(result);
  },

  findOne: async (req: Request, res: Response) => {
    const id = Number(req.params.commentId);
    const result = await prisma.comment.findUnique({
      where: { id },
    });
    return res.json(result);
  },

  updateOne: async (req: Request, res: Response) => {
    const { data } = req.body;
    const commentId = Number(req.params.commentId);

    try {
      await prisma.comment.update({
        where: { id: commentId },
        data: {
          ...data,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }

    return res.json({
      status: 'ok',
    });
  },

  createOne: async (req: Request, res: Response) => {
    const { data } = req.body;
    const reviewId = Number(req.params.id);

    let comment: Comment | null;
    try {
      comment = await prisma.comment.create({
        data: {
          ...data,
          reviewId,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.json({
      status: 'ok',
      response: {
        id: comment.id,
        reviewId: reviewId,
        authorId: data.authorId,
      },
    });
  },

  deleteOne: async (req: Request, res: Response) => {
    const id = Number(req.params.commentId);
    // let comment;
    try {
      await prisma.comment.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.status(204).json({
      status: 'ok',
      response: 'No Content',
    });
  },
};
