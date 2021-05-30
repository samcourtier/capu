// Models and examples
// NOTE: There are bunch of examples in here that don't have interfaces yet

// UUID v4 reservoir for examples:
// 01d3586b-cc73-4672-9669-71e504abbd7d
// 8d50e334-dbec-4fb7-a46e-04ee4ece0311
// e014a8c5-e245-48a4-848c-a095d210bae6
// feeefbe9-e009-45cc-ae51-df39fed4bdc4
// 05a36b1d-0abd-4252-904f-048209aff2c1
// 1a5dc8e0-7f29-4df8-a554-666db632ccac
// 5327519d-2833-4689-aa51-eefa4d08a18e
// 9b94e0eb-75f9-45a4-b45c-92cd252c219d
// 711b6e44-1cf4-40c5-ad5e-abe6ac8800f3
// b5ee6aa2-c1b2-4fea-9c15-8fa4e9938a2a
// 42c57ba4-4c78-4ce1-8746-649c880309b7
// 1ae17a12-334c-4165-8e99-d98b2c8790ef
// 111f73d9-2972-4ff7-a7b2-8e06195f32fc
// 7754e749-a056-42c6-8427-67b9895c1996
// 1f0fd485-1f77-419e-aef7-999559e0fe15
// 72d82ac2-0d45-43f8-911d-51cfdf1e20b4
// ba96774f-baf5-4678-8ee6-da3c1aab586a
// 2660b789-4e03-4f6d-a8e3-43fbd4e6a964
// 9b1fab60-b165-4900-b2b9-4723b1912b0e
// a5fd15ea-848d-4417-979b-1c346e72a679
// 703c720b-2b9c-45b3-bd4e-00fff7fdb186
// 122c1fb2-d579-4a11-8684-c361c89b7196
// 2a915f19-5494-45b9-9807-2fd4c47c9ea1
// e4849291-9df8-47b0-9d54-e31d678a7c1b
// 61eb345b-8ebc-4285-aa27-835cbecd5374
// d8f744c2-00f2-4a67-8ec5-cb5ff3cb0265
// 57044439-ef1c-4fad-914a-1cb7d107af30
// 8a6f1a2f-cdab-44ea-914b-5f5d78a03ee4
// 9a542e72-6844-419c-96c1-b54497bcd2e1
// 245c049b-0201-4d1d-8208-ef70b059895e
// 8dbe772c-0e7c-4d0c-8692-142099f131bd
// 0aa75cda-d64f-451c-9e8b-bdcde384b9d9
// 989adfe6-bf11-4770-ae6e-6f1656006c7f

export interface User {
  id: string;
  displayName: string;
}

const users: Record<string, User> = {
  alice: {
    id: "191315df-2a80-46f6-977c-058b5a8719c5",
    displayName: "Alice A",
  },
  bob: {
    id: "1a31ec6c-5c02-4c16-8c2f-59c220e0a31e",
    displayName: "Bob B",
  },
  carol: {
    id: "158c5b1f-34e5-40ad-a5da-3f5da775e52a",
    displayName: "Carol C",
  },
};

export interface Announcement {
  id: string;
  submittedAt: Date;
  submittedBy: User;
  title: string;
  body: string;
}

export const announcements: Record<string, Announcement> = {
  0: {
    id: "da7fcf43-830b-4776-9d0e-22c7902048b8",
    submittedAt: new Date("2021-06-05 9:00"),
    submittedBy: users["alice"],
    title: "Announcement 2",
    body: "Bob Loblau Law",
  },
  1: {
    id: "96483807-83f2-42fb-8837-ccc40910edf5",
    submittedAt: new Date("2021-06-01 9:00"),
    submittedBy: users["carol"],
    title: "Announcement 1",
    body: "Blah blah blah blah",
  },
};

interface Place {
  id: string;
  name: string;
}

const places: Record<string, Place> = {
  mndot: {
    id: "886f18d2-8dbe-4d5e-85e4-63f9925c6668",
    name: "MnDOT",
    // Also, prob. a link to Google Maps or something
  },
};

interface WeatherForecast {
  sky: string;
  tempDegrees: number;
  dewpoint: number;
  wind: string;
  precipProb: number;
  expectedPrecipInches: number;
}

const weatherForecasts: Record<string, WeatherForecast> = {
  0: {
    // Maybe just start with the forecast for the meet place and get fancier
    // with using route data (probably much) later
    sky: "Sunny",
    tempDegrees: 65,
    dewpoint: 50,
    wind: "E 1 mph",
    precipProb: 5,
    expectedPrecipInches: 0.01,
  },
};

