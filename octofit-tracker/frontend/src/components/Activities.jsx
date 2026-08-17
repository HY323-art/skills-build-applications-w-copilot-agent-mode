import { useEffect, useState } from 'react';

const getApiUrl = (endpoint) => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;
  const safeCodeSpaceName = typeof codeSpaceName === 'string' ? codeSpaceName.trim() : '';

  if (safeCodeSpaceName) {
    return `https://${safeCodeSpaceName}-8000.app.github.dev${endpoint}`;
  }

  return `http://localhost:8000${endpoint}`;
};

const getResponseData = (payload) => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.docs)) return payload.docs;

  return [];
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('/api/activities/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(getResponseData(payload));
        setError('');
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Unable to load activities right now.');
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="mb-3">Activities</h2>

        {loading ? (
          <div className="text-secondary">Loading activities...</div>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id || activity.type}>
                    <td>{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.distance ?? '—'} {activity.distance ? 'mi' : ''}</td>
                    <td>{activity.calories ?? '—'}</td>
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

export default Activities;
