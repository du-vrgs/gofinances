import React from "react"
import { HighLightsCard } from "../../components/HighLightsCard"
import { Props, TransactionCard, TransactionCardProps } from "../../components/TransactionCard"

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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard = () => {

  const mockedList: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      ammount: "RS 12.000,00",
      category: { name: 'Vendas', icon: 'dollar-sign'},
      date: "14/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Desenvolvimento de site",
      ammount: "RS 12.000,00",
      category: { name: 'Vendas', icon: 'dollar-sign'},
      date: "14/04/2020"
    },
    {
      id: '3',
      type: 'positive',
      title: "Desenvolvimento de site",
      ammount: "RS 12.000,00",
      category: { name: 'Vendas', icon: 'dollar-sign'},
      date: "14/04/2020"
    },
  ]

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
          data={mockedList}
          keyExtractor={ item => item.id}
          renderItem={ ({ item }) => <TransactionCard data={item} />} 
        />
      </Container>
  )
} 