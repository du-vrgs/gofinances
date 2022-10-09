import React, { useEffect, useState } from 'react'

import { Text } from "react-native"
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { ModalSelectTransactionsRangeContainer } from './styles';
import { Button } from '../Form/Button';
import { useTheme } from 'styled-components';

interface Props {
    isVisible: boolean;
    onSelect: (selectedValue: string) => void;
    monthSelected: string;
}

export const ModalSelectTransactionsRange = ({isVisible, onSelect, monthSelected}: Props) => {
    const [selectedValue, setSelectedValue] = useState(monthSelected);
    const theme = useTheme();

    return (
        <Modal isVisible={isVisible}>
            <ModalSelectTransactionsRangeContainer>
                    <Text>Selecione a faixa das transações</Text>

                    <Picker 
                        selectedValue={selectedValue} 
                        onValueChange={(value) => setSelectedValue(value)}
                        style={{ marginBottom: 24 }}
                    >
                        <Picker.Item label='Geral' value='geral'/>
                        <Picker.Item label='Janeiro' value='janeiro'/>
                        <Picker.Item label='Fevereiro' value='fevereiro'/>
                        <Picker.Item label='Março' value='março'/>
                        <Picker.Item label='Abril' value='abril'/>
                        <Picker.Item label='Maio' value='maio'/>
                        <Picker.Item label='Junho' value='junho'/>
                        <Picker.Item label='Julho' value='julho'/>
                        <Picker.Item label='Agosto' value='agosto'/>
                        <Picker.Item label='Setembro' value='setembro'/>
                        <Picker.Item label='Outubro' value='outubro'/>
                        <Picker.Item label='Novembro' value='novembro'/>
                        <Picker.Item label='Dezembro' value='dezembro'/>
                    </Picker>

                <Button 
                    title='Selecionar'
                    onPress={() => onSelect(selectedValue)}
                    bgColor={theme.colors.primary}
                    />
            </ModalSelectTransactionsRangeContainer>
        </Modal>
    )
}