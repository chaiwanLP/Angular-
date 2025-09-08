import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Trip } from '../../services/api/trip';

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
  // ฟิลด์ทั้งหมดของ Trip
  tripId: number | null = null;

  name = '';
  destination = '';
  country = '';
  cover = '';
  detail = '';
  price = 0;
  duration = '';

  destinations = [
    { name: 'Bangkok', value: 1 },
    { name: 'Chiang Mai', value: 2 },
    { name: 'Phuket', value: 3 },
  ];

  constructor(private trip: Trip) {}

  async fetchTrip() {
    if (!this.tripId) {
      alert('กรุณาใส่ Trip ID');
      return;
    }

    try {
      const trip = await this.trip.getOneTrip(this.tripId);
      if (!trip) {
        alert('ไม่พบ Trip ที่มี ID นี้');
        return;
      }
      this.name = trip.name;
      this.destination = trip.destinationid.toString();
      this.country = trip.country;
      this.cover = trip.coverimage;
      this.detail = trip.detail;
      this.price = trip.price;
      this.duration = trip.duration.toString();
    } catch (error) {
      alert('ไม่พบ Trip ที่มี ID นี้');
    }
  }

  async updateTrip() {
    if (!this.tripId) {
      alert('กรุณาใส่ Trip ID');
      return;
    }

    const updatedTrip = {
      name: this.name,
      destinationid: Number(this.destination),
      country: this.country,
      coverimage: this.cover,
      detail: this.detail,
      price: this.price,
      duration: this.duration,
    };

    try {
      await this.trip.updateTrip(this.tripId, updatedTrip);
      alert('อัปเดตเรียบร้อย!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัปเดต');
    }
  }
}
