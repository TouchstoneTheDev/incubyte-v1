import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSweetStore } from '../store/sweetStore';
import { SweetCard } from '../components/SweetCard';
import { SweetForm } from '../components/SweetForm';
import { SearchBar } from '../components/SearchBar';
import './Dashboard.css';

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { sweets, loading, error, fetchSweets } = useSweetStore();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>🍬 Sweet Shop Management</h1>
              <p>Welcome, {user?.name}!</p>
            </div>
            <div className="header-actions">
              <span className="user-role">{user?.role === 'admin' ? '👑 Admin' : '👤 User'}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-controls">
            <SearchBar />
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn btn-success"
              >
                {showAddForm ? '✕ Cancel' : '+ Add New Sweet'}
              </button>
            )}
          </div>

          {showAddForm && isAdmin && (
            <div className="add-form-container">
              <SweetForm onClose={() => setShowAddForm(false)} />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading sweets...</div>
          ) : sweets.length === 0 ? (
            <div className="empty-state">
              <h2>No sweets available</h2>
              <p>
                {isAdmin
                  ? 'Click "Add New Sweet" to add your first sweet!'
                  : 'Check back later for new sweets.'}
              </p>
            </div>
          ) : (
            <div className="sweets-grid">
              {sweets.map((sweet) => (
                <SweetCard key={sweet.id} sweet={sweet} isAdmin={isAdmin} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
