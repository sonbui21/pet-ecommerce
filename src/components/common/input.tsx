import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  wrapperClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, required = false, wrapperClassName = "", ...inputProps }) => {
  const placeholder = inputProps.placeholder || label;
  // Calculate approximate position for asterisk (0.6em per character + padding)
  const placeholderLength = placeholder.length;
  const asteriskLeft = required ? `calc(15px + 0.6em * ${placeholderLength})` : undefined;

  return (
    <div className={`floating-input-wrapper ${required ? "required-field" : ""} ${wrapperClassName}`}>
      <label className='floating-label'>
        {label}
        {required && <span className='required-asterisk'>*</span>}
      </label>
      {required && (
        <span className='placeholder-asterisk' style={{ left: asteriskLeft }}>
          *
        </span>
      )}
      <input {...inputProps} placeholder={placeholder} required={required} />
    </div>
  );
};
