import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const FormCol = styled('div')({
  width: '100%',
  
  [`@media ${deviceScreenQuery.small}`]: {
    marginRight: 22,
    flex: 1
  }
});

FormCol.displayName = 'FormCol';

export default FormCol;
