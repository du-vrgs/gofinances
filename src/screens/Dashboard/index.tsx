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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard = () => {

  const [transactionsList, setTransactionsList] = useState<DataListProps[]>([])

  const getTransactions = async () => {
      const transactionKey = "@gofinances:transaction";
      const storageTransactions = await AsyncStorage.getItem(transactionKey);
      const allTransactions = storageTransactions ? JSON.parse(storageTransactions) : [];

      if (allTransactions.length) {
        const formatedTransactions: DataListProps[] = allTransactions.map((transaction: DataListProps) => {
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

        setTransactionsList(formatedTransactions)
      }
  }

  useFocusEffect(useCallback(() => {
    getTransactions()
  }, []))

  return (
      <Container>
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
            ammount={"R$ 17.400,00"} 
            lastTransaction={"Última entrada dia 13 de abril"}
          />
          <HighLightsCard 
            type='down'
            title={"Saídas"} 
            ammount={"R$ 7.400,00"} 
            lastTransaction={"Última saída dia 03 de abril"}
          />

          <HighLightsCard 
            type='dollar'
            title={"Total"} 
            ammount={"R$ 10.000,00"} 
            lastTransaction={"01 á 16 de abril"}
          />
        </ScrollHorizontalHightLightCards>

        <Title>Listagem</Title>
        <ScrollVerticalTransactionsCards
          data={transactionsList}
          keyExtractor={ item => item.id}
          renderItem={ ({ item }) => <TransactionCard data={item} />} 
        />
      </Container>
  )
} 