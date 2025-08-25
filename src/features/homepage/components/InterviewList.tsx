import Link from 'next/link';

import { searchInterviews } from '@/shared/hooks/searchInterviews';

import { formatDate } from '@/lib/utils/date';

export default async function InterviewList({
  artistName,
  className = '',
  slice = 5,
}: {
  artistName?: string;
  className?: string;
  slice?: number;
}) {
  const LATEST_INTERVIEWS_QUERY = `${artistName} artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`;
  const interviews = await searchInterviews(LATEST_INTERVIEWS_QUERY);

  const sortedInterviews = interviews
    .filter(
      (interview) =>
        typeof interview.pagemap?.metatags?.[0]?.['article:published_time'] === 'string'
    )
    .sort((a, b) => {
      const dateA = new Date(a.pagemap?.metatags?.[0]?.['article:published_time'] ?? '').getTime();
      const dateB = new Date(b.pagemap?.metatags?.[0]?.['article:published_time'] ?? '').getTime();
      return dateB - dateA;
    });

  return (
    <div className={`pt-3 px-3  border-3 border-black ${className}`}>
      <h1 className="text-4xl font-extrabold mb-3 text-black text-center">Latest Interviews</h1>
      <ul>
        {sortedInterviews.slice(0, slice).map((interview) => (
          <li key={interview.link} className="p-4  border-t border-black truncate">
            <Link
              href={interview.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-indigo-800 w-full hover:underline text-xl truncate"
            >
              {interview.pagemap?.metatags?.[0]?.['og:title'] || interview.title}
            </Link>

            {typeof interview.pagemap?.metatags?.[0]?.['article:published_time'] === 'string' &&
              interview.pagemap.metatags[0]['article:published_time'].trim() && (
                <p className="text-gray-600 mt-1">
                  {formatDate(interview.pagemap.metatags[0]['article:published_time'])}
                </p>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
