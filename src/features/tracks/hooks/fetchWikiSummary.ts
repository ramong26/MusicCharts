export async function fetchWikiSummary(title: string): Promise<string> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    if (!response.ok) throw new Error('Summary not found');
    const data = await response.json();
    return data.extract || 'No summary available';
  } catch (e) {
    console.error('Error fetching wiki summary:', e);
    return 'No summary available';
  }
}

export async function getTopWikiTitle(query: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    const topResult = data.query?.search?.[0];
    return topResult ? topResult.title : null;
  } catch (e) {
    console.error('Error fetching top wiki title:', e);
    return null;
  }
}

// export async function fetchWikiSummary(title: string): Promise<string> {
//   try {
//     const response = await fetch(
//       `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
//         title
//       )}`
//     );
//     if (!response.ok) throw new Error('Summary not found');
//     const data = await response.json();
//     return data.extract || 'No summary available';
//   } catch (e) {
//     console.error('Error fetching wiki summary:', e);
//     return 'No summary available';
//   }
// }

// export async function getTopWikiTitle(query: string): Promise<string | null> {
//   try {
//     const response = await fetch(
//       `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${encodeURIComponent(
//         query
//       )}`
//     );
//     const data = await response.json();
//     const topResult = data.query?.search?.[0];
//     return topResult ? topResult.title : null;
//   } catch (e) {
//     console.error('Error fetching top wiki title:', e);
//     return null;
//   }
// }
