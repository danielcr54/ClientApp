import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors } = styleSettings;

const lineColor = 'rgba(255, 255, 255, 0.1)';
const treeNodeSpacing = 70;

// Tree structure layout

export const TreeLayer = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%'
});

export const TreeLayerCell = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',

  '&:not(:first-of-type)': {
    // NOTE: `-1` is a visual adjustment to align
    // 1px-wide connector lines
    marginLeft: treeNodeSpacing / 2 - 1
  },

  '&:not(:last-of-type)': {
    marginRight: treeNodeSpacing / 2
  }
});

export const TreeNode = styled('div')({
  flexGrow: 0,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

// TEMP Placeholder blocks

export interface TreeNodePlaceholderProps {
  highBlock?: boolean;
}

export const TreeNodePlaceholder = styled('div')(
  ({ highBlock }: TreeNodePlaceholderProps) => ({
    display: 'flex',
    width: 50,
    height: highBlock ? 140 : 50,
    border: '1px dashed rgba(255, 255, 255, 0.55)',
    borderRadius: 1,

    '&:not(:last-of-type)': {
      borderRightWidth: 0
    }
  })
);

export const TreeNodePlaceholderGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const TreeConnection = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'stretch',
  width: '100%'
});

export interface TreeConnectionLineProps {
  variableHeight?: boolean;
}

export const TreeConnectionLine = styled('div')(
  ({ variableHeight }: TreeConnectionLineProps) => ({
    flexShrink: 1,
    flexGrow: 1,
    width: 1,
    height: variableHeight ? 'auto' : 35,
    backgroundColor: lineColor
  })
);

export const TreeConnectionSplitter = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
});

export const TreeConnectionSplitterBlock = styled('div')({
  position: 'relative',
  zIndex: 2,
  top: 10,
  marginTop: -10
});

export const TreeConnectionSplitterLine = styled('div')({
  position: 'relative',
  zIndex: 1,
  width: `calc(50% + ${treeNodeSpacing / 2}px)`,
  minHeight: 30,
  border: `1px solid ${lineColor}`,
  borderBottom: 0,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3
});
