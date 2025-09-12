export interface TripGetResponse {
  id: any;
  idx: number;
  name: string;
  country: string;
  destinationid?: number;
  coverimage: string;
  detail: string;
  price: number;
  duration: number;
  // Added fields
  destination_zone?: string;
  destinationName?: string;
}

export interface Destination {
  value: number;
  name: string;
}
