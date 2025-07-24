export default function WikiRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr className="even:bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-default align-top">
      <th className="text-left px-4 py-3 font-semibold text-gray-700 border-r-1 border-b border-gray-300 bg-neutral-100 w-1/4 whitespace-nowrap">
        {label}
      </th>
      <td className="px-4 py-3 text-gray-900 border-b border-gray-300">{value || '정보 없음'}</td>
    </tr>
  );
}
