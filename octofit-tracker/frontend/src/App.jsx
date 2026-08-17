import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">Octofit Tracker</p>
            <h1 className="mb-0">Fitness data dashboard</h1>
          </div>
          <div className="badge bg-success-subtle text-success-emphasis border border-success-subtle rounded-pill px-3 py-2">
            Multi-tier app
          </div>
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap mb-4 gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : 'text-primary'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <section className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="mb-3">Overview</h2>
                <p className="mb-3 text-secondary">
                  This presentation tier connects to the Octofit backend and surfaces user,
                  activity, team, leaderboard, and workout data from the MongoDB-backed API.
                </p>
                <div className="alert alert-warning small mb-3">
                  Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces API URL, or leave it unset to fall back to <code>{apiBaseUrl}</code>.
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="border rounded p-3 h-100">
                      <div className="text-muted small">Users</div>
                      <div className="fs-3 fw-bold">Live</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded p-3 h-100">
                      <div className="text-muted small">Activities</div>
                      <div className="fs-3 fw-bold">Live</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded p-3 h-100">
                      <div className="text-muted small">Workouts</div>
                      <div className="fs-3 fw-bold">Live</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
