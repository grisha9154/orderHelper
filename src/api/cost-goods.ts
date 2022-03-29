import { RequestHandler } from 'express';
import { CostGoods } from '../models/cost-goods';

export const costGoodsRouter: RequestHandler = async (_req, res) => {
    try {
        const elements = await CostGoods.findAll();
        res.send(elements);
    } catch (e) {
        res.send(e);
    }
};
