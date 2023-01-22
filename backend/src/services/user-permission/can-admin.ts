import { RequestHandler } from "express";
import { getUserPermission } from "./get-user-permission";

export const canAdmin: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId;
  const permission = await getUserPermission(userId);
  const isAdmin = !!permission?.isAdmin;
  if (!isAdmin) {
    res.status(403).send();
    return;
  }
  next();
};
