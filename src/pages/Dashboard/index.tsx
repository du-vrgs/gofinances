import React from "react"

import { 
  DashboardContainer as Container, 
  Header,
  UserInfo,
  Infos,
  Photo,
  Greeting,
  UserName,
  Icon,
  HeaderWrapper
} from "./styles"

export const Dashboard = () => {

  return (
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
      <Container />
    </>
  )
} 