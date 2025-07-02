"use client";

interface SubmitInputProps {
  className?: string;
  onSubmit?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
}

export default function SubmitInput({
  className,
  onSubmit,
  placeholder,
  onChange,
  value,
}: SubmitInputProps) {
  return (
    <div
      className={`${className} w-full border-2  border-black p-2  cursor-pointer hover:bg-gray-100 transition`}
    >
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) {
            onSubmit(e.currentTarget.value);
          }
        }}
        value={value}
        className="w-full outline-none"
      />
    </div>
  );
}
