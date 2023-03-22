import { Router } from "express";
import { RootService } from "../service";
import { ListingService } from "../service/listingService";

const service = new ListingService(RootService.instance);
const listingsRouter = Router();

listingsRouter.get('/api/listings', async (req, res) => {
  const listings = await service.fetchAllListings();

  res.send(listings);
});

listingsRouter.get('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await service.fetchListing(id);
  res.send(listing);
});

listingsRouter.post('/api/listings/:id/add-view', async (req, res) => {
  const { id } = req.params;
  const response = await service.addViewToListing(id);

  res.send(response);
})

export { listingsRouter };