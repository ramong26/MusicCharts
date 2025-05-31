export interface YoutubeVideo {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}
export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeVideo[];
}
export interface YoutubeSearchRequest {
  q: string;
  part: string;
  type: string;
  maxResults: number;
  key: string;
}

export interface YoutubeSearchError {
  error: {
    code: number;
    message: string;
    errors: {
      domain: string;
      reason: string;
      message: string;
    }[];
  };
}
export interface YoutubeSearchErrorResponse {
  error: YoutubeSearchError;
}
