import React, { ReactElement, useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HistoryCard } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";
import { categories } from "../../utils/categories";
import { 
    ResumeContainer, 
    Header, 
    Title, 
    HistoryCardsContent 
} from "./styles";

interface AllResumeProps {
    type: 'Income' | 'Outcome';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface ResumeProps {
    name: string;
    total: string;
    color: string;
}

export const Resume = (): ReactElement => {

    const [loading, setLoading] = useState(true);
    const [resumes, setResumes] = useState<ResumeProps[]>([]);

    const getResumes = async () => {
        const transactionKey = "@gofinances:transaction";
        const storageResumes = await AsyncStorage.getItem(transactionKey);
        const allResumes: AllResumeProps[] = storageResumes ? JSON.parse(storageResumes) : [];

        if (allResumes.length) {
            const resumesList = categories.map((category) => {
                let amount = 0

                allResumes.forEach(resume => {
                    if (resume.category === category.name) {
                        amount += Number(resume.amount)
                    }
                })

                if (amount > 0) {
                    const total = amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL"})
                    return {
                        name: category.name,
                        total: total,
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

                <HistoryCardsContent>
                    {resumes.map((resume, index) => (
                        <HistoryCard
                            key={index.toString()}
                            title={resume.name}
                            amount={resume.total}
                            color={resume.color}
                        />
                    ))}
                </HistoryCardsContent>
            </ResumeContainer>
        }
        </>
    )
}