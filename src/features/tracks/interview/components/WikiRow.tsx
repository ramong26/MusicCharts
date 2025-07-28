import React from 'react';
export default function WikiRow({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <tr className={isLoading ? 'animate-pulse' : ''}>
      <th className="text-left px-4 py-3 font-semibold text-gray-700 border-r-1 border-b border-gray-300 bg-neutral-100 w-1/4 whitespace-nowrap">
        {label}
      </th>
      <td className="px-4 py-3 text-gray-900 border-b border-gray-300">
        {isLoading ? <div className="w-full h-4 bg-gray-300 rounded" /> : value || '정보 없음'}
      </td>
    </tr>
  );
}
