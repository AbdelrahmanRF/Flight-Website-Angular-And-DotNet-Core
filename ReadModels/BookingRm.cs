namespace Flights.ReadModels;

public record BookingRm (
    Guid Id,
    string Airline,
    string Price,
    TimePlaceRm Arrival,
    TimePlaceRm Departure,
    int NumberOfBookedSeats,
    string PassengerEmail
    );