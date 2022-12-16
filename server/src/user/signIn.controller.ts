import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client('구글 클라이언트 id');
import auth from '../util/jwt';
const { generateToken, verifyToken } = auth;

export default {
  signIn: async (req: Request, res: Response) => {
    const { data, checkedKeepLogin } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
    });
    const payload = ticket.getPayload();
    const googleId = payload?.sub; //21자리의 Google 회원 id 번호

    // 구글 아이디가 있고 회원가입이 되어있으면 로그인
    const user = await prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (googleId && user) {
      const { accessToken, refreshToken } = generateToken(data, checkedKeepLogin);
      if (refreshToken) {
        res.cookie('refresh_jwt', refreshToken, {
          domain: 'localhost',
          path: '/',
          sameSite: 'none',
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 24 * 3600 * 1000 * 7), // 7일 후 소멸되는 Persistent Cookie
        });
      }
      res.cookie('access_jwt', accessToken, {
        domain: 'localhost',
        path: '/',
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        // Expires 옵션이 없는 Session Cookie
      });
      return res.status(200).json(user);
    }

    if (googleId) {
      // console.log('구글 아이디가 있고 회원가입이 되어있지 않으면 회원가입');
      let newUser;
      try {
        newUser = await prisma.user.create({
          data: {
            ...data,
            googleId,
          },
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json(e);
      }
      const { accessToken, refreshToken } = generateToken(data, checkedKeepLogin);
      if (refreshToken) {
        res.cookie('refresh_jwt', refreshToken, {
          domain: 'localhost',
          path: '/',
          sameSite: 'none',
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 24 * 3600 * 1000 * 7), // 7일 후 소멸되는 Persistent Cookie
        });
      }
      res.cookie('access_jwt', accessToken, {
        domain: 'localhost',
        path: '/',
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        // Expires 옵션이 없는 Session Cookie
      });
      return res.status(200).json(user);
    } else {
      // console.log('구글 아이디가 없으면 out')
      return res.status(401).json('UnAuthorized');
    }
  },
};
