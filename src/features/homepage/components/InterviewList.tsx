import Link from 'next/link';

import { CustomSearchResult } from '@/features/tracks/types/custom-search';
import { formatDate } from '@/lib/utils/date';

export default async function InterviewList({
  interviews,
  className = '',
  slice = 5,
}: {
  interviews: CustomSearchResult[];
  className?: string;
  slice?: number;
}) {
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
      <h1 className="text-4xl font-extrabold mb-6 text-black text-center">Latest Interviews</h1>
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
