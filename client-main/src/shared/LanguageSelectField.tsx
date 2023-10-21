import React from 'react';
import { AdvancedSelectField } from '../shared/AdvancedSelectField';
import languageSelectOptions from './languageList';

export interface LanguageSelectFieldProps {
  name: string;
  label?: string;
  multiple?: boolean;
  placeholder?: string;
}

export function LanguageSelectField({
  name,
  label,
  multiple,
  placeholder
}: LanguageSelectFieldProps) {
  return (
    <AdvancedSelectField
      name={name}
      label={label || (multiple ? 'Languages' : 'Language')}
      multiple={multiple}
      placeholder={placeholder || ''}
      options={languageSelectOptions}
    />
  );
}

export default LanguageSelectField;
