import React, { Component, ComponentType, InputHTMLAttributes } from 'react';
import { Form, Field } from 'react-final-form';
import {
  FormElement,
  InputField,
  LabeledCheckboxField,
  FormActions,
  FormActionsContent,
  FormErrorMap,
  SubmitButton,
  FormError,
  LabeledCheckboxProps,
  SubmitErrors,
  FieldError
} from '@igg/common';
import { BetaFormModel } from './types';
import styled from '@emotion/styled-base';
import { deviceScreenQuery, colors } from '@igg/common/lib/styleSettings';
import { FaPlaystation, FaXbox, FaDesktop } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import ReCAPTCHA from 'react-google-recaptcha';
import { config } from 'config';

export const StyledFormActions = styled(FormActions)({
  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'column'
  }
});

export const StyledFormActionsContent = styled(FormActionsContent)({
  [`@media ${deviceScreenQuery.medium}`]: {
    '&:not(:last-of-type)': {
      marginBottom: 20
    }
  }
});

export const ConsoleCheckbox = styled('input')({
  display: 'none'
});

export const ConsoleCheckboxLabel = styled('label')({
  backgroundColor: '#36304f',
  display: 'inline-block',
  width: '100%'
});

export const ConsoleInlineContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
  width: '100%'
});

export const ConsoleContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

export const ConsoleHeader = styled('div')({
  width: '100%',
  fontSize: 15,
  marginBottom: 5
});

export const FormElementFullWidth = styled(FormElement)({
  width: '30%'
});

const LabeledCheckboxControlWrapper = styled('div')({
  flexShrink: 0,

  '&:not(:last-of-type)': {
    marginRight: 12
  }
});

export interface CheckboxStyledProps {
  size?: number;
  large?: boolean;
  disabled?: boolean;
  focused?: boolean;
  console?: string;
  icon?: ComponentType;
}

const checkboxSelector = 'input[type="checkbox"]';

const StyledCheckbox = styled('input')(({ disabled }: CheckboxStyledProps) => ({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: disabled ? 'default' : 'pointer'
}));

const StyledCustomCheckbox = styled('div')(
  ({ disabled }: CheckboxStyledProps) => ({
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: 59,
    border: `0px solid ${disabled ? 'rgba(255, 255, 255, 0.5)' : colors.white}`,
    borderRadius: 3,
    color: disabled ? 'rgba(255, 255, 255, 0.5)' : colors.white,
    boxShadow: 'none',
    transition: 'all 0.2s'
  })
);

const Checkmark = styled('div')(
  ({ large, size, disabled }: CheckboxStyledProps) => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#36304f',

    [`${checkboxSelector}:checked ~ &`]: {
      backgroundColor: '#6c43a4'
    },

    [`${checkboxSelector}:focus ~ &`]: {}
  })
);

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> &
  CheckboxStyledProps;

export function CustomCheckbox({
  large,
  size,
  disabled,
  focused,
  console,
  icon,
  ...otherProps
}: CheckboxProps) {
  const Icon = icon;

  return (
    <StyledCustomCheckbox
      large={large}
      size={size}
      disabled={disabled}
      focused={focused}
    >
      <StyledCheckbox type="checkbox" disabled={disabled} {...otherProps} />

      <Checkmark large={large} size={size} disabled={disabled}>
        <ConsoleInlineContainer>
          <div>{console}</div>
          {Icon && <Icon />}
        </ConsoleInlineContainer>
      </Checkmark>
    </StyledCustomCheckbox>
  );
}

export interface CustomLabeledCheckboxFieldProps extends LabeledCheckboxProps {
  name: string;
  console: string;
  icon: ComponentType;
}

