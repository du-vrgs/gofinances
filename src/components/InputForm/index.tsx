import React, { ReactElement } from "react"
import { Control, Controller } from "react-hook-form"
import { TextInputProps } from "react-native"

import { Input } from "../Form/Input"
import { InputFormContainer } from "./styles"

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export const InputForm = ({
  control,
  name,
  ...rest
}: Props): ReactElement => {

  return (
    <InputFormContainer>
      <Controller
        control={control}
        name={name}
        render={({ field: {onChange, onBlur, value}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            autoCapitalize={'sentences'}
            autoCorrect={false}
            {...rest}
          />
        )}
      />
    </InputFormContainer>
  )
}