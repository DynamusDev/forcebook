import React, { FunctionComponent as Component } from "react"
import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Text } from "../text/text"
import PropTypes from 'prop-types';
import { TextFieldProps } from "./text-field.props"
import { mergeAll, flatten } from "ramda"

// the base styling for the container
const CONTAINER: ViewStyle = {
  
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.palette.lightGrey,
  width: 280,
  textAlign: 'center',
  fontSize: 18,
  borderWidth: 1,
  borderColor: color.palette.lightGrey,
  backgroundColor: color.palette.white,
  borderRadius: 8
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export const TextField: Component<TextFieldProps> = props => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    hidden,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)

  let inputStyle: TextStyle = INPUT
  inputStyle = enhance(inputStyle, inputStyleOverride)
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyle}>
      {hidden===false ? (
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
        />
      ) : null}
    </View>
  )
}
