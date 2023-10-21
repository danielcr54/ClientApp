import styled from '@emotion/styled';

export interface FieldLabelProps {
  size?: number;
  small?: boolean;
}

export const FieldLabel = styled('label')(
  ({ size, small }: FieldLabelProps) => ({
    display: 'block',
    marginBottom: 8,
    fontSize: size ? size : small ? 11 : 13
  })
);

FieldLabel.displayName = 'FieldLabel';
