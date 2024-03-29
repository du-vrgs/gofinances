import React, { ReactElement, useCallback, useState } from "react";
import { Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { HistoryCard } from "../../components/HistoryCard";
// import { Loading } from "../../components/Loading";
import { LoadAnimated } from "../../components/LoadAnimated";

import { categories } from "../../utils/categories";
import { 
    ResumeContainer, 
    Header, 
    Title, 
    HistoryCardsContent, 
    ChartContent,
    SelectMonthContent,
    SelectMonthButton,
    SelectMonthIcon,
    MonthSelected,
    NoRegisterContent,
    NoRegisterText
} from "./styles";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useTheme } from "styled-components";
import { useAuth } from "../../providers/AuthContext";
import { AlertAnimated } from "../../components/AlertAnimated";

interface AllResumeProps {
    type: 'Income' | 'Outcome';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface ResumeProps {
    name: string;
    formattedTotal: string;
    total: number;
    totalPercent: string;
    color: string;
}

export const Resume = (): ReactElement => {

    const theme = useTheme();
    const tabBottomHeight = useBottomTabBarHeight();
    const { storageTransactionsKey } = useAuth();

    const [loading, setLoading] = useState(true);
    const [resumes, setResumes] = useState<ResumeProps[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChangeDate = (action: 'next' | 'previous') => {
        setSelectedDate((action === 'next') ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1));
    };

    const getResumes = async () => {
        const storageResumes = await AsyncStorage.getItem(storageTransactionsKey);
        const allResumes: AllResumeProps[] = storageResumes ? JSON.parse(storageResumes) : [];

        if (allResumes.length) {
            const outcomeResumes = allResumes.filter(resume => resume.type === 'Outcome')
            const outcomeResumesBySelectedDate = outcomeResumes.filter(resume => new Date(resume.date).getFullYear() === selectedDate.getFullYear() && new Date(resume.date).getMonth() === selectedDate.getMonth())
    
            if (outcomeResumesBySelectedDate.length) {
    
                const resumeTotal = outcomeResumesBySelectedDate.reduce((acc, resume) => {
                    return acc + Number(resume.amount)
                }, 0)
    
                const resumesList = categories.map((category) => {
                    let amount = 0
    
                    outcomeResumesBySelectedDate.forEach(resume => {
                        if (resume.category === category.name) {
                            amount += Number(resume.amount)
                        }
                    })
    
                    if (amount > 0) {
                        const formattedTotal = amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL"})
                        const total = amount / resumeTotal * 100
                        return {
                            name: category.name,
                            formattedTotal,
                            total: total,
                            totalPercent: total.toFixed(0) + "%",
                            color: category.color
                        }
                    }
                });
    
                setResumes(resumesList.filter(resume => resume !== undefined));
                setTimeout(() => setLoading(false), 1200);

            }
            else {
                setResumes([]);
                setTimeout(() => setLoading(false), 1200);
            }
        }
        else {
            setTimeout(() => setLoading(false), 1200);
        }
    };

    useFocusEffect(useCallback(() => {
        setLoading(true);
        getResumes();
    }, [selectedDate]));

    return (
        <ResumeContainer>
            <Header>
                <Title>
                    Resumo
                </Title>
            </Header>

            {loading
            ? 
                <LoadAnimated /> 
            :
            <>
                <SelectMonthContent>
                    <SelectMonthButton onPress={() => handleChangeDate('previous')}>
                        <SelectMonthIcon name="chevron-left"/>
                    </SelectMonthButton>

                    <MonthSelected>
                        {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
                    </MonthSelected>

                    <SelectMonthButton onPress={() => handleChangeDate('next')}>
                        <SelectMonthIcon name="chevron-right"/>
                    </SelectMonthButton>
                </SelectMonthContent>

                {resumes.length > 0 ? 
                    (<>
                    <ChartContent>
                        <VictoryPie 
                            data={resumes}
                            x={`totalPercent`}
                            y={'total'}
                            colorScale={resumes.map((resume) => resume.color)}
                            labelRadius={99}
                            padAngle={({ datum }) => datum.y}
                            innerRadius={80}
                            style={
                                { 
                                    labels: { 
                                        fill: theme.colors.shape, 
                                        fontSize: `${RFValue(16)}px`, 
                                        fontWeight: "bold" 
                                    }
                                }
                            }
                            animate={{duration: 2100, easing: 'cubicIn'}}
                        />
                    </ChartContent>

                    <HistoryCardsContent
                        // contentContainerStyle={{
                        //     paddingBottom: tabBottomHeight
                        // }}
                    >
                        {resumes.map((resume, index) => (
                            <HistoryCard
                                key={index.toString()}
                                title={resume.name}
                                amount={resume.formattedTotal}
                                color={resume.color}
                            />
                        ))}
                    </HistoryCardsContent>
                    </>) 
                : 
                <NoRegisterContent>
                    <NoRegisterText>
                    Nenhum registro para essa data
                    </NoRegisterText>
                    <AlertAnimated />
                </NoRegisterContent>
                }
            </>}
        </ResumeContainer>
    )
}