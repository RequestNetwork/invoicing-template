import { useState } from "react";

interface DropdownProps {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
}

const Dropdown = ({ title, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDividerButton"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          !outlined
            ? "bg-green hover:bg-dark-green text-white"
            : "bg-transparent text-dark-green border-dark-green border-[1px] hover:border-green hover:text-green"
        }   focus:ring-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[28px] py-[8px] text-center inline-flex items-center`}
        type="button"
      >
        {title}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownDivider"
          style={{ left: "50%", transform: "translateX(-50%)" }}
          className="z-10 w-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2"
        >
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="dropdownDividerButton"
          >
            {items?.map((item, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                <a
                  target="_blank"
                  href={item.href}
                  rel="noreferrer noopener"
                  className="block px-4 py-2 hover:bg-gray-100 "
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
