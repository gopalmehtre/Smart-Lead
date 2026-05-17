import React, { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900
            transition-all duration-150 cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:cursor-not-allowed disabled:bg-gray-50
            dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100
            ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300"}
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