export interface RideLevel {
  id: string;
  name: string;
}

const rideLevel: Record<string, RideLevel> = {
  mondo: {
    id: "08508be8-7850-4792-a7af-3b47fb1e6e6e",
    name: "Mondo",
  },
  midi: {
    id: "412e88e3-4358-4ac3-83f1-fac665cb3c20",
    name: "Midi",
  },
};

interface Route {
  id: string;
  name: string;
  description: string;
  expectedMiles: number;
  expectedClimbingDifficulty: "easy" | "medium" | "hard";
}

const routes: Record<string, Route> = {
  0: {
    id: "be819e33-1510-4ab4-867d-bccd8d6c1794",
    name: "Route A",
    description: "A route description",
    expectedMiles: 50,
    expectedClimbingDifficulty: "hard",
    // Also prob link to the route or something fancier
  },
  1: {
    id: "30e14365-af7b-4907-9ff9-c509f4e78286",
    name: "Route B",
    description: "Another route description",
    expectedMiles: 30,
    expectedClimbingDifficulty: "easy",
  },
};

type Event = {
  // An abstract event -- cf. a GroupEvent which is defined below
  id: string;
  title: string;
  meetPlace: Place;
  description: string;
} & (
  | { meetTime: Date; meetTimeDescription?: never }
  | { meetTime?: never; meetTimeDescription: string }
);

export type Ride = Event & {
  weatherForecast: WeatherForecast;
  status: "planned" | "tentative" | "confirmed";
  rideLevel: RideLevel;
  leaders: User[];
  route: Route;
};

export const rides: Record<string, Ride> = {
  0: {
    id: "0b3117e1-4309-4c46-84ad-bd25ecadf708",
    title: "A Mondo Ride",
    meetTime: new Date("2021-05-01 16:30"),
    meetPlace: places["mndot"],
    description: "A ride description",
    weatherForecast: weatherForecasts[0],
    status: "tentative",
    rideLevel: rideLevel["mondo"],
    leaders: [users["alice"], users["bob"]],
    route: routes[0],
  },
  1: {
    id: "284d7258-ad88-454d-b8a6-e09589d0742e",
    title: "A Midi Ride",
    meetTime: new Date("2021-05-01 16:45"),
    meetPlace: places["mndot"],
    weatherForecast: weatherForecasts[0],
    status: "confirmed",
    description: "Another ride description",
    rideLevel: rideLevel["midi"],
    leaders: [users["carol"]],
    route: routes[1],
  },
};

export type Hangout = Event & {};

const hangouts: Record<string, Hangout> = {
  0: {
    id: "e41c27c6-7f10-49d3-9b26-07cf3556f3d6",
    title: "Trivia Night",
    meetTimeDescription: "After the rides",
    description: "Come drink with us!",
    meetPlace: {
      id: "d31473b3-dcdf-42b4-9816-f4b3ae8d9555",
      name: "Tin Whiskers",
    },
  },
};

interface Series {
  id: string;
  name: string;
  description?: string;
}

const series: Record<string, Series> = {
  wednesdayNightRides: {
    id: "5cdc401c-313e-479e-8ec6-5adf84a78027",
    name: "Wednesday Night Rides",
  },
};

export interface GroupEvent {
  id: string;
  title: string;
  series: Series;
  rides: Ride[];
  hangouts: Hangout[];
}

export const groupEvents: Record<string, GroupEvent> = {
  0: {
    id: "951badf6-ab50-41f5-8320-1f4ea1f437d5",
    title: "Wednesday Night Ride",
    series: series["wednesdayNightRides"],
    rides: Object.values(rides),
    hangouts: Object.values(hangouts),
  },
  1: {
    id: "Not 951badf6-ab50-41f5-8320-1f4ea1f437d5",
    title: "A Temporary Copypasta of the Other Event for Illustration",
    series: series["wednesdayNightRides"],
    rides: Object.values(rides),
    hangouts: Object.values(hangouts),
  },
  // TODO: delete the copypasta + more event examples (e.g. Prudhomme)
};

export const groupEventsByYMD = [
  {
    year: 2021,
    months: [
      {
        name: "July",
        dates: [
          {
            date: new Date("2021-07-01"),
            events: [groupEvents[0], groupEvents[1]],
          },
        ],
      },
    ],
  },
];
