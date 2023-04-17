import express, { Router, Request } from "express";
import { RootService } from "../service";
import { ListingService } from "../service/listingService";
import { ListingInfo, verifyIsAuthorized, verifyUser } from '../model';
import { v4 as uuid } from 'uuid';

const service = new ListingService(RootService.instance);
const listingsRouter = Router();

listingsRouter.use(express.json());
listingsRouter.use(express.urlencoded({ extended: true }));

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
  console.log(req.headers);

  const response = await service.addViewToListing(id);

  res.send(response);
})

listingsRouter.get('/api/users/:userId/listings', async (req, res) => {
  const { userId } = req.params;
  verifyIsAuthorized(userId, req.headers.authorization);

  const response = await service.fetchUserListings(userId);

  res.send(response);
});

listingsRouter.post('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { userId } = await verifyUser(authorization);

  console.log(req.body);


  await service.updateListing(id, userId, req.body)
  const listing = await service.fetchListing(id);

  res.send(listing);
});

listingsRouter.post('/api/listings', async (req, res) => {
    const { userId } = await verifyUser(req.headers.authorization);
    const id = uuid();

    await service.createListing(id, userId, req.body);
    const listing = await service.fetchListing(id);

    res.send(listing);
});

listingsRouter.delete('/api/listings/:id', async (req, res) => {
  const { userId } = await verifyUser(req.headers.authorization);
  const { id } = req.params;

  await service.deleteListing(id, userId);

  res.send({ message: 'success' });
});

export { listingsRouter };