import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;
  const safeCodeSpaceName = typeof codeSpaceName === 'string' ? codeSpaceName.trim() : '';

  if (safeCodeSpaceName) {
    return `https://${safeCodeSpaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getResponseData = (payload) => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload.data)) return payload.data;

  if (payload.results && Array.isArray(payload.results)) return payload.results;

  return [];
};

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setLeaderboard(getResponseData(payload));
        setError('');
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Unable to load leaderboard right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="mb-3">Leaderboard</h2>

        {loading ? (
          <div className="text-secondary">Loading leaderboard...</div>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry._id || entry.id || `${entry.userId}-${entry.rank}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.userId}</td>
                    <td>{entry.teamId}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
