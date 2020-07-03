import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"
import { ButtonProps } from "./button.props"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  flex: 1,
  height: 32,
  width: 32,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],

}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */

export const viewPresets = {

  /**
   * A smaller piece of secondard information.
   */

  primary: { ...BASE_VIEW, backgroundColor: color.transparent } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[2],
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, fontSize: 20, color: color.palette.white } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */

export type ButtonPresetNames = keyof typeof viewPresets
