import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../services/api/trip';
import { TripGetResponse } from '../../model/trip_get_res';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './detail.html',
  standalone: true,
  imports: [CommonModule],
})
export class Detail implements OnInit {
  trip: TripGetResponse | null = null;

  constructor(private route: ActivatedRoute, private tripService: Trip, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idx'));
    const result = await this.tripService.getOneTrip(id);
    this.trip = result;
    console.log('trip', this.trip);
    this.cdr.detectChanges();
  }
}
