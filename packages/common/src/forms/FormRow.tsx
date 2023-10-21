import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const FormRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',

  // TODO: To account for any container paddings,
  // this needs to be reconsidered. Accounting for
  // the screen width only isn't reliable, as it might
  // still be positioned to the rightmost in which case
  // this negative margin causes the horizontal scrollbar
  [`@media ${deviceScreenQuery.small}`]: {
    marginRight: -22
  }
});

FormRow.displayName = 'FormRow';

export default FormRow;
