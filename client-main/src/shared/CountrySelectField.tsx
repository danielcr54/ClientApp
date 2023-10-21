import React from 'react';
import { AdvancedSelectField } from '../shared/AdvancedSelectField';
import countrySelectOptions from './countryList';

export interface CountrySelectFieldProps {
  name: string;
  label?: string;
  multiple?: boolean;
  placeholder?: string;
}

export function CountrySelectField({
  name,
  label,
  multiple,
  placeholder
}: CountrySelectFieldProps) {
  return (
    <AdvancedSelectField
      name={name}
      label={label || 'Location'}
      multiple={multiple}
      placeholder={placeholder || ''}
      options={countrySelectOptions}
    />
  );
}

export default CountrySelectField;
