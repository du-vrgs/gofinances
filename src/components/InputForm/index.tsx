import React, { ReactElement } from "react"
import { Control, Controller, FieldError } from "react-hook-form"
import { TextInputProps } from "react-native"

import { Input } from "../Form/Input"
import { InputFormContainer, ErrorMessage } from "./styles"

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: any;
}

export const InputForm = ({
  control,
  name,
  error,
  ...rest
}: Props): ReactElement => {

  return (
    <InputFormContainer>
      <Controller
        control={control}
        name={name}
        render={({ field: {onChange, onBlur, value}}) => (
          <>
            <Input
              onChangeText={onChange}
              value={value}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              borderError={!!error}
              {...rest}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        )}
      />
    </InputFormContainer>
  )
}