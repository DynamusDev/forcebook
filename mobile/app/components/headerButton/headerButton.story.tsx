import * as React from "react"
import { ViewStyle, TextStyle, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { Button } from "./button"

declare let module

const buttonStyleArray: ViewStyle[] = [{ paddingVertical: 100 }, { borderRadius: 0 }]

const buttonTextStyleArray: TextStyle[] = [{ fontSize: 20 }, { color: "#a511dc" }]

storiesOf("Button", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Button" usage="The primary button.">
        <Button name="Emergência" preset="primary" background={color.palette.Emergência} onPress={() => Alert.alert("pressed")} />
        <Button name="Pista" preset="primary" background={color.palette.Pista} onPress={() => Alert.alert("pressed")} />
        <Button name="Estoque" preset="primary" background={color.palette.Estoque} onPress={() => Alert.alert("pressed")} />
        <Button name="Manutenção" preset="primary" background={color.palette.Manutenção} onPress={() => Alert.alert("pressed")} />
      </UseCase>
    </Story>
  ))
