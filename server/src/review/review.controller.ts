import { PrismaClient, Review, Wishlist } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export default {
  findMany: async (req: Request, res: Response) => {
    const result = await prisma.review.findMany({
      include: {
        Wishlist: true,
      },
    });

    return res.json(result);
  },

  findOne: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await prisma.review.findUnique({
      where: { id },
      include: {
        Wishlist: true,
      },
    });
    return res.json(result);
  },

  createOne: async (req: Request, res: Response) => {
    const { data } = req.body;

    let review: Review | null;
    try {
      review = await prisma.review.create({
        data: {
          ...data,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.json({
      status: 'ok',
      response: {
        reviewId: review?.id,
        authorId: data.authorId,
      },
    });
  },

  updateOne: async (req: Request, res: Response) => {
    const { data } = req.body;
    const reviewId = Number(req.params.id);

    try {
      await prisma.review.update({
        where: { id: reviewId },
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

  deleteOne: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await prisma.review.delete({
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

  wish: async (req: Request, res: Response) => {
    const reviewId = Number(req.params.id);
    const userId = Number(req.body.data.authorId);

    let wishlist: Wishlist | null;
    try {
      // wishlist가 있는지 먼저 찾고
      wishlist = await prisma.wishlist.findUnique({
        where: {
          wishlistId: {
            reviewId,
            userId,
          },
        },
      });

      // 있으면 true
      if (wishlist) {
        await prisma.wishlist.update({
          where: {
            id: wishlist.id,
          },
          data: {
            isWishlist: true,
          },
        });
        return res.json('ok');
      }

      // 없으면 생성
      wishlist = await prisma.wishlist.create({
        data: {
          reviewId,
          userId,
          isWishlist: true,
        },
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json(e);
    }
    return res.json({
      status: 'ok',
      response: {
        wishlistId: wishlist?.id,
        authorId: userId,
      },
    });
  },

  unWish: async (req: Request, res: Response) => {
    let wid = Number(req.params.wishlistId);
    const reviewId = Number(req.params.id);
    const userId = Number(req.body.data.authorId);

    try {
      if (!wid) {
        const wishlist = await prisma.wishlist.findUnique({
          where: {
            wishlistId: {
              reviewId,
              userId,
            },
          },
        });
        if (!wishlist) {
          return res.status(404).json('Not Found');
        }
        wid = wishlist.id;
      }

      await prisma.wishlist.update({
        where: {
          id: wid,
        },
        data: {
          isWishlist: false,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.status(204).json('No Content');
  },

  replacePhoto: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const photos = req.body.data.photos;
    try {
      await prisma.review.update({
        where: { id },
        data: {
          photos,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.json('ok');
  },
};
