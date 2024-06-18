import {SpotifyAuthOptions, SpotifyAuthTokenResponse} from "@/spotifyTypes";

export function getUserAuthOptions(code: string): SpotifyAuthOptions {
  return {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL!,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(process.env.NEXT_PUBLIC_CLIENT_APP_ID! + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    json: true
  };

}