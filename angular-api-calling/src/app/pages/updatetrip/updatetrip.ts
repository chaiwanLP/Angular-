import { Trip } from './../../services/api/trip';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TripGetResponse } from '../../model/trip_get_res';

@Component({
  selector: 'app-update-trip',
  standalone: true,
  templateUrl: './updatetrip.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class UpdateTripComponent {
  tripId: number | null = null;
  Trips: TripGetResponse[] = [];
  name = '';
  destination = '';
  country = '';
  cover = '';
  detail = '';
  price = 0;
  duration = '';

  destinations = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  constructor(private trip: Trip) {}

  async findOne(input: HTMLInputElement) {
  const id = +input.value;

  if (!id || isNaN(id)) {
    alert('กรุณาใส่ Trip ID ที่ถูกต้อง');
    return;
  }

  try {
    const result = await this.trip.getOneTrip(id);

    if (!result) {
      alert('ไม่พบข้อมูล Trip นี้');
      return;
    }

    this.tripId = id;
    this.name = result.name;
    this.destination = result.destinationid?.toString() ?? '';
    this.country = result.country;
    this.cover = result.coverimage;
    this.detail = result.detail;
    this.price = result.price;
    this.duration = result.duration?.toString() ?? '';
  } catch (error: any) {
    console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
    alert('ไม่พบ Trip นี้ หรือเกิดข้อผิดพลาดในการโหลด');
  }
}

  async updateTrip() {
    if (this.tripId === null) {
      alert('กรุณาใส่ Trip ID');
      return;
    }

    const updatedTrip = {
      name: this.name,
      country: this.country,
      destinationid: Number(this.destination),
      coverimage: this.cover,
      detail: this.detail,
      price: this.price,
      duration: Number(this.duration),
    };

    try {
      await this.trip.updateTrip(this.tripId, updatedTrip);
      alert('อัปเดตเรียบร้อย!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัปเดต');
    }
  }
}
