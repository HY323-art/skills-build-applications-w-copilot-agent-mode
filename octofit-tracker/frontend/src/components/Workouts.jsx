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
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.docs)) return payload.docs;

  return [];
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(getResponseData(payload));
        setError('');
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError('Unable to load workouts right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="mb-3">Workouts</h2>

        {loading ? (
          <div className="text-secondary">Loading workouts...</div>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout._id || workout.id || workout.name} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5 mb-0">{workout.name}</h3>
                    <span className="badge bg-info-subtle text-info-emphasis">{workout.difficulty}</span>
                  </div>
                  <p className="text-secondary">{workout.description}</p>
                  <ul className="mb-0 ps-3">
                    {(workout.exercises || []).map((exercise, index) => (
                      <li key={`${workout.name}-${exercise.name || index}`}>
                        {exercise.name} — {exercise.sets} sets × {exercise.reps} reps
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
