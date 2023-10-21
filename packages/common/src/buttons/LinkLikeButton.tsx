import React, { HTMLProps } from 'react';
import { StyledLink } from '../StyledLink';

export const StyledLinkLikeButton = StyledLink.withComponent('button');

export interface LinkLikeButtonProps {
  disabled?: boolean;
}

export function LinkLikeButton(
  props: LinkLikeButtonProps & HTMLProps<HTMLButtonElement>
) {
  return <StyledLinkLikeButton type="button" underline="never" {...props} />;
}

export default LinkLikeButton;
