import React, {useState, useEffect} from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
import { Icon } from "../icon/icon"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset,
    tx,
    name,
    icon,
    background,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )



  return (
    <TouchableOpacity style={{...viewStyle, backgroundColor:background} } {...rest}>
      {
          name &&
          <Icon name={name} style={{height:40, width:40}} />
        }
        {
          name &&
          <Text tx={tx} text={name} style={textStyle} />
        }
      
    </TouchableOpacity>
  )
}
