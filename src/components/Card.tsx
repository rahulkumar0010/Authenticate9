import { CardProps } from "../type";

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={`relative sm:max-w-[330px] w-full sm:w-[250px] bg-white border border-gray-200 rounded-md shadow ${className}`}
    >
      {children}
    </div>
  );
}
