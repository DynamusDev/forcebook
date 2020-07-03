/* eslint-disable react-native/no-single-element-style-arrays */
import * as React from "react"
import { View, Image, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

export function Icon({ style, name, resizeMode = 'contain', width, height }: IconProps) {
  return (
    <View style={[{ width: width, height: height }]}>
      <Image
        source={icons[name]}
        resizeMode={resizeMode}
        style={style}
      />
    </View>
  )
}
