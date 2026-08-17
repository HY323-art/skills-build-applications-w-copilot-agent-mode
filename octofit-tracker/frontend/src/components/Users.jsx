import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;
  const safeCodeSpaceName = typeof codeSpaceName === 'string' ? codeSpaceName.trim() : '';

  if (safeCodeSpaceName) {
    return `https://${safeCodeSpaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const apiUrl = `${getApiBaseUrl()}/api/users/`;

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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(getResponseData(payload));
        setError('');
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Unable to load users right now.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="mb-3">Users</h2>

        {loading ? (
          <div className="text-secondary">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id || `${user.username}-${user.email}`}>
                    <td>{user.username}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
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

export default Users;
