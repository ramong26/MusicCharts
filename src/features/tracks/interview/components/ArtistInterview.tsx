import ArtistInterviewComponent from '@/features/tracks/interview/components/ArtistInterviewComponent'

import { Artist } from "@/shared/types/SpotifyTrack";

import {getCombinedInterviews} from '@/shared/hooks/searchInterviews';
export default async function ArtistInterview({ artist }: { artist: Artist | null }) {

  const artistInterview = await getCombinedInterviews(artist?.name || '');

  console.log('Artist interview data:', artistInterview);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">해당 아티스트 관련 인터뷰</h1>
      {artistInterview.length>0 && artistInterview.map ((interview) => (
        <ArtistInterviewComponent key={interview.link} artistInterview={interview} />
      ))}
    </div>
  );
}
