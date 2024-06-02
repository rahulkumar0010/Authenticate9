import { ButtonProps } from "../type";

export default function Button({
  value,
  onClick,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`float-end text-white bg-[#f33f40] hover:bg-[#f75a4f] font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ${className}`}
      onClick={onClick}
      {...rest}
    >
      {value}
    </button>
  );
}
