import React, { ReactElement, ReactNode } from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import { 
    CategorySelectContainer as Container, 
    HeaderContent, 
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from "./styles";

interface Category {
    name: string;
    key: string;
}

interface Props {
    category: Category;
    setCategory: (name: string) => void;
    closeSelectCategory: () => void;
}

export const CategorySelect = ({category, setCategory, closeSelectCategory}: Props): ReactElement => {

    return (
        <Container>
            <HeaderContent>
                <Title>Categoria</Title>
            </HeaderContent>

            <FlatList
            data={categories}
            renderItem={({ item }) => (
                <Category
                    onPress={() => setCategory(item.name)}
                    isActive={category.name === item.name}
                >
                    <Icon name={item.icon}/>
                    <Name>
                        {item.name}
                    </Name>
                </Category>
            )}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button 
                    title="Selecionar" 
                    activeOpacity={0.7} 
                    onPress={() => closeSelectCategory()}
                    disabled={category.name === 'Categoria'}
                />
            </Footer>
        </Container>
    )
}