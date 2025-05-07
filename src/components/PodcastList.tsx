import { useState, useEffect } from 'react';
import { fetchPodcasts, type Podcast } from '../services/api';
import './PodcastList.css';

export default function PodcastList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPodcasts() {
      try {
        setLoading(true);
        const data = await fetchPodcasts();
        setPodcasts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch podcasts:', err);
        setError('Failed to load podcasts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  if (loading) {
    return <div className="loading">Loading podcasts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (podcasts.length === 0) {
    return <div className="empty">No podcasts found.</div>;
  }

  return (
    <div className="podcast-list">
      <h2>Available Podcasts</h2>
      <div className="podcast-grid">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            <div className="podcast-image">
              {podcast.cover_image_url ? (
                <img src={podcast.cover_image_url} alt={podcast.title} />
              ) : (
                <div className="placeholder-image">🎙️</div>
              )}
            </div>
            <div className="podcast-info">
              <h3>{podcast.title}</h3>
              <p className="podcast-author">By {podcast.author_name}</p>
              <p className="podcast-description">
                {podcast.description.length > 100
                  ? `${podcast.description.substring(0, 100)}...`
                  : podcast.description}
              </p>
              <a href={`/podcast/${podcast.id}`} className="podcast-link">
                View Episodes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
