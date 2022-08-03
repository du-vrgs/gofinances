import React, { ReactElement, useCallback, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native"

import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";
import { categories } from "../../utils/categories";
import { 
    ResumeContainer, 
    Header, 
    Title, 
    HistoryCardsContent, 
    ChartContent
} from "./styles";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useTheme } from "styled-components";

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
    const [loading, setLoading] = useState(true);
    const [resumes, setResumes] = useState<ResumeProps[]>([]);

    const getResumes = async () => {
        const transactionKey = "@gofinances:transaction";
        const storageResumes = await AsyncStorage.getItem(transactionKey);
        const allResumes: AllResumeProps[] = storageResumes ? JSON.parse(storageResumes) : [];
        const outcomeResumes = allResumes.filter(resume => resume.type === 'Outcome')

        if (outcomeResumes.length) {

            const resumeTotal = outcomeResumes.reduce((acc, resume) => {
                return acc + Number(resume.amount)
            }, 0)

            const resumesList = categories.map((category) => {
                let amount = 0

                outcomeResumes.forEach(resume => {
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
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        getResumes()
    }, []));

    return (
        <>
        {loading 
        ? 
            <Loading /> 
        : 
            <ResumeContainer>
                <Header>
                    <Title>
                        Resumo
                    </Title>
                </Header>

                <ChartContent>
                    <VictoryPie 
                        data={resumes}
                        x={`totalPercent`}
                        y={'total'}
                        colorScale={resumes.map((resume) => resume.color)}
                        labelRadius={112.5}
                        padAngle={({ datum }) => datum.y}
                        innerRadius={100}
                        style={
                            { 
                                labels: { 
                                    fill: theme.colors.shape, 
                                    fontSize: `${RFValue(18)}px`, 
                                    fontWeight: "bold" 
                                }
                            }
                        }
                        animate={{duration: 2100, easing: 'cubicIn'}}
                    />
                </ChartContent>

                <HistoryCardsContent
                    contentContainerStyle={{
                        paddingBottom: useBottomTabBarHeight()
                    }}
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
            </ResumeContainer>
        }
        </>
    )
}