import { RequestHandler, Express } from "express";
import { setAdmin } from "../services/user-permission";

const handleSetAdmin: RequestHandler = async (req, res) => {
    const { secret, userId } = req.body;
    if (secret === process.env.SET_ADMIN_SECRET) {
        await setAdmin(userId);
        res.send();
    } else {
        res.status(403).send();
    }
}

export const permissionRouter = (app: Express) => {
    app.post("/api/set-admin", handleSetAdmin)
};