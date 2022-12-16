// import jwt from 'jsonwebtoken';
// import auth from '../util/jwt';
// const { generateToken, verifyToken } = auth;

// export default (req, res, next) => {
//   try {
//     const accessToken = req.cookies['access_jwt'];
//     const refreshToken = req.cookies['refresh_jwt'];
//     const accessPayload = verifyToken('access', accessToken);
//     const refreshPayload = verifyToken('refresh', refreshToken);

//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!'),
//     });
//   }
// };
