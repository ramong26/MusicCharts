export async function postTrack({ trackId, features }: { trackId: string; features: any }) {
  try {
    const response = await fetch('/api/profile/track-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId, features }),
    });

    if (!response.ok) {
      throw new Error('Failed to post track');
    }

    console.log('Track posted successfully');
  } catch (error) {
    console.error('Error posting track:', error);
  }
}
