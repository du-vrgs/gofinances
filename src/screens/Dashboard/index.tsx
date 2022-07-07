import React from "react"
import { HighLightsCard } from "../../components/HighLightsCard"

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
  ScrollHightLightCards
} from "./styles"

export const Dashboard = () => {

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

        <ScrollHightLightCards>
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
        </ScrollHightLightCards>
      </Container>
  )
} 