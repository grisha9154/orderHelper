import { RequestHandler } from 'express';
import { CostGoods } from '../models/cost-goods';

export const costGoodsRouter: RequestHandler = async (_req, res) => {
    const elements = await CostGoods.findAll();
    res.send(elements);
};
