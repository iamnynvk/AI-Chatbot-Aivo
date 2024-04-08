export interface IToggle {
  loading: boolean;
  isClick: boolean;
}

export interface IPropsTypes {
  placeHolderText?: string;
  refs?: any;
  isSecure?: boolean;
  onChange: any;
  isAutoFocus?: boolean;
  isNextFocus?: any;
  keyType?: any;
  textContainer?: any;
  values: string;
  maxLength?: number;
  onBlurInput?: any;
  numOfLine?: number;
  isMultiLine?: boolean;
  isError?: any;
  isEditable?: boolean;
  customStyle?: any;
  isTouch?: boolean;
  setActiveInputField?: any;
  name?: string;
  activeInputField?: string;
}

export interface ISubmitButton {
  isDisable?: boolean;
  handleSubmitButton?: any;
  isLoading?: boolean;
  title: string;
}
