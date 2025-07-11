import React from 'react';

interface HighlightToggleProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HighlightToggle: React.FC<HighlightToggleProps> = ({
  checked,
  onChange,
}) => (
  <label className="flex items-center gap-2 text-base">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="accent-yellow-400 cursor-pointer w-6 h-6 min-w-6 min-h-6"
    />
    Highlight search term
  </label>
);

export default HighlightToggle;
