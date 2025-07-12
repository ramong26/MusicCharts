export interface CustomSearchResult {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  cacheId?: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: {
    [key: string]: any;
  };
  mime?: string;
  fileFormat?: string;
  image?: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
  labels?: Label[];
}

export interface Label {
  name: string;
  displayName: string;
  label_with_op: string;
}

// export interface RSSInterviewResult {
//   title: string;
//   link: string;
//   source: string;
//   pubDate: string;
//   snippet: string;
// }
