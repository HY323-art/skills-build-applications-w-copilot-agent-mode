import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codeSpaceName && codeSpaceName.trim() !== '') {
    return `https://${codeSpaceName}-8000.app.github.dev`;
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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(getResponseData(payload));
        setError('');
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Unable to load teams right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="mb-3">Teams</h2>

        {loading ? (
          <div className="text-secondary">Loading teams...</div>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team._id || team.id || team.name} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h5 mb-2">{team.name}</h3>
                  <p className="text-secondary mb-2">{team.description}</p>
                  <div className="small text-muted">
                    Members: {Array.isArray(team.members) ? team.members.length : 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
