interface User {
  displayName: string;
}

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

function Home() {
  return (
    <>
      <h2>Announcements</h2>

      <h2>Upcoming Rides</h2>
    </>
  );
}

function About() {
  return <>Cap U is such and such...</>;
}

function App() {
  const user = { displayName: "Test User" };

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
