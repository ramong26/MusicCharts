# Wikipedia API Integration for Album Descriptions

## Overview
This feature integrates Wikipedia API to provide album descriptions in the MusicCharts application.

## Implementation

### API Route
- **Path**: `/api/wikipedia`
- **Method**: GET
- **Parameters**: `query` (string) - Search term for Wikipedia
- **Returns**: 
  ```typescript
  {
    title: string | null;
    description: string | null;
    url: string | null;
    found: boolean;
  }
  ```

### Hook
- **File**: `src/features/tracks/hooks/getAlbumDescription.ts`
- **Function**: `getAlbumDescription(album: Album, artists: Artist[])`
- **Features**:
  - Multiple search query strategies
  - Error handling
  - Fallback search methods

### Component Updates
- **File**: `src/features/tracks/components/TrackDescription.tsx`
- **Changes**:
  - Added Wikipedia description display
  - Loading state management
  - Error handling for missing data
  - Link to Wikipedia page

### Search Strategy
The integration tries multiple search queries in order:
1. `{album name} {artist names} album`
2. `{album name} album`
3. `{album name} {artist names}`

## Usage
The Wikipedia description is automatically fetched and displayed when viewing a track page. The component shows:
- Loading state while fetching
- Album description from Wikipedia
- Link to the full Wikipedia article
- Fallback message if no description is found

## Testing
Test page available at `/wikipedia-test` with mock data for "Abbey Road" by The Beatles.