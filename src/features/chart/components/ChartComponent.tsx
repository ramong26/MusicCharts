import Image from "next/image";
import { TrackItem } from "@/shared/types/SpotifyTrack";

interface ChartComponentProps {
  tracksList: TrackItem[];
  title: string;
  className?: string;
}

export default function ChartComponent({
  tracksList,
  title,
  className = "",
}: ChartComponentProps) {
  return (
    <div
      className={`relative border-3 border-black p-5 mt-10  bg-white w-full ${className}`}
    >
      <h2 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl">
        {title}
      </h2>
      {tracksList.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 mb-4 border-b-1 border-black pb-4 cursor-pointer hover:bg-gray-100 transition w-[450px] last:border-b-0 last:pb-0 last:mb-0"
        >
          <div className="flex items-center gap-4">
            <div className="font-bold text-3xl w-[30px]">{index + 1}</div>
            <Image
              src={item.track.album.images[0].url}
              alt={item.track.name}
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col overflow-hidden w-[300px] ">
            <div className="font-bold text-xl break-words max-w-xs">
              {item.track.name}
            </div>
            <div className=" max-w-md text-gray-600 break-words">
              {item.track.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
