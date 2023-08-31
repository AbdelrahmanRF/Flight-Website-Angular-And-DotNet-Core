using System.ComponentModel;

namespace Flights.Dtos
{
    public record FlightSearchParameters(

        [DefaultValue("8/31/2023 10:30:00 AM")]
        DateTime? FromDate,

        [DefaultValue("9/1/2023 10:30:00 AM")]
        DateTime? ToDate,

        [DefaultValue("Los Angeles")]
        string? From,

        [DefaultValue("Berlin")]
        string? Destination,

        [DefaultValue(1)]
        int? NumberOfPassengers

        );

}