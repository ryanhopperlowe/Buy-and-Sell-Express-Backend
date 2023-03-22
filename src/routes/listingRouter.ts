import { Router } from "express";
import { RootService } from "../service";
import { ListingService } from "../service/listingService";

const service = new ListingService(RootService.instance);
const listingsRouter = Router();

listingsRouter.get('/api/listings', async (req, res) => {
  const listings = await service.fetchAllListings();

  res.send(listings);
});

export { listingsRouter };