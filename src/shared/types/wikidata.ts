export interface WikidataSearchResponse {
  search: { id: string }[];
}

export interface WikidataEntityData {
  entities: {
    [id: string]: {
      claims?: {
        [property: string]: Claim[];
      };
    };
  };
}

export interface Claim {
  mainsnak: {
    datavalue?: {
      value?: {
        id?: string;
        time?: string;
      };
    };
  };
}
