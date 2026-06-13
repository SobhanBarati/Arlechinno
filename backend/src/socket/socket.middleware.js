import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (
  socket,
  next
) => {
  try {

    console.log(
      "Handshake:",
      socket.handshake.auth
    );

    const token =
      socket.handshake.auth.token;

    console.log(
      "Token:",
      token
    );

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );

    console.log(
      "Decoded:",
      decoded
    );

    socket.user = {
      userId: decoded.userId,
    };

    next();

  } catch (error) {

    console.error(error);

    next(
      new Error("Invalid token")
    );
  }
};