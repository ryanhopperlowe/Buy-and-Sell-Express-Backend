import { Router } from "express";
import { db } from "../database";

const listingsRouter = Router();

listingsRouter.get('/api/listings', async (req, res) => {
  const { results: listings } = await db.query(
    'SELECT * FROM listings'
  );
  
  res.send(listings);
});

export { listingsRouter };