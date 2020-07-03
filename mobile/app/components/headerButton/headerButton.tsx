import React, {useState, useEffect} from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./headerButton.presets"
import { ButtonProps } from "./headerButton.props"
import { mergeAll, flatten } from "ramda"
import { Icon } from "../icon/icon"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function HeaderButton(props: ButtonProps) {
  // grab the props
  const {
    preset,
    tx,
    name,
    icon,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {
          name &&
          <Icon name={name} style={{height:32, width:32}} />
        }
    </TouchableOpacity>
  )
}
