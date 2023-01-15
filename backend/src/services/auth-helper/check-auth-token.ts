import jsonwebtoken from "jsonwebtoken";

export const checkAuthToken = (token: string) => {
  const JWTSecret = process.env.JWT_SECRET;
  if (!JWTSecret) {
    throw new Error("Empty JWT secret");
  }
  try {
    const decode = jsonwebtoken.verify(
      token,
      JWTSecret
    ) as jsonwebtoken.JwtPayload;
    return decode?.id;
  } catch (error) {
    return null;
  }
};
