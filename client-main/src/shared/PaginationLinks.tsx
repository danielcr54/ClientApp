import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import {
  NavLink,
  NavLinkProps,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import _ from 'lodash';
import { styleSettings } from '@igg/common';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import queryString from 'query-string';
import { ReactNodeArray } from 'prop-types';

const { deviceScreenQuery, colors } = styleSettings;

// Visual components

const PaginationLinksRoot = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  width: '100%',
  marginBottom: 20,

  [`@media ${deviceScreenQuery.small}`]: {
    width: 'auto'
  }
});

interface PaginationLinksItemProps {
  disabled?: boolean;
}

const PaginationLinksItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 45,
  padding: '16px 8px',
  fontSize: 15,
  backgroundColor: '#393350',
  color: 'rgba(255, 255, 255, 0.65)',

  '&, &:hover': {
    textDecoration: 'none'
  },

  '&:hover': {
    backgroundColor: '#514971',
    color: 'white'
  },

  '&:active': {
    backgroundColor: '#473868'
  },

  '&.active': {
    backgroundColor: '#473868',
    color: 'white'
  }
});

const PaginationLinksItemLink = PaginationLinksItem.withComponent(NavLink);

interface PaginationLinksArrowItemProps extends PaginationLinksItemProps {
  rightArrow?: boolean;
}

const PaginationLinksArrowItem = styled(PaginationLinksItem)(
  ({ rightArrow, disabled }: PaginationLinksArrowItemProps) => ({
    minWidth: 48,
    borderTopLeftRadius: rightArrow ? 0 : 3,
    borderBottomLeftRadius: rightArrow ? 0 : 3,
    borderTopRightRadius: rightArrow ? 3 : 0,
    borderBottomRightRadius: rightArrow ? 3 : 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderLeftWidth: rightArrow ? 1 : 0,
    borderRightWidth: rightArrow ? 0 : 1,
    color: disabled ? 'rgba(255, 255, 255, .25)': 'white',

    '&:hover, &:active, &:focus': {
      color: disabled ? 'rgba(255, 255, 255, .25)' : 'inherit',
      backgroundColor: disabled ? '#393350' : '#514971'
    }
  })
);

const PaginationLinksArrowItemLink = styled(
  PaginationLinksArrowItem.withComponent(NavLink),
  { shouldForwardProp: prop => isPropValid(prop) && prop !== 'rightArrow' }
)();

export interface PaginationLinksProps extends RouteComponentProps {
  currentPage?: number;
  totalPages?: number;
  route?: string;
}

export function PaginationLinks(props: PaginationLinksProps) {
  const {
    currentPage = 1,
    totalPages = 1,
    route = props.location.pathname,
    location
  } = props;
  const qs = queryString.parse(location.search);
  return (
    <PaginationLinksRoot>
      {renderPreviousPageLink(props, qs)}
      {getNumberedLinks(props, qs)}
      {renderNextPageLink(props, qs)}
    </PaginationLinksRoot>
  );
}

function generatePageNumbers(totalPages: number, currentPage: number) {
  const limit = 5;
  const offset = 2;

  if (currentPage <= offset + 1) {
    return _.range(1, limit > totalPages ? totalPages + 1 : limit + 1);
  }
  if (currentPage >= totalPages - offset) {
    return _.range(limit > totalPages ? 1 : totalPages - limit + 1, totalPages + 1);
  }
  return _.range(currentPage - offset, currentPage + offset + 1);
}

function getNumberedLinks(
  { currentPage, totalPages, route = '' }: PaginationLinksProps,
  qs: queryString.OutputParams
) {
  if (!currentPage || !totalPages) return void 0; // Pagination values not set

  const children: ReactNodeArray = [];
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  pageNumbers.forEach((page: number) => {
    children.push(
      <PaginationLinksItemLink
        key={page}
        to={generateUrl(route, { ...qs, page })}
        isActive={() => currentPage === page}
      >
        {page}
      </PaginationLinksItemLink>
    );
  });

  return children;
}

function renderPreviousPageLink(
  { currentPage, totalPages, route = '' }: PaginationLinksProps,
  qs: queryString.OutputParams
) {
  if (!currentPage || !totalPages) return void 0; // Pagination values not set
  // if (currentPage <= 1) return void 0; // No 'previous' page

  return (
    <PaginationLinksArrowItemLink
      disabled={currentPage <= 1}
      to={generateUrl(route, { ...qs, page: currentPage - 1 })}
      onClick={(e: React.MouseEvent) => { if (currentPage <= 1) {e.preventDefault()}}}
    >
      <IoIosArrowBack />
    </PaginationLinksArrowItemLink>
  );
}

function renderNextPageLink(
  { currentPage, totalPages, route = '' }: PaginationLinksProps,
  qs: queryString.OutputParams
) {
  if (!currentPage || !totalPages) return void 0; // Pagination values not set
  // if (currentPage >= totalPages) return void 0; // No 'next' page

  return (
    <PaginationLinksArrowItemLink
      disabled={currentPage >= totalPages}
      rightArrow={true}
      to={generateUrl(route, { ...qs, page: currentPage + 1 })}
      onClick={(e: React.MouseEvent) => { if (currentPage >= totalPages) {e.preventDefault()}}}
    >
      <IoIosArrowForward />
    </PaginationLinksArrowItemLink>
  );
}

export function generateUrl(route: string, query: any) {
  return `${route}?${queryString.stringify(query)}`;
}

export default withRouter(PaginationLinks);
