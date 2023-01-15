import { UserPermission } from "../../models/user-permission";

export const setAdmin = async(userId: number): Promise<void> => {
    const permission = await UserPermission.findOne({ where: {
        userId,
    }});

    if (permission === null) {
        await UserPermission.create({
            userId,
            isAdmin: true,
        });
    } else {
        permission.isAdmin = true;
        await permission.save();
    }
}