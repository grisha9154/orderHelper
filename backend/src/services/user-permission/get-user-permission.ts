import { UserPermission } from "../../models/user-permission";
import { Permission } from "./interfaces";

export const getUserPermission = async (
  id: number
): Promise<Permission | null> => {
  const permission = await UserPermission.findOne({ where: { userId: id } });

  if (permission === null) {
    return null;
  }

  return {
    isAdmin: permission.isAdmin,
  };
};
