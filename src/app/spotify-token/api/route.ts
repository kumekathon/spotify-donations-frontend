import { cookies } from 'next/headers';
import {getUserAuthOptions} from "@/serverSpotifyUtils";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const url = new URL(request.url);

  // Access query parameters from the URL
  const query = url.searchParams;

  if (!query.has('code')) {
    return new Response('Invalid auth callback data', {
      status: 400,
    });
  }

  const authOptions = getUserAuthOptions(query.get('code')!);


  const response = await fetch(authOptions.url, {
    method: 'POST',
    headers: authOptions.headers,
    body: new URLSearchParams(authOptions.form).toString()
  });

  const responseData = await response.json();
  const token: string = responseData.access_token;
  const expiresIn: string = responseData.expires_in;
  const refreshToken: string = responseData.refresh_token;

  // get user profile to get email and spotify id
  const profileResponse = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!profileResponse.ok) {
    return new Response('Failed to get profile. Maybe auth is invalid.', {
      status: 400,
    });
  }

  const profileResponseData = await profileResponse.json();
  const email = profileResponseData.email;
  const spotifyId = profileResponseData.id;

  return new Response(
    JSON.stringify({
      token: token,
      expiresIn: expiresIn,
      refreshToken: refreshToken,
      email: email,
      spotifyId: spotifyId
    }),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
