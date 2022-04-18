import { ChangeEvent, FC } from "react";

interface InputGroupProps {
  type: string;
  placeholder: string;
  value: string;
  error?: string | undefined | null;
  setValue: (
    name: string
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputGroup: FC<InputGroupProps> = ({
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <>
      <input
        type={type}
        className="w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white"
        placeholder={placeholder}
        value={value}
        onChange={setValue(type)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </>
  );
};

export default InputGroup;
