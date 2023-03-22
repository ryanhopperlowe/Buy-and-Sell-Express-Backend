import { RootService } from "./rootService";

export class ListingService {
  constructor(
    private root: RootService
  ) {}

  async fetchAllListings() {
    console.log('ListingService::fetchAllListings');
    
    const { results: listings } = await RootService.instance.query(
      'SELECT * FROM listings'
    );

    return listings;
  }
}