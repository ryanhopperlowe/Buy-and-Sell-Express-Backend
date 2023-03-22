import { RootService } from "./rootService";

export class ListingService {
  constructor(
    private root: RootService
  ) {}

  async fetchAllListings() {
    this.log('fetchAllListings');
    const { results } = await RootService.instance.query(
      'SELECT * FROM listings'
    );

    return results;
  }

  async fetchListing(id: string) {
    this.log('fetchListings');
    const { results } = await this.root.query<unknown[]>(
      'SELECT * FROM listings WHERE id=?',
      [id]
    );

    if (results.length < 1) throw new Error('404');

    return results[0]
  }

  async addViewToListing(id: string) {
    this.log('addViewToListing');
    const { results } = await this.root.query(
      `
        UPDATE listings
        SET views=views+1
        WHERE id=?
      `,
      [id]
    );

    return 'Success';
  }

  private log(message: string) {
    console.log(`ListingService::${message}`);
  }
}