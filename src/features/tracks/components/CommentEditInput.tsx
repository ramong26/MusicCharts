'use client';
import { useState } from 'react';

interface Props {
  initialValue: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export default function CommentEditInput({
  initialValue,
  onSave,
  onCancel,
}: Props) {
  const [text, setText] = useState(initialValue);

  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-1 rounded flex-1"
      />
      <button
        onClick={() => onSave(text)}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        저장
      </button>
      <button
        onClick={onCancel}
        className="text-gray-500 hover:underline cursor-pointer"
      >
        취소
      </button>
    </div>
  );
}
