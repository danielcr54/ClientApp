import React, {FocusEvent} from 'react';
import { CheckBar, CheckBarChangeData } from './CheckBar';

function isValueSelected(value: any | any[], itemValue: any, multi?: boolean) {
  return value && Array.isArray(value)
    ? value.some(i => i === itemValue)
    : value === itemValue;
}

function addValue(value: any | any[], itemValue: any, multi?: boolean) {
  if (!multi) return itemValue;
  const _value = Array.isArray(value) ? value : [];
  return [..._value, itemValue];
}

function removeValue(value: any | any[], itemValue: any, multi?: boolean) {
  if (!multi || !Array.isArray(value)) return void 0;
  return value.filter(i => i !== itemValue);
}

export interface CheckBarSelectOption {
  value: any;
  label: string;
}

export interface CheckBarSelectProps<TValue> {
  options?: CheckBarSelectOption[];
  multi?: boolean;
  value?: TValue;
  onChange?: (value?: TValue) => void;
  onFocus?: <T>(event?: FocusEvent<T> | undefined) => void;
  onBlur?: <T>(event?: FocusEvent<T> | undefined) => void;
  readonly?: boolean;
  disabled?: boolean;
  small?: boolean;
  xsmall?: boolean;
}

export function CheckBarSelect<TValue = any>({
  options,
  multi,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
  readonly,
  ...itemProps
}: CheckBarSelectProps<TValue>) {
  if (!options) return null;

  function handleItemChange(data: CheckBarChangeData) {
    if (readonly || disabled) return;

    const newValue = data.selected
      ? addValue(value, data.value, multi)
      : removeValue(value, data.value, multi);

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  }

  return (
    <div onFocus={onFocus} onBlur={onBlur}>
      {options.map(option => (
        <CheckBar
          key={option.value}
          {...itemProps}
          selected={isValueSelected(value, option.value)}
          readonly={readonly}
          disabled={disabled}
          value={option.value}
          onChange={handleItemChange}
        >
          {option.label}
        </CheckBar>
      ))}
    </div>
  );
}
