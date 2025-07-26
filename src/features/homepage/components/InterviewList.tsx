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
    <div className={`pt-6 px-6  border-2 border-black ${className}`}>
      <h1 className="text-2xl font-semibold mb-6 text-slate-700 text-center">Latest Interviews</h1>
      <ul>
        {sortedInterviews.slice(0, slice).map((interview) => (
          <li key={interview.link} className="p-4  border-t border-black">
            <Link
              href={interview.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-indigo-800 hover:underline font-medium text-lg"
            >
              {interview.title}
            </Link>

            {typeof interview.pagemap?.metatags?.[0]?.['article:published_time'] === 'string' &&
              interview.pagemap.metatags[0]['article:published_time'].trim() && (
                <p className="text-gray-600 mt-2">
                  {formatDate(interview.pagemap.metatags[0]['article:published_time'])}
                </p>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
