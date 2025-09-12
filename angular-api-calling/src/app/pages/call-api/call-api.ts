import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TripGetResponse } from '../../model/trip_get_res';
import { lastValueFrom } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip } from '../../services/api/trip';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
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
  countries = ['ญี่ปุ่น', 'ประเทศไทย', 'เนเธอร์แลนด์'];
  selectedCountry: string = '';

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
  async loadDataAsync() {
    this.trips = await this.tripService.getTrip();
  }
  async callApi() {
    this.trips = await this.tripService.getTrip();
    console.log(this.trips);
    console.log(this.trips[0].idx);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findOne(input: HTMLInputElement) {
    if(!input.value || isNaN(+input.value)) {
      alert('กรุณากรอก ID ที่เป็นตัวเลข');
      return;  
    }
    if(+input.value <=0 ) {
      alert('กรุณากรอก ID ที่มากกว่า 0');
      return;  
    }
    if(+input.value >this.trips.length) {
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
    console.log(input.value);
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
