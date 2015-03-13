// Google's QPX API, request and response bodies


// REQUEST JSON, SFO to LAX
//https://developers.google.com/qpx-express/v1/json.samples/SFOLAX.in.json

var request = {
  "request": {
    "passengers": {
      "adultCount": "1"
    },
    "slice": [
      {
        "origin": "SFO",
        "destination": "LAX",
        "date": "2014-09-19"
      }
    ],
    "solutions": "1"
  }
};

// RESPONSE JSON, SFO to LAX
// https://developers.google.com/qpx-express/v1/json.samples/SFOLAX.out.json

var response = {
 "kind": "qpxExpress#tripsSearch",
 "trips": {
  "kind": "qpxexpress#tripOptions",
  "requestId": "eBJXPDdjvK4zDogeE0JJp3",
  "data": {
   "kind": "qpxexpress#data",
   "airport": [
    {
     "kind": "qpxexpress#airportData",
     "code": "LAX",
     "city": "LAX",
     "name": "Los Angeles International"
    },
    {
     "kind": "qpxexpress#airportData",
     "code": "SFO",
     "city": "SFO",
     "name": "San Francisco International"
    }
   ],
   "city": [
    {
     "kind": "qpxexpress#cityData",
     "code": "LAX",
     "name": "Los Angeles"
    },
    {
     "kind": "qpxexpress#cityData",
     "code": "SFO",
     "name": "San Francisco"
    }
   ],
   "aircraft": [
    {
     "kind": "qpxexpress#aircraftData",
     "code": "320",
     "name": "Airbus A320"
    }
   ],
   "tax": [
    {
     "kind": "qpxexpress#taxData",
     "id": "ZP",
     "name": "US Flight Segment Tax"
    },
    {
     "kind": "qpxexpress#taxData",
     "id": "XF",
     "name": "US Passenger Facility Charge"
    },
    {
     "kind": "qpxexpress#taxData",
     "id": "AY",
     "name": "US September 11th Security Fee"
    },
    {
     "kind": "qpxexpress#taxData",
     "id": "US_1",
     "name": "US Transportation Tax"
    }
   ],
   "carrier": [
    {
     "kind": "qpxexpress#carrierData",
     "code": "VX",
     "name": "Virgin America Inc."
    }
   ]
  },
  "tripOption": [
   {
    "kind": "qpxexpress#tripOption",
    "saleTotal": "USD69.00",
    "id": "faqkIcj6Te2V3Sll2SskwJ001",
    "slice": [
     {
      "kind": "qpxexpress#sliceInfo",
      "duration": 75,
      "segment": [
       {
        "kind": "qpxexpress#segmentInfo",
        "duration": 75,
        "flight": {
         "carrier": "VX",
         "number": "922"
        },
        "id": "G4Yqn7Md2QltVrzT",
        "cabin": "COACH",
        "bookingCode": "S",
        "bookingCodeCount": 7,
        "marriedSegmentGroup": "0",
        "leg": [
         {
          "kind": "qpxexpress#legInfo",
          "id": "LFaJowO2NvJzM2Vd",
          "aircraft": "320",
          "arrivalTime": "2014-09-19T08:15-07:00",
          "departureTime": "2014-09-19T07:00-07:00",
          "origin": "SFO",
          "destination": "LAX",
          "originTerminal": "2",
          "destinationTerminal": "3",
          "duration": 75,
          "onTimePerformance": 93,
          "mileage": 337,
          "secure": true
         }
        ]
       }
      ]
     }
    ],
    "pricing": [
     {
      "kind": "qpxexpress#pricingInfo",
      "fare": [
       {
        "kind": "qpxexpress#fareInfo",
        "id": "A+yi0+pn2eL1pf3nKwZazHIVDvsw2Ru8zx5LByC/kQaA",
        "carrier": "VX",
        "origin": "SFO",
        "destination": "LAX",
        "basisCode": "S21NR"
       }
      ],
      "segmentPricing": [
       {
        "kind": "qpxexpress#segmentPricing",
        "fareId": "A+yi0+pn2eL1pf3nKwZazHIVDvsw2Ru8zx5LByC/kQaA",
        "segmentId": "G4Yqn7Md2QltVrzT",
        "freeBaggageOption": [
         {
          "kind": "qpxexpress#freeBaggageAllowance",
          "pieces": 0
         }
        ]
       }
      ],
      "baseFareTotal": "USD53.95",
      "saleFareTotal": "USD53.95",
      "saleTaxTotal": "USD15.05",
      "saleTotal": "USD69.00",
      "passengers": {
       "kind": "qpxexpress#passengerCounts",
       "adultCount": 1
      },
      "tax": [
       {
        "kind": "qpxexpress#taxInfo",
        "id": "US_1",
        "chargeType": "GOVERNMENT",
        "code": "US",
        "country": "US",
        "salePrice": "USD4.05"
       },
       {
        "kind": "qpxexpress#taxInfo",
        "id": "AY",
        "chargeType": "GOVERNMENT",
        "code": "AY",
        "country": "US",
        "salePrice": "USD2.50"
       },
       {
        "kind": "qpxexpress#taxInfo",
        "id": "XF",
        "chargeType": "GOVERNMENT",
        "code": "XF",
        "country": "US",
        "salePrice": "USD4.50"
       },
       {
        "kind": "qpxexpress#taxInfo",
        "id": "ZP",
        "chargeType": "GOVERNMENT",
        "code": "ZP",
        "country": "US",
        "salePrice": "USD4.00"
       }
      ],
      "fareCalculation": "SFO VX LAX 53.95S21NR USD 53.95 END ZP SFO XT 4.05US 4.00ZP 2.50AY 4.50XF SFO4.50",
      "latestTicketingTime": "2014-02-05T23:59-05:00",
      "ptc": "ADT"
     }
    ]
   }
  ]
 }
};


