import * as React from 'react';

export type DropdownItem = {
  value: string;
  name: string;
};

export type DropdownProps = {
  label: string;
  items: ReadonlyArray<DropdownItem>;
  selectedValue: string;
  onChange: (value: string) => void;
};

export function Dropdown(props: DropdownProps) {
  const uniqueId = 'slide-selector';

  return (
    <div>
      <label id={uniqueId}>{props.label}</label>
      <select
        aria-labelledby={uniqueId}
        onChange={(event) => props.onChange(event.target.value)}
        value={props.selectedValue}
      >
        {props.items.map((item) => (
          <option value={item.value} key={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
