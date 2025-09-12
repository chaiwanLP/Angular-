import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../../services/api/trip';
import { Router } from '@angular/router';
import { Destination } from '../../model/trip_get_res';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-postput',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  templateUrl: './postput.html',
  styleUrl: './postput.css',
})
export class PostputComponent {
  name: string = '';
  destination: number = 0;
  country: string = '';
  cover: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  
  constructor(
    private http: HttpClient,
    private tripService: Trip,
    private router: Router
  ) {}

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];
  async addNew() {
     if (!this.name || !this.country || !this.destination) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    console.log('Adding new trip with details:');
    const body = {
      name: this.name,
      country: this.country,
      destinationid: Number(this.destination),
      coverimage: this.cover,
      detail: this.detail,
      price: this.price,
      duration: this.duration,
    };

    // const url = 'http://localhost:3000/trip';
    try {
      const response = await this.tripService.addNewTrip(body);
      console.log(response);
    } catch (error) {
      console.error('POST failed:', error);
    }
  }
  updateTrip() {
    // Navigate to a specific route, e.g., home page
    this.router.navigate(['/updateTrip']);
  }
}


