import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighLightsCard } from "../../components/HighLightsCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
  DashboardContainer as Container, 
  Header,
  UserInfo,
  Infos,
  Photo,
  Greeting,
  UserName,
  Icon,
  HeaderWrapper,
  ScrollHorizontalHightLightCards,
  ScrollVerticalTransactionsCards,
  Title,
} from "./styles"
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Loading } from "../../components/Loading";

interface AmountProps {
  income: string;
  outcome: string;
  total: string;
}

interface HightLightProps {
  incomeDate: string,
  outcomeDate: string
}

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard = () => {

  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [transactionsList, setTransactionsList] = useState<DataListProps[]>([])
  const [transactionsAmount, setTransactionsAmount] = useState<AmountProps>({
    income: "R$ 0,00",
    outcome: "R$ 0,00",
    total: "R$ 0,00"
  })
  const [hightLightsLastUpdate, setHightLightsLastUpdate] = useState<HightLightProps>({
    incomeDate: '',
    outcomeDate: ''
  })

  const getLastTransactionDate = (transactions: DataListProps[], type: 'Income' | 'Outcome') => {

    const transactionsByThisType = transactions.filter((transaction) => transaction.type === type);
    const transactionsTimestamp = transactionsByThisType.map((transaction) => new Date(transaction.date).getTime());
    const lastTransaction = Math.max(...transactionsTimestamp);

    return new Date(lastTransaction).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long'})
  };

  const getTransactions = async () => {
      const transactionKey = "@gofinances:transaction";
      const storageTransactions = await AsyncStorage.getItem(transactionKey);
      const allTransactions = storageTransactions ? JSON.parse(storageTransactions) : [];

      if (allTransactions.length) {

        let income = 0;
        let outcome = 0;
        let total = 0;

        const formatedTransactions: DataListProps[] = allTransactions.map((transaction: DataListProps) => {

          if (transaction.type === 'Income') {
            income += Number(transaction.amount);
          }
          else {
            outcome += Number(transaction.amount);
          }

          const formatedAmount = parseFloat(transaction.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
          const formatedDate = new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'numeric', year: '2-digit'})

          return {
            id: transaction.id,
            name: transaction.name,
            type: transaction.type,
            category: transaction.category,
            amount: formatedAmount,
            date: formatedDate
          }
        })

        total = income - outcome

        setTransactionsList(formatedTransactions);
        setTransactionsAmount({
          income: income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
          outcome: outcome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
          total: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
        });
        setHightLightsLastUpdate({
          incomeDate: getLastTransactionDate(allTransactions, 'Income'),
          outcomeDate: getLastTransactionDate(allTransactions, 'Outcome'),
        })
      }

      setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    getTransactions()
  }, []))

  return (
      <Container>
        {loading 
        ? 
          <Loading />
        : 
        <>
          <Header>
            <HeaderWrapper>
              <UserInfo>
                <Photo source={{uri: "https://avatars.githubusercontent.com/u/64373381?v=}4"}}/>
                <Infos>
                  <Greeting>Olá, </Greeting>
                  <UserName>Eduardo</UserName>
                </Infos>
              </UserInfo>
            <Icon name='power'/>
            </HeaderWrapper>
          </Header>

          <ScrollHorizontalHightLightCards>
            <HighLightsCard 
              type='up'
              title={"Entradas"} 
              ammount={transactionsAmount.income} 
              lastTransaction={`Última entrada dia ${hightLightsLastUpdate.incomeDate}`}
            />
            <HighLightsCard 
              type='down'
              title={"Saídas"} 
              ammount={transactionsAmount.outcome} 
              lastTransaction={`Última saída dia ${hightLightsLastUpdate.outcomeDate}`}
            />

            <HighLightsCard 
              type='dollar'
              title={"Total"} 
              ammount={transactionsAmount.total} 
              lastTransaction={"01 á 16 de abril"}
            />
          </ScrollHorizontalHightLightCards>

          {transactionsList.length > 0 ?
          <>
            <Title>Listagem</Title>
            <ScrollVerticalTransactionsCards
              data={transactionsList}
              keyExtractor={ item => item.id}
              renderItem={ ({ item }) => <TransactionCard data={item} />} 
            />
          </>
          :
            <Title>Lista de transações vazia</Title>
          }
        
        </>}
      </Container>
  )
} 