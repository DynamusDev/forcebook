import { ImageStyle, ViewStyle } from "react-native"
import { IconTypes } from "./icons"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */

  /**
   * Style overrides for the icon container
   */

  /**
   * The name of the icon
   */

  name?: IconTypes | object | string;
  resizeMode?: 'contain' | 'cover' | 'repeat' | 'stretch' | 'center';
  width?: number;
  height?: number;
  style?: ImageStyle;
}
