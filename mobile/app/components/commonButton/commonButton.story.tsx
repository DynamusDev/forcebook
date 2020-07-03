import * as React from "react"
import { ViewStyle, TextStyle, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CommonButton } from "./commonButton"
import { color } from "../../theme"
import { Button } from "../button/button"

declare let module

const buttonStyleArray: ViewStyle[] = [{ paddingVertical: 100 }, { borderRadius: 0 }]

const buttonTextStyleArray: TextStyle[] = [{ fontSize: 20 }, { color: "#a511dc" }]

storiesOf("Button", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Common Button", () => (
    <Story>
      <UseCase text="Button" usage="The primary button.">
        <CommonButton name="Emergência" background={color.palette.Emergência} preset="primary" onPress={() => Alert.alert("pressed")} />
        <CommonButton name="Pista" preset="primary" onPress={() => Alert.alert("pressed")} />
        <CommonButton name="Estoque" preset="primary" onPress={() => Alert.alert("pressed")} />
        <CommonButton name="Manutenção" preset="primary" onPress={() => Alert.alert("pressed")} />
      </UseCase>
    </Story>
  ))
  .add("Menu Button", () => (
    <Story>
      <UseCase text="Menu Button" usage="The Menu Button.">
        <Button name="Emergência" preset="primary" background={color.palette.Emergência} onPress={() => Alert.alert("pressed")} />
        <Button name="Pista" preset="primary" background={color.palette.Pista} onPress={() => Alert.alert("pressed")} />
        <Button name="Estoque" preset="primary" background={color.palette.Estoque} onPress={() => Alert.alert("pressed")} />
        <Button name="Manutenção" preset="primary" background={color.palette.Manutenção} onPress={() => Alert.alert("pressed")} />
      </UseCase>
    </Story>
  ))