export function CustomLabeledCheckboxField({
  name,
  console,
  icon
}: CustomLabeledCheckboxFieldProps) {
  return (
    <Field name={name} type="checkbox">
      {({ input, meta }) => (
        <>
          <LabeledCheckboxControlWrapper>
            <CustomCheckbox
              name={input.name}
              onFocus={input.onFocus}
              onBlur={input.onBlur}
              value={input.value}
              checked={input.checked}
              onChange={input.onChange}
              focused={meta.active}
              console={console}
              icon={icon}
            />
          </LabeledCheckboxControlWrapper>

          <SubmitErrors fieldMeta={meta} />
          {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
        </>
      )}
    </Field>
  );
}

export const FormSuccessRoot = styled('div')({
  display: 'flex',
  marginBottom: 25,
  padding: '14px 16px',
  borderRadius: 2,
  backgroundColor: colors.success,

  [`@media ${deviceScreenQuery.small}`]: {
    padding: '16px 20px',
    marginBottom: 35
  }
});

export const FormSuccessFigure = styled('div')({
  marginRight: 9,
  fontSize: 16,
  color: 'rgba(255, 255, 255, 0.35)',

  [`@media ${deviceScreenQuery.small}`]: {
    marginRight: 12,
    fontSize: 20
  }
});

export const FormSuccessContent = styled('div')({
  flex: 1,
  paddingTop: 2,
  fontSize: 13,
  lineHeight: 1.4,
  color: colors.white
});

export const FormSuccessTitle = styled('div')({
  marginBottom: 5,
  fontSize: 14,
  lineHeight: 1.3,
  fontWeight: 500,
  color: colors.white,

  [`@media ${deviceScreenQuery.small}`]: {
    fontSize: 16
  }
});

export const FormElementHalf = styled(FormElement)({
  width: '100%',

  [`@media ${deviceScreenQuery.small}`]: {
    width: '49%'
  }
});

export const NameContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

export interface FormSuccessProps {
  title?: string;
}

export function FormSuccess({ title }: FormSuccessProps) {
  return (
    <FormSuccessRoot>
      <FormSuccessFigure>
        <IoMdCheckmark />
      </FormSuccessFigure>

      <FormSuccessContent>
        {title && <FormSuccessTitle>{title}</FormSuccessTitle>}
      </FormSuccessContent>
    </FormSuccessRoot>
  );
}

export function validateForm(formModel: BetaFormModel) {
  const errors: FormErrorMap<BetaFormModel> = {};

  if (!formModel.firstname) {
    errors.firstname = 'Firstname is required';
  }

  if (!formModel.lastname) {
    errors.lastname = 'Lastname is required';
  }

  if (!formModel.emailAddress) {
    errors.emailAddress = 'Email is required';
  }

  if (!formModel.agreeLegal) {
    errors.agreeLegal = 'You have to agree to the Terms of Service to proceed';
  }

  return errors;
}

export interface BetaFormProps {
  formData?: BetaFormModel;
  onSubmit: (signUpFormModel: BetaFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
  captchaRender: () => void;
}

export class BetaForm extends Component<BetaFormProps> {
  preventSpaceOnKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === ' ') {
      // prevent if user typed space character in username field
      e.preventDefault();
    }
  }

  renderRecaptchaField(field: any) {
    const {
      meta: { touched, error }
    } = field;
    return (
      <>
        <ReCAPTCHA
          sitekey={config.reCaptcha.siteKey || ''}
          onChange={field.input.onChange}
          theme="dark"
        />
        {touched && <FieldError>{error}</FieldError>}
      </>
    );
  }

  render() {
    const { preventSpaceOnKeyPress } = this;

    return (
      <Form
        initialValues={this.props.formData}
        onSubmit={this.props.onSubmit}
        validate={validateForm}
      >
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            {this.props.formError && (
              <FormError title="Sign up failed">
                {this.props.formError}
              </FormError>
            )}

            {this.props.success && (
              <FormSuccess title="Thank you for your application" />
            )}

            <NameContainer>
              <FormElementHalf>
                <InputField name="firstname" label="Firstname" />
              </FormElementHalf>

              <FormElementHalf>
                <InputField name="lastname" label="Lastname" />
              </FormElementHalf>
            </NameContainer>

            <FormElement>
              <InputField
                onKeyPress={preventSpaceOnKeyPress}
                name="emailAddress"
                label="Email address"
              />
            </FormElement>

            <ConsoleHeader>Preferred Platform[s]</ConsoleHeader>

            <ConsoleContainer>
              <FormElementFullWidth>
                <CustomLabeledCheckboxField
                  name="ps4"
                  console="PS4"
                  icon={FaPlaystation}
                />
              </FormElementFullWidth>

              <FormElementFullWidth>
                <CustomLabeledCheckboxField
                  name="xbox"
                  console="Xbox"
                  icon={FaXbox}
                />
              </FormElementFullWidth>

              <FormElementFullWidth>
                <CustomLabeledCheckboxField
                  name="pc"
                  console="PC"
                  icon={FaDesktop}
                />
              </FormElementFullWidth>
            </ConsoleContainer>

            <StyledFormActions>
              <StyledFormActionsContent grow={true} verticalAlignCenter={true}>
                <LabeledCheckboxField
                  name="agreeLegal"
                  staticLabel={true}
                  label={
                    <>
                      I confirm that I have read and agree with the platform's{' '}
                      <a href="/legal/terms-of-use.pdf" target="_blank">
                        terms of use
                      </a>
                    </>
                  }
                />
              </StyledFormActionsContent>

              <StyledFormActionsContent grow={true} verticalAlignCenter={true}>
                <LabeledCheckboxField
                  name="newsletter"
                  staticLabel={true}
                  label={<>Opt-in to receive our Newsletters </>}
                />
              </StyledFormActionsContent>

              {this.props.captchaRender()}

              <StyledFormActionsContent>
                <SubmitButton
                  disabled={false}
                  inProgress={this.props.inProgress}
                  success={this.props.success}
                  progressText="Signing up..."
                  successText="Signed up!"
                  glow={true}
                >
                  Sign up
                </SubmitButton>
              </StyledFormActionsContent>
            </StyledFormActions>
          </form>
        )}
      </Form>
    );
  }
}

export default BetaForm;
