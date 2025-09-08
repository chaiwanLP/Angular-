import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TripGetResponse } from '../../model/trip_get_res';
import { lastValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-call-api',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './call-api.html',
  styleUrl: './call-api.css',
})
export class CallApiComponent implements OnInit {
  constructor(private http: HttpClient, private tripService: Trip) {}
  ngOnInit(): void {
    this.loadDataAsync();
    console.log('Init State');
  }
  trips: TripGetResponse[] = [];
  async loadDataAsync() {
    this.trips = await this.tripService.getTrip();
  }
  async callApi() {
    // const url = 'http://localhost:3000/trip';
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = data as TripGetResponse[];
    this.trips = await this.tripService.getTrip();
    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findOne(input: HTMLInputElement) {
    // console.log(input.value);
    // const url = `http://localhost:3000/trip/${input.value}`;
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = [data as TripGetResponse];
    this.trips = [
      (await this.tripService.getOneTrip(+input.value)) as TripGetResponse,
    ];
    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findName(input: HTMLInputElement) {
    console.log(input.value);
    // const url = 'http://localhost:3000/trip';
    // let data = await lastValueFrom(this.http.get(url));
    // const trips = data as TripGetResponse[];

    const trips = await this.tripService.getTripByName(input.value);
    this.trips = trips.filter((trip) =>
      trip.name.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(this.trips);
    if (this.trips.length > 0) {
      console.log(this.trips[0].name);
    }
    console.log('Call Completed');
  }
  async Delete(id: number) {
    if (confirm('Are you sure to delete id ' + id + '?')) {
      // const url = `http://localhost:3000/trip/${id}`;
      // await lastValueFrom(this.http.delete(url));
      await this.tripService.deleteTrip(id);
      this.loadDataAsync();
      console.log('Deleted id ' + id);
    }
  }
}
