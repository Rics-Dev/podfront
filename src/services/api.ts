const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  cover_image_url: string;
  author_id: number;
  author_name: string;
  created_at: string;
}

export interface Episode {
  id: number;
  podcast_id: number;
  title: string;
  description: string;
  audio_url: string;
  duration: number;
  published_at: string;
}

export interface PodcastDetails extends Podcast {
  episodes: Episode[];
}

// Fetch all podcasts
export async function fetchPodcasts(): Promise<Podcast[]> {
  try {
    const response = await fetch(`${API_URL}/api/podcasts`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const { success, data } = await response.json();
    
    if (!success) {
      throw new Error('Failed to fetch podcasts');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
}

// Fetch a single podcast with its episodes
export async function fetchPodcastDetails(id: number): Promise<PodcastDetails> {
  try {
    const response = await fetch(`${API_URL}/api/podcasts/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const { success, data } = await response.json();
    
    if (!success) {
      throw new Error('Failed to fetch podcast details');
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching podcast with ID ${id}:`, error);
    throw error;
  }
}
