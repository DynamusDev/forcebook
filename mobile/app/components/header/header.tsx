import React, { FunctionComponent as Component } from "react"
import { View, ViewStyle, TextStyle, Platform } from "react-native"
import { HeaderProps } from "./header.props"
import { HeaderButton } from "../headerButton/headerButton"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: 10,
  alignItems: "center",
  height: 65,
  width:"100%",
  paddingTop: Platform.OS === 'ios' ? 30 : 0,
  justifyContent: "center",
}
const LEFTVIEW: ViewStyle = {
  justifyContent: "center",
  width:"10%",
  height: "auto"
}
const CENTERVIEW: ViewStyle = {
  justifyContent: "center",
  width:"80%",
  height: "auto",
  alignItems: "center"
}
const RIGHTVIEW: ViewStyle = {
  justifyContent: "center",
  width:"10%",
  height: "auto",
  alignItems: "flex-end"
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: Component<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    background,
    headerTx,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={{ ...ROOT, ...style, backgroundColor:background}}>
      <View style={LEFTVIEW}>
        {leftIcon ? (
          <HeaderButton name={leftIcon} preset="link" onPress={onLeftPress}/>
        ) : (
          <View style={LEFT} />
        )}
      </View>
      <View style={CENTERVIEW}>
        <View style={TITLE_MIDDLE}>
          <Text style={{ ...TITLE, ...titleStyle }} text={header} />
        </View>
      </View>
      <View style={RIGHTVIEW}>
        {rightIcon ? (
          <HeaderButton name={rightIcon} preset="link" onPress={onRightPress}/>
        ) : (
          <View style={RIGHT} />
        )}
      </View>
    </View>
  )
}
