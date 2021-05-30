import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory, useLocation, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as api from "./api";

interface NavProps {
  user: api.User | null;
}
function Nav({ user }: NavProps) {
  return (
    <nav>
      <Link to="/" className="text-blue-200">
        [Cap U logo]
      </Link>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
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

interface AnnouncementProps {
  announcement: api.Announcement;
}
function Announcement({ announcement }: AnnouncementProps) {
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
      {Object.values(api.announcements).map((a) => (
        <li key={a.id}>
          <Announcement announcement={a} />
        </li>
      ))}
    </ul>
  );
}

// NOTE: These groupEvents/rides/hangouts are all /planned/ ones -- they'll have to
//       be distinguished from their (possibly non-existant) actuals at some
//       point.

interface RideProps {
  ride: api.Ride;
}
function Ride({ ride }: RideProps) {
  return (
    <>
      <div>
        {ride.rideLevel.name}: {ride.title}
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
  rides: api.Ride[];
}
function RideList({ rides }: RideListProps) {
  return (
    <ul>
      {rides.map((r) => (
        <li key={r.id}>
          <Ride ride={r} />
        </li>
      ))}
    </ul>
  );
}

interface HangoutProps {
  hangout: api.Hangout;
}
function Hangout({ hangout }: HangoutProps) {
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
  hangouts: api.Hangout[];
}
function HangoutList({ hangouts }: HangoutListProps) {
  return (
    <ul>
      {hangouts.map((h) => (
        <li key={h.id}>
          <Hangout hangout={h} />
        </li>
      ))}
    </ul>
  );
}

interface GroupEventProps {
  groupEvent: api.GroupEvent;
}
function GroupEvent({ groupEvent }: GroupEventProps) {
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
          <HangoutList hangouts={groupEvent.hangouts} />
        </dd>
      </dl>
    </>
  );
}

interface GroupEventListProps {
  groupEvents: api.GroupEvent[];
}
function GroupEventList({ groupEvents }: GroupEventListProps) {
  return (
    <ul>
      {Object.values(groupEvents).map((e) => (
        <li key={e.id}>
          <GroupEvent groupEvent={e} />
        </li>
      ))}
    </ul>
  );
}

function GroupEventCalendar() {
  const history = useHistory();
  return (
    <FullCalendar
      plugins={[listPlugin, dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "listMonth,dayGridMonth",
      }}
      initialView="listMonth"
      events={Object.values(api.rides).map((r) => ({
        ...r,
        start: r.meetTime,
      }))}
      eventContent={(eventContent) => (
        <>
          <b>{eventContent.timeText}</b>
          {eventContent.event.title} (
          {eventContent.event.extendedProps.rideLevel.name})
        </>
      )}
      eventClick={(clickInfo) => history.push("/rides/" + clickInfo.event.id)}
    />
  );
}

function GroupEventCalendarFirstDraft() {
  return (
    <ul>
      {api.groupEventsByYMD.map((y) => (
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
      <h2>Upcoming events</h2>
      [Some abbreviated version of the event calendar]
    </>
  );
}

function About() {
  return <>Cap U is such and such...</>;
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function App() {
  const user = { id: "asdf", displayName: "Test User" };

  const RideRoute = () => {
    const { id } = useParams<{ id: string }>();
    const ride = Object.values(api.rides).find((r) => r.id === id);
    return ride ? <Ride ride={ride} /> : <NoMatch />;
  };

  return (
    <Router>
      <Nav user={user} />

      <Switch>
        <Route exact path="/">
          <Home />
          <h2>First Draft of Calendar</h2>
          <GroupEventCalendarFirstDraft />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/calendar">
          <GroupEventCalendar />
        </Route>

        <Route path="/rides/:id">
          <RideRoute />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
