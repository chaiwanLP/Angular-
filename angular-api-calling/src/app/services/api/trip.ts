import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { Destination, TripGetResponse } from '../../model/trip_get_res';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private constants: Constants, private http: HttpClient) {}

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  getDestinationName(id: number): string {
    const found = this.distinations.find((d) => d.value === id);
    return found ? found.name : 'ไม่ทราบภูมิภาค';
  }

  public async getTrip(): Promise<TripGetResponse[]> {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get<TripGetResponse[]>(url));
    return response.map((trip) => ({
      ...trip,
      destinationName: trip.destination_zone
        ? trip.destination_zone
        : this.getDestinationName((trip as any).destinationid), // fallback ถ้ามี id
    }));
  }

  public async getOneTrip(id: number): Promise<TripGetResponse | null> {
    if (!id) return null;
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.get<TripGetResponse>(url));

    return {
      ...response,
      destinationName: response.destination_zone
        ? response.destination_zone
        : this.getDestinationName(response.destinationid ?? 0),
    };
  }

  public async getTripByName(name: string) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(
      this.http.get<TripGetResponse[]>(url, { params: { name } })
    );
    return response.map((trip) => ({
      ...trip,
      destinationName: this.getDestinationName(trip.destinationid ?? 0),
    }));
  }

  public async addNewTrip(trip: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    return await lastValueFrom(this.http.post(url, trip));
  }

  public async updateTrip(id: number, trip: any) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    return await lastValueFrom(this.http.put(url, trip));
  }

  public async deleteTrip(id: number) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    return await lastValueFrom(this.http.delete(url));
  }
  
}
