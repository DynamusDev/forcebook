import { ViewStyle, TextStyle, TouchableOpacityProps } from "react-native"
import { ButtonPresetNames } from "./commonButton.presets"
import { ColgroupHTMLAttributes } from "react"

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  name?: string

  icon?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[]

  background?: ViewStyle | ViewStyle[] | string

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}
