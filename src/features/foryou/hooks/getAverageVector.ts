interface AudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
}

export function getAverageVector(features: AudioFeatures[]): AudioFeatures {
  const total = features.reduce(
    (acc, feature) => ({
      danceability: acc.danceability + feature.danceability,
      energy: acc.energy + feature.energy,
      valence: acc.valence + feature.valence,
      tempo: acc.tempo + feature.tempo,
      acousticness: acc.acousticness + feature.acousticness,
      instrumentalness: acc.instrumentalness + feature.instrumentalness,
      liveness: acc.liveness + feature.liveness,
      speechiness: acc.speechiness + feature.speechiness,
    }),
    {
      danceability: 0,
      energy: 0,
      valence: 0,
      tempo: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      speechiness: 0,
    }
  );

  const count = features.length;
  return {
    danceability: total.danceability / count,
    energy: total.energy / count,
    valence: total.valence / count,
    tempo: total.tempo / count,
    acousticness: total.acousticness / count,
    instrumentalness: total.instrumentalness / count,
    liveness: total.liveness / count,
    speechiness: total.speechiness / count,
  };
}
