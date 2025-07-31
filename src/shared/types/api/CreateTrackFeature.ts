export interface CreateTrackFeature {
  isLogin: boolean;
  trackId: string;
  features: CreateTrackFeatureBody;
}

export interface CreateTrackFeatureBody {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  duration_ms: number;
}
