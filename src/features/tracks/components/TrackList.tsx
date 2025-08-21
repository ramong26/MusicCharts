import TrackComments from '@/features/playlist/components/TrackComponent';

import { useTrackStore } from '@/stores/trackStrore';

export default function TrackList() {
  // zustand로 앨범 정보 받아옴
  const { album } = useTrackStore();

  if (!album) {
    return <div>앨범 정보가 없습니다.</div>;
  }
  const tracksList = album.tracks.items.map((item) => ({
    track: {
      album,
      artists: item.artists,
      name: item.name,
      id: item.id,
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <TrackComments title={album.name} tracksList={tracksList} className="h-auto" />
    </div>
  );
}

// import TrackComments from '@/features/playlist/components/TrackComponent';

// import { useTrackStore } from '@/stores/trackStrore';

// export default function TrackList() {
//   // zustand로 앨범 정보 받아옴
//   const { album } = useTrackStore();

//   if (!album) {
//     return <div>앨범 정보가 없습니다.</div>;
//   }
//   const tracksList = album.tracks.items.map((item) => ({
//     track: {
//       album,
//       artists: item.artists,
//       name: item.name,
//       id: item.id,
//     },
//   }));

//   return (
//     <div className="flex flex-col gap-4">
//       <TrackComments title={album.name} tracksList={tracksList} className="h-auto" />
//     </div>
//   );
// }
