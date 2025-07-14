'use client';

import { Album, Artist } from '@/shared/types/SpotifyTrack';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import getAlbumDescription, { WikipediaResponse } from '../hooks/getAlbumDescription';

interface TrackDescriptionProps {
  album: Album;
  artists: Artist[];
}

export default function TrackDescription({ album, artists }: TrackDescriptionProps) {
  const [wikipediaData, setWikipediaData] = useState<WikipediaResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescription = async () => {
      setLoading(true);
      try {
        const data = await getAlbumDescription(album, artists);
        setWikipediaData(data);
      } catch (error) {
        console.error('Failed to fetch album description:', error);
        setWikipediaData({
          title: null,
          description: null,
          url: null,
          found: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [album.id, album.name, artists]);

  console.log('Album:', album);
  console.log('Wikipedia data:', wikipediaData);

  return (
    <div>
      <div className="flex gap-10">
        <Image
          src={album.images[0].url}
          alt={album.name}
          width={400}
          height={400}
        />
        <div>
          <div className="flex gap-2 items-center">
            <div>앨범이름: {album.name}</div>
            <div className="flex items-center justify-between">
              <div>공유</div>
              <div>카카오톡공유</div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">설명</h3>
            {loading ? (
              <p className="text-gray-500">앨범 설명을 불러오는 중...</p>
            ) : wikipediaData?.found && wikipediaData.description ? (
              <div>
                <p className="text-sm text-gray-700 mb-2">{wikipediaData.description}</p>
                {wikipediaData.url && (
                  <a
                    href={wikipediaData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs hover:underline"
                  >
                    위키피디아에서 더 보기
                  </a>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">이 앨범에 대한 설명을 찾을 수 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
