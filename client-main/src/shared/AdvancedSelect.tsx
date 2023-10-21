import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import ReactSelect, { components } from 'react-select';
import { Props as ReactSelectProps } from 'react-select/lib/Select';
import { ThemeConfig } from 'react-select/lib/theme';
import { IoIosArrowDown, IoIosCloseCircle } from 'react-icons/io';
import {
  InputRoot,
  FloatLabel,
  InputEndAddon,
  StyledInput,
  StyledInputProps
} from '@igg/common';
import { inputColors, colors, fonts } from '@igg/common/lib/styleSettings';

const {
  Control,
  IndicatorsContainer,
  IndicatorSeparator,
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove
} = components;

const AdvancedSelectRoot = InputRoot;

const AdvancedSelectAddon = styled(InputEndAddon)({
  fontSize: 18
});

interface StyledAdvancedSelectProps extends StyledInputProps {
  hasLabel?: boolean;
  focused?: boolean;
  filled?: boolean;
}

const StyledAdvancedSelect = styled(StyledInput.withComponent('div'))(
  ({ filled }: StyledAdvancedSelectProps) => ({
    color: filled ? inputColors.text : 'transparent',
    borderColor: 'transparent',
    appearance: 'none',

    '&:focus': {
      borderColor: 'transparent',
      backgroundColor: inputColors.bgFocus
    }
  })
);

// Theme overrides

const customTheme: ThemeConfig = theme => ({
  ...theme,
  borderRadius: 2,
  colors: {
    ...theme.colors,
    fontFamily: fonts.main,
    primary: colors.main,
    primary75: 'rgba(156, 115, 215, 0.75)',
    primary50: 'rgba(156, 115, 215, 0.5)',
    primary25: 'rgba(156, 115, 215, 0.25)',
    danger: colors.danger
  }
});

// Individual styles overrides

const reactSelectBaseStyles = {
  container: (originalStyle: any) => ({
    ...originalStyle,
    display: 'flex',
    position: 'relative',
    width: '100%',
    borderColor: 'transparent'
  }),

  valueContainer: (originalStyle: any) => ({
    ...originalStyle,
    padding: 0
  }),

  control: (originalStyle: any) => ({
    ...originalStyle,
    width: '100%',
    margin: 0,
    padding: 0,
    border: 0,
    borderColor: 'transparent',
    borderRadius: 2,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }),

  input: (originalStyle: any) => ({
    ...originalStyle,
    margin: '-2px 0',
    color: inputColors.text
  }),

  singleValue: (originalStyle: any, state: any) => ({
    ...originalStyle,
    margin: 0,
    color: state.isDisabled ? inputColors.textDisabled : inputColors.text
  }),

  multiValue: (originalStyle: any) => ({
    ...originalStyle,
    margin: '3px 4px 0 0',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: colors.white
  }),

  multiValueLabel: (originalStyle: any) => ({
    ...originalStyle,
    color: colors.white
  }),

  multiValueRemove: (originalStyle: any, state: any) => ({
    ...originalStyle,
    fontSize: 13,
    background: 'transparent',
    color: colors.white,

    '&:hover': {
      backgroundColor: 'transparent',
      color: colors.danger,
      cursor: state.isDisabled ? 'default' : 'pointer'
    }
  }),

  dropdownIndicator: (originalStyle: any) => ({
    ...originalStyle,
    fontSize: 18,
    padding: 0,
    color: colors.white,

    '&:hover': {
      color: colors.white
    },

    '&:focus': {
      color: colors.white
    }
  }),

  clearIndicator: (originalStyle: any, state: any) => ({
    ...originalStyle,
    fontSize: 18,
    color: colors.white,

    '&:hover': {
      color: colors.danger,
      cursor: state.isDisabled ? 'default' : 'pointer'
    },

    '&:focus': {
      color: colors.white
    }
  }),

  indicatorSeparator: (originalStyle: any) => ({
    ...originalStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }),

  menu: (originalStyle: any) => ({
    ...originalStyle,
    margin: '2px 0',
    backgroundColor: colors.faded,
    color: 'white',
    boxShadow: '0 5px 18px -5px rgba(0, 0, 0, 0.5)'
  })
};

