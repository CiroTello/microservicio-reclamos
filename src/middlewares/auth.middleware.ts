import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import config from '@config/index';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    const authResponse = await axios.get(`${config.SECURITY_URL}${config.CURRENT_USER}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    if (authResponse.status === 200) {
      req.user = authResponse.data;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}