import { Component, OnInit } from '@angular/core';
import { FlightService } from './../api/services/flight.service'
import { FlightRm } from '../api/models'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  searchResult: FlightRm[] = []

  constructor(private flightService: FlightService,
    private fb: FormBuilder) { }

  searchForm = this.fb.group({
    from: [''],
    destination: [''],
    fromDate: [''],
    toDate: [''],
    numberOfPassengers: [1]
  })

  ngOnInit(): void {

  }

  search() {
    const formValue = {
      ...this.searchForm.value,
      fromDate: this.searchForm.value.fromDate || '',
      toDate: this.searchForm.value.toDate || '',
      from: this.searchForm.value.from || '',
      destination: this.searchForm.value.destination || '',
      numberOfPassengers: this.searchForm.value.numberOfPassengers || 1 
    };

    this.flightService.searchFlight(formValue)
      .subscribe({
        next: r => this.searchResult = r,
        error: this.handleError,
      });
  }



  private handleError(err: any) {
    console.log(err)
  }

}


