import { ListingInfo } from "../model";
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
    this.log('fetchListing');
    const { results } = await this.root.query<unknown[]>(
      'SELECT * FROM listings WHERE id=?',
      [id]
    );

    if (results.length < 1) throw new Error('404');

    return results[0]
  }

  async addViewToListing(id: string) {
    this.log('addViewToListing');
    await this.root.query(
      `
        UPDATE listings
        SET views=views+1
        WHERE id=?
      `,
      [id]
    );

    return 'Success';
  }

  async fetchUserListings(userId: string) {
    this.log('fetchUserListings');

    const { results } = await this.root.query(
      `
        SELECT * from listings
        WHERE user_id=?
      `,
      [userId]
    );

    return results;
  }

  async updateListing(id: string, userId: string, payload: ListingInfo) {
    this.log('updateListing');
    await this.root.query(
      `
        UPDATE listings
        SET name=?, description=?, price=?
        WHERE id=? AND user_id=?
      `,
      [payload.name, payload.description, String(payload.price), id, userId]
    );
  }

  async createListing(id: string, userId: string, payload: ListingInfo) {
    this.log('createListnig');
    const { name, description, price } = payload;

    await this.root.query(
      `
        INSERT INTO listings (id, name, description, price, user_id, views)
        VALUES
          (?, ?, ?, ?, ?, ?)
      `,
      [id, name, description, String(price), userId, '0']
    );
  }

  async deleteListing(id: string, userId: string) {
    this.log('deleteListing');
    await this.root.query(
      `
        DELETE FROM listings
        WHERE id=? AND user_id=?
      `,
      [id, userId]
    );
  }

  private log(message: string) {
    console.log(`ListingService::${message}`);
  }
}