import { InputProps } from "../type";

export default function Input({
  value,
  onChange,
  className = "",
  ...rest
}: InputProps) {
  return (
    <input
      type="email"
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 outline-none block w-full p-1 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}
