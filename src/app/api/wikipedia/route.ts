import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Use Wikipedia's OpenSearch API to find articles
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'MusicCharts/1.0 (https://github.com/ramong26/MusicCharts)',
      },
    });

    if (!response.ok) {
      // If not found, try a search approach
      if (response.status === 404) {
        const searchApiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json&origin=*`;
        
        const searchResponse = await fetch(searchApiUrl);
        const searchData = await searchResponse.json();
        
        if (searchData[1] && searchData[1].length > 0) {
          const title = searchData[1][0];
          const summaryResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
            {
              headers: {
                'User-Agent': 'MusicCharts/1.0 (https://github.com/ramong26/MusicCharts)',
              },
            }
          );
          
          if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            return NextResponse.json({
              title: summaryData.title,
              description: summaryData.extract,
              url: summaryData.content_urls?.desktop?.page,
              found: true,
            });
          }
        }
        
        return NextResponse.json({
          title: null,
          description: null,
          url: null,
          found: false,
        });
      }
      
      throw new Error(`Wikipedia API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      title: data.title,
      description: data.extract,
      url: data.content_urls?.desktop?.page,
      found: true,
    });
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Wikipedia' },
      { status: 500 }
    );
  }
}