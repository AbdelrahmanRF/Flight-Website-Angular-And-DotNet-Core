import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from './../api/services/flight.service'
import { BookDto, FlightRm } from '../api/models'
import { AuthService } from '../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  flightId: string = "not loaded";
  flight: FlightRm = {}
  form = this.fb.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(254)])]
  })

  constructor(private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    if (!this.authService.currentUser)
      this.router.navigate(['/register-passenger'])

    this.route.paramMap
      .subscribe(p => this.findFlight(p.get("flightId")))
  }

  private findFlight =  (flightId: string | null) =>{
    this.flightId = flightId ?? "notpassed";

    this.flightService.findFlight({id : this.flightId})
      .subscribe({
        next: flight => this.flight = flight,
        error: this.handelError
      })
  }

  private handelError = (err: any)=> {

    if (err.status == 404) {
      alert("Flight not found")
      this.router.navigate(['/search-flights'])
    }
    if (err.status == 409) {
      console.log("error: " + err)
      alert(JSON.parse(err.error).message)
    }

  }

  book() {

    if (this.form.invalid)
      return;

    console.log(`Booking ${this.form.get('number')?.value} passengers for the flight: ${this.flight.id}`)

    var booking: BookDto = {
      flightId: this.flight.id,
      numberOfSeats: this.form.get('number')?.value as number,
      passengerEmail: this.authService.currentUser?.email  
    }

    this.flightService.bookFlight({ body: booking })
      .subscribe({
        next: _ => this.router.navigate(['/my-bookings']),
        error: this.handelError
      });
  }

  get number() {
    return this.form.controls.number
  }
}
