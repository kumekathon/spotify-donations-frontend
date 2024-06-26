export type SpotifyAuthTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};


export type SpotifyAuthOptions = {
  url: string;
  form: {
    code: string;
    redirect_uri: string;
    grant_type: string;
  };
  headers: {
    'content-type': string;
    'Authorization': string;
  };
  json: boolean;
};


export type SpotifyProfileResponse = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};
