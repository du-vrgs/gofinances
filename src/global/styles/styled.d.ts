import  "styled-components";
import theme from './theme'

// sobreescrever tipos
// declare - acesso ao modulo

declare module 'styled-components' {
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType {}
}