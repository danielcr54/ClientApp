import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const FormElement = styled('div')({
  marginBottom: 15,

  [`@media ${deviceScreenQuery.small}`]: {
    marginBottom: 22
  }
});

FormElement.displayName = 'FormElement';

export default FormElement;