function makeReactSelectStyles({ label }: AdvancedSelectProps) {
  const hasLabel = !!label;

  return {
    ...reactSelectBaseStyles,

    placeholder: (originalStyle: any, state: any) => ({
      ...originalStyle,
      margin: 0,
      opacity: state.isFocused ? 1 : hasLabel ? 0 : 1,
      color: inputColors.placeholder,
      transition: 'all 0.2s'
    })
  };
}

// Components overrides

const reactSelectComponentOverrides = {
  Control: function CustomControl({ children, ...otherProps }: any) {
    const { hasValue, isFocused, selectProps } = otherProps;
    const { label, small } = selectProps;

    return (
      <Control {...otherProps}>
        <AdvancedSelectRoot>
          <StyledAdvancedSelect
            focused={isFocused}
            hasLabel={!!label}
            filled={hasValue}
            small={small}
          >
            {children}
          </StyledAdvancedSelect>

          {label && (
            <FloatLabel small={small} active={isFocused || hasValue}>
              {label}
            </FloatLabel>
          )}
        </AdvancedSelectRoot>
      </Control>
    );
  },

  DropdownIndicator: function CustomDropdownIndicator(props: any) {
    return (
      DropdownIndicator && (
        <DropdownIndicator {...props}>
          <IoIosArrowDown />
        </DropdownIndicator>
      )
    );
  },

  ClearIndicator: function CustomClearIndicator(props: any) {
    return (
      ClearIndicator && (
        <ClearIndicator {...props}>
          <IoIosCloseCircle />
        </ClearIndicator>
      )
    );
  },

  IndicatorSeparator: function CustomIndicatorSeparator(props: any) {
    return props.isClearable && IndicatorSeparator ? (
      <IndicatorSeparator {...props} />
    ) : null;
  },

  IndicatorsContainer: function CustomIndicatorsContainer(props: any) {
    return (
      <AdvancedSelectAddon interactive={true}>
        <IndicatorsContainer {...props} />
      </AdvancedSelectAddon>
    );
  },

  MultiValueRemove: function CustomMultiValueRemove(props: any) {
    return (
      <MultiValueRemove {...props}>
        <IoIosCloseCircle />
      </MultiValueRemove>
    );
  }
};

export interface AdvancedSelectProps extends ReactSelectProps {
  label?: string;
  placeholder?: string;
  focused?: boolean;
  filled?: boolean;
  value?: any | any[];
  small?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  onChange?: (value: any | any[]) => void;
  children?: ReactNode;
}

export function AdvancedSelect({
  multiple,
  label,
  placeholder,
  focused,
  filled,
  value,
  small,
  clearable,
  onChange,
  ...reactSelectProps
}: AdvancedSelectProps) {
  const advancedSelectOwnProps = {
    multiple,
    label,
    focused,
    filled,
    placeholder,
    value,
    small
  };

  const _options = reactSelectProps.options;
  const options =
    (_options &&
      (Array.isArray(_options) ? _options : (_options as any).options)) ||
    [];

  function mapToInnerValue(itemValue: any) {
    return (
      options.find(
        (opt: { label: string; value: string }) => opt.value === itemValue
      ) || void 0
    );
  }

  function mapToInnerValueWithFallback(itemValue: any) {
    return (
      mapToInnerValue(itemValue) || {
        value: itemValue,
        label: `[${itemValue}]`
      }
    );
  }

  function mapToOuterValue(selected: any) {
    return multiple
      ? Array.isArray(selected)
        ? selected.map(i => i.value)
        : []
      : (selected && selected.value) || void 0;
  }

  const incomingValue = Array.isArray(value)
    ? value.map(mapToInnerValueWithFallback)
    : mapToInnerValue(value);

  return (
    <ReactSelect
      {...reactSelectProps}
      {...advancedSelectOwnProps}
      value={incomingValue}
      isMulti={multiple}
      isClearable={clearable}
      blurInputOnSelect={reactSelectProps.blurInputOnSelect !== false}
      onChange={selected => {
        if (typeof onChange === 'function') {
          onChange(mapToOuterValue(selected));
        }
      }}
      placeholder={placeholder}
      theme={customTheme}
      styles={makeReactSelectStyles(advancedSelectOwnProps)}
      components={reactSelectComponentOverrides}
    />
  );
}

export default AdvancedSelect;
