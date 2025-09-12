import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TripGetResponse } from '../../model/trip_get_res';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip } from '../../services/api/trip';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-call-api',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
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

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  countries: string[] = [];

  selectedCountry: string = '';
  async loadDataAsync() {
    try {
      this.trips = await this.tripService.getTrip();
    } catch (error) {
      console.error('โหลด trips ไม่สำเร็จ', error);
    }
  }
  async callApi() {
    this.trips = await this.tripService.getTrip();
    this.updateCountries();
    console.log(this.trips);
  }
  updateCountries() {
  const allCountries = this.trips.map(t => t.country);
  this.countries = [...new Set(allCountries)];
}

  async onCountryChange(event: any) {
    const selected = event.value;
    console.log('ค้นหาประเทศ:', selected);
    if (selected) {
      const trips = await this.tripService.getTripByName(selected);
      this.trips = trips.filter((trip) =>
        trip.country.toLowerCase().includes(selected.toLowerCase())
      );
    } else {
      this.loadDataAsync();
    }
  }

  async findOne(input: HTMLInputElement) {
    if (!input.value || isNaN(+input.value)) {
      alert('กรุณากรอก ID ที่เป็นตัวเลข');
      return;
    }
    if (+input.value <= 0) {
      alert('กรุณากรอก ID ที่มากกว่า 0');
      return;
    }
    if (+input.value > this.trips.length) {
      alert('ไม่มีข้อมูล ID นี้');
      return;
    }
    this.trips = [
      (await this.tripService.getOneTrip(+input.value)) as TripGetResponse,
    ];
    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findName(input: HTMLInputElement) {
    const query = input.value.trim();
    if (!query) {
      alert('กรุณากรอกชื่อทริป');
      return;
    }

    const trips = await this.tripService.getTripByName(query);
    this.trips = trips.filter((trip) =>
      trip.name.toLowerCase().includes(query.toLowerCase())
    );

    if (this.trips.length === 0) {
      alert('ไม่พบข้อมูลทริปที่ค้นหา');
    }
  }

  async Delete(id: number) {
    if (confirm('Are you sure to delete id ' + id + '?')) {
      await this.tripService.deleteTrip(id);
      this.loadDataAsync();
      console.log('Deleted id ' + id);
    }
  }
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://support.heberjahiz.com/hc/article_attachments/21013076295570';
  }
}
interface Destination {
  value: number;
  name: string;
}
