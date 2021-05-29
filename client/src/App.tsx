import {
  User,
  Announcement,
  Ride,
  Hangout,
  GroupEvent,
  announcements,
  groupEventsByYMD,
} from "./api";

interface NavProps {
  user: User | null;
}
function Nav({ user }: NavProps) {
  return (
    <nav>
      <a href="#!" className="text-blue-200">
        [Cap U logo]
      </a>
      <ul>
        <li>
          <a href="#!">A link</a>
        </li>
        <li>
          <a href="#!">Another link</a>
        </li>
      </ul>

      {user ? (
        <>
          {user.displayName}
          <button>Sign out</button>
        </>
      ) : (
        <>
          <button>Sign in</button>
        </>
      )}
    </nav>
  );
}

interface AnnouncementViewProps {
  announcement: Announcement;
}
function AnnouncementView({ announcement }: AnnouncementViewProps) {
  return (
    <>
      <div>{announcement.title}</div>
      <div>
        Submitted {announcement.submittedAt.toLocaleString()} by{" "}
        {announcement.submittedBy.displayName}
      </div>

      <div>{announcement.body}</div>
    </>
  );
}

function AnnouncementList() {
  return (
    <ul>
      {Object.values(announcements).map((a) => (
        <li key={a.id}>
          <AnnouncementView announcement={a} />
        </li>
      ))}
    </ul>
  );
}

// NOTE: These groupEvents/rides/hangouts are all /planned/ ones -- they'll have to
//       be distinguished from their (possibly non-existant) actuals at some
//       point.

interface RideViewProps {
  ride: Ride;
}
function RideView({ ride }: RideViewProps) {
  return (
    <>
      <div>
        {ride.group.name}: {ride.title}
      </div>
      <div>
        {ride.meetTime?.toLocaleString() || ride.meetTimeDescription} at{" "}
        {ride.meetPlace.name}
      </div>

      <p>{ride.description}</p>

      <dl>
        <dt>Status:</dt>
        <dd>{ride.status}</dd>

        <dt>Route:</dt>
        <dd>
          <div>{ride.route.name}</div>
          <div>{ride.route.description}</div>
          <dl>
            <dt>Expected distance:</dt>
            <dd>(about {ride.route.expectedMiles} miles)</dd>

            <dt>Expected Climbing difficulty:</dt>
            <dd>{ride.route.expectedClimbingDifficulty}</dd>
          </dl>
        </dd>

        <dt>Ride leaders:</dt>
        <dd>
          <ul>
            {ride.leaders.map((u) => (
              <li key={u.id}>{u.displayName}</li>
            ))}
          </ul>
        </dd>
      </dl>
    </>
  );
}

interface RideListProps {
  rides: Ride[];
}
function RideList({ rides }: RideListProps) {
  return (
    <ul>
      {rides.map((r) => (
        <li key={r.id}>
          <RideView ride={r} />
        </li>
      ))}
    </ul>
  );
}

interface HangoutViewProps {
  hangout: Hangout;
}
function HangoutView({ hangout }: HangoutViewProps) {
  return (
    <>
      <div>{hangout.title}</div>
      <div>
        {hangout.meetTime?.toLocaleString() || hangout.meetTimeDescription} at{" "}
        {hangout.meetPlace.name}
      </div>

      <p>{hangout.description}</p>
    </>
  );
}

interface HangoutListProps {
  hangouts: Hangout[];
}

function HangoutsList({ hangouts }: HangoutListProps) {
  return (
    <ul>
      {hangouts.map((h) => (
        <li key={h.id}>
          <HangoutView hangout={h} />
        </li>
      ))}
    </ul>
  );
}

interface GroupEventViewProps {
  groupEvent: GroupEvent;
}
function GroupEventView({ groupEvent }: GroupEventViewProps) {
  return (
    <>
      <div>{groupEvent.title}</div>

      <dl>
        <dt>Event series:</dt>
        <dd>{groupEvent.series.name}</dd>
      </dl>

      <dl>
        <dt>Event Rides: </dt>
        <dd>
          <RideList rides={groupEvent.rides} />
        </dd>

        <dt>Event Hangouts: </dt>
        <dd>
          <HangoutsList hangouts={groupEvent.hangouts} />
        </dd>
      </dl>
    </>
  );
}

interface GroupEventListProps {
  groupEvents: GroupEvent[];
}
function GroupEventList({ groupEvents }: GroupEventListProps) {
  return (
    <ul>
      {Object.values(groupEvents).map((e) => (
        <li key={e.id}>
          <GroupEventView groupEvent={e} />
        </li>
      ))}
    </ul>
  );
}

function GroupEventCalendar() {
  return (
    <ul>
      {groupEventsByYMD.map((y) => (
        <li key={y.year}>
          {y.year}
          <ul>
            {y.months.map((m) => (
              <li key={m.name}>
                {m.name}
                <ul>
                  {m.dates.map((d) => (
                    <li key={d.date.toISOString()}>
                      {d.date.toLocaleDateString()}
                      <GroupEventList groupEvents={d.events} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function Home() {
  return (
    <>
      <h2>Announcements</h2>
      <AnnouncementList />

      <h2>Event Calendar</h2>
      <GroupEventCalendar />
    </>
  );
}

function About() {
  return <>Cap U is such and such...</>;
}

function App() {
  const user = { id: "asdf", displayName: "Test User" };

  return (
    <>
      <Nav user={user} />

      <h1>Home Page</h1>
      <Home />

      <h1>About Page</h1>
      <About />
    </>
  );
}

export default App;

