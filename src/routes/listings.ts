import { Router } from "express";
import { RootService } from "../service";

const listingsRouter = Router();

listingsRouter.get('/api/listings', async (req, res) => {
  const { results: listings } = await RootService.instance.query(
    'SELECT * FROM listings'
  );

  res.send(listings);
});

export { listingsRouter };