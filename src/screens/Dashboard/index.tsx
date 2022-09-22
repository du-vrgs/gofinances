import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighLightsCard } from "../../components/HighLightsCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Loading } from "../../components/Loading";

import { 
  DashboardContainer as Container, 
  Header,
  UserInfo,
  Infos,
  Photo,
  Greeting,
  UserName,
  HeaderWrapper,
  ScrollHorizontalHightLightCards,
  Title,
  AnimatedScrollVerticalTransactionsCards,
  AlertContent
} from "./styles";
import theme from "../../global/styles/theme";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { FloatingInfoButton } from "../../components/FloatingInfoButton";
import { AlertAnimated } from "../../components/AlertAnimated";
import { IconButton } from "../../components/Form/IconButton";
import { DefaultAvatar } from "../../components/DefaultAvatar";

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

  const headerRef = useRef(null);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 250], [250, 120], Extrapolate.CLAMP)
  }))
  const highLightsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 30], [1, 0], Extrapolate.CLAMP),
  }))
  const transanctionsTitleAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value, 
      [0, 250], 
      [400, 200], Extrapolate.CLAMP),
  }))

  const { userInfo, signOut, signOutLoading, storageTransactionsKey } = useAuth();
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

  const hasTransactionsThisType = (transactionType: 'Income' | 'Outcome') => transactionsList.some(transaction => transaction.type === transactionType);

  const getLastTransactionDate = (transactions: DataListProps[], type: 'Income' | 'Outcome') => {

    const transactionsByThisType = transactions.filter((transaction) => transaction.type === type);
    const transactionsTimestamp = transactionsByThisType.map((transaction) => new Date(transaction.date).getTime());
    const lastTransaction = Math.max(...transactionsTimestamp);

    return new Date(lastTransaction).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long'})
  };

  const getTransactions = async () => {
      const storageTransactions = await AsyncStorage.getItem(storageTransactionsKey);
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

  // TO BLOCK BACK BUTTON in ANDROID
  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => true)
  // }, [])

  return (
      <Container>
        {loading
        ? 
          <Loading />
        : 
        <>
          <Header 
            style={headerAnimatedStyle}
            ref={headerRef}
          >
            <HeaderWrapper>
              <UserInfo>
                {userInfo.photo ?
                  <Photo 
                  source={
                    {
                      uri: userInfo?.photo
                    }
                  }
                  />
                :
                <DefaultAvatar />
                }
                <Infos>
                  <Greeting>Olá, </Greeting>
                  <UserName>{userInfo.name}</UserName>
                </Infos>
              </UserInfo>
              {signOutLoading 
              ? 
                <ActivityIndicator 
                  size={20} 
                  color={theme.colors.secondary}
                /> 
              : 
                <IconButton iconName='power' onPress={signOut} />
              }
            </HeaderWrapper>
          </Header>

          <ScrollHorizontalHightLightCards
            style={highLightsAnimatedStyle}
            scrollEventThrottle={16}
          >
            <HighLightsCard 
              type='up'
              title={"Entradas"} 
              ammount={transactionsAmount.income} 
              lastTransaction={hasTransactionsThisType('Income') ? `Última entrada dia ${hightLightsLastUpdate.incomeDate}` : 'Nenhuma transação de saída ainda'}
            />
            <HighLightsCard 
              type='down'
              title={"Saídas"} 
              ammount={transactionsAmount.outcome} 
              lastTransaction={hasTransactionsThisType('Outcome') ? `Última saída dia ${hightLightsLastUpdate.outcomeDate}` : 'Nenhuma transação de entrada ainda'}
            />

            <HighLightsCard 
              type='dollar'
              title={"Total"} 
              ammount={transactionsAmount.total} 
              lastTransaction={""}
            />
          </ScrollHorizontalHightLightCards>

          {transactionsList.length > 0 ?
          <>
            <Animated.View style={
              [{ height: 400, justifyContent: 'flex-end' }, 
              transanctionsTitleAnimatedStyle
            ]}>
              <Title>Listagem</Title>
            </Animated.View>
            <AnimatedScrollVerticalTransactionsCards
              onScroll={scrollHandler}
              scrollEventThrottle={16}

              data={transactionsList}
              keyExtractor={ item => item.id}
              renderItem={ ({ item }) => <TransactionCard data={item} />}
            />
          </>
          :
          <AlertContent>
            <Title type="secondary">Lista de transações vazia</Title>
            <AlertAnimated />
          </AlertContent>
          }
        
        </>}
        <FloatingInfoButton />
      </Container>
  )
} 