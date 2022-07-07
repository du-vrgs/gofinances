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
          <HighLightsCard />
          <HighLightsCard />
          <HighLightsCard />
        </ScrollHightLightCards>
      </Container>
  )
} 