export interface YouTubeItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    description: string;
    publishedAt: string;
  };
}

export interface YouTubeChannel {
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords: string;
      country: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
  etag: string;
  id: string;
  kind: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  updatedAt: number;
  handle: string;
}
