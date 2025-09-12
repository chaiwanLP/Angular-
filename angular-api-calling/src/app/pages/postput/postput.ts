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

  distinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 4, name: 'เอเชียตะวันตก' },
    { value: 5, name: 'อเมริกาเหนือ' },
    { value: 6, name: 'อเมริกาใต้' },
    { value: 7, name: 'โอเชียเนีย' },
    { value: 8, name: 'แอฟริกา' },
    { value: 9, name: 'ประเทศไทย' },
    { value: 10, name: 'อื่นๆ' },
  ];
  constructor(private http: HttpClient, private tripService: Trip, private router: Router) {}
  async addNew() {
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

interface Destination {
  value: number;
  name: string;
}

