import dotenv from 'dotenv';
dotenv.config();
import jtw from 'jsonwebtoken';
const { sign, verify } = jtw;
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

interface TokenResult {
  accessToken: string | null;
  refreshToken: string | null;
}

export default {
  generateToken: (user: any, checkedKeepLogin: boolean) => {
    const payload = {
      id: user.id,
      email: user.email,
    };

    let tokenResult: TokenResult = {
      accessToken: null,
      refreshToken: null,
    };

    if (ACCESS_SECRET) {
      tokenResult.accessToken = sign(payload, ACCESS_SECRET, {
        expiresIn: '1d', // 1일간 유효한 토큰을 발행합니다.
      });
    }

    if (checkedKeepLogin && REFRESH_SECRET) {
      tokenResult.refreshToken = sign(payload, REFRESH_SECRET, {
        expiresIn: '7d', // 일주일간 유효한 토큰을 발행합니다.
      });
    }

    return tokenResult;
  },

  verifyToken: (type: string, token: string) => {
    let secretKey, decoded;
    switch (type) {
      case 'access':
        secretKey = ACCESS_SECRET;
        break;
      case 'refresh':
        secretKey = REFRESH_SECRET;
        break;
      default:
        return null;
    }

    if (secretKey) {
      try {
        decoded = verify(token, secretKey);
      } catch (err) {
        console.log(`JWT Error`);
        return null;
      }
    }
    return decoded;
  },
};
