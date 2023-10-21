export interface KycState {
  submitting?: boolean;
  submitSuccess?: boolean;
  submitError?: boolean;
  submitErrorMessage?: string;
}

export interface KycFormModel {
  address1: string;
  address2?: string;
  countryCode: string;
  region?: string;
  city: string;
  postalCode: string;
  documents?: any[]
}
