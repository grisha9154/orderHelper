import { RequestHandler, Express } from "express";
import { signUp, signIn, getJWTToken, checkAuthToken } from "../services/auth-helper";

const handleSignUp: RequestHandler = async (req, res) => {
  try {
    const { login, name, password } = req.body;
    const isSucces = await signUp(login, name, password);
    if (!isSucces) {
      res.status(400).send();
      return;
    }
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const handleSignIn: RequestHandler = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await signIn(login, password);
    if (user === null) {
      res.status(401).send();
      return;
    }
  
    const token = getJWTToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const handleLogout: RequestHandler = (req, res) => {
  res.send();
};

const handleAuthorise: RequestHandler = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).send();
    return;
  }
  const token = authHeader.split(' ')[1];
  const userId = checkAuthToken(token);

  if (!userId) {
    res.status(401).send();
    return;
  }
  req.body.userId = userId;
  next();
}

export const authRouter: (app: Express) => void = (app) => {
  app.post("/api/signup", handleSignUp);
  app.post("/api/signin", handleSignIn);
  app.post("/api/logout", handleLogout);
  app.use(handleAuthorise);
};