// REQUEST ID
var requestId = response.trips.requestId; //"eBJXPDdjvK4zDogeE0JJp3"
console.log(requestId);

// DEPARTURE
var departureCity = response.trips.data.city[0].name; //"San Francisco"
var departureAirportCode = response.trips.data.airport[0].code; //"SFO"
var departureAirportName = response.trips.data.airport[0].name; //"San Francisco International"
var departureTerminal = response.trips.tripOption[0].slice[0].segment[0].leg[0].originTerminal; //"2"
console.log(departureCity, departureAirportCode, departureAirportName, departureTerminal);

// ARRIVAL
var arrivalCity = response.trips.data.city[1].name; //"Los Angeles"
var arrivalAirportCode = response.trips.data.airport[1].code; //"LAX"
var arrivalAirportName = response.trips.data.airport[1].name; //"Los Angeles International"
var arrivalTerminal = response.trips.tripOption[0].slice[0].segment[0].leg[0].destinationTerminal; //"3"
console.log(arrivalCity, arrivalAirportCode, arrivalAirportName, arrivalTerminal);

// TIMES
var departureTime = response.trips.tripOption[0].slice[0].segment[0].leg[0].departureTime; //"2014-09-19T07:00-07:00"
var arrivalTime = response.trips.tripOption[0].slice[0].segment[0].leg[0].arrivalTime; //"2014-09-19T07:00-07:00"
var flightDuration = response.trips.tripOption[0].slice[0].segment[0].leg[0].duration; //75 (int)
console.log(departureTime, arrivalTime, flightDuration);

// FLIGHT, AIRCRAFT
var airlineCarrier = response.trips.data.carrier[0].name; //"Virgin America Inc.
var flightCarrierCode = response.trips.tripOption[0].slice[0].segment[0].flight.carrier; //"VX"
var flightNumber = response.trips.tripOption[0].slice[0].segment[0].flight.number; //"922"
var cabin = response.trips.tripOption[0].slice[0].segment[0].cabin; //"COACH"
var aircraft = response.trips.data.aircraft[0].name; //"Airbus A320"
console.log(airlineCarrier, flightCarrierCode, flightNumber, cabin, aircraft);

// PRICING
var baseFareTotal  = response.trips.tripOption[0].pricing[0].baseFareTotal; //"USD53.95"
var saleFareTotal  = response.trips.tripOption[0].pricing[0].saleFareTotal; //"USD53.95"
var saleTaxTotal  = response.trips.tripOption[0].pricing[0].saleTaxTotal; //"USD15.05"
var saleTotal  = response.trips.tripOption[0].pricing[0].saleTotal; //"USD69.00"
console.log(baseFareTotal, saleFareTotal, saleTotal, saleTotal);

