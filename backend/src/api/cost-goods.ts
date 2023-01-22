import { Application } from "express";
import { CostGoods } from "../data-base/models/cost-goods";

export const costGoodsRouter = (app: Application) => {
  app.get("/cost-goods", async (_req, res) => {
    try {
      const costGoods = await CostGoods.findAll();
      res.send(costGoods);
    } catch (e) {
      res.send(e);
    }
  });
  app.post("/cost-goods", async (req, res) => {
    const costGood = req.body;
    try {
      await CostGoods.create(costGood);
      res.send('ok');
    }
    catch (e) {
      res.send(e);
    }
  });
  app.put("/cost-goods", async (req, res) => {
    const costGood = req.body;
    try {
      const dbGoods = await CostGoods.findAll();
      const dbGood = dbGoods.find(g => g.id === costGood.id);
      if (dbGood) {
        dbGood.additionalExpenses = costGood.additionalExpenses;
        dbGood.cost = costGood.cost;
        dbGood.costPrice = costGood.costPrice;
        dbGood.dryCost = costGood.dryCost;
        dbGood.dryWeight = costGood.dryWeight;
        dbGood.margin = costGood.margin;
        dbGood.name = costGood.name;
        dbGood.originCost = costGood.originCost;
        dbGood.save();
      }
      res.send('ok');
    }
    catch (e) {
      res.send(e);
    }
    
  })
};
