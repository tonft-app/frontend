import styled from "styled-components";
import { BoldInterText, RegularInterText } from "../Texts/MainTexts";


export const  StatisticsWrapper = styled.div<{ mb?: string, mt?: string}>`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    align-items: center;
    width: 90%;
    margin-bottom: ${props => props.mb ? props.mb : '0'}rem;
    margin-top: ${props => props.mt ? props.mt : '0'}rem;
`

export const  WidgetWrapper = styled.div<{ flex?: number, mr?: string, ml?: string}>`
    display: flex;
    border-radius: 15px;
    flex: ${props => props.flex ? props.flex : 1};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-color: #F7F9FB;
    padding-left: 1.5rem;
    padding-top: 1.3rem;
    padding-bottom: 1.8rem;
    margin-right: ${ props => props.mr ? props.mr : '0'}rem;
    margin-left: ${ props => props.ml ? props.ml : '0'}rem;
`

export const  WidgetTitle = styled(RegularInterText)`
    color: #191F2F;
    font-size: 1.4rem;
    margin-bottom: .6rem;
`

export const  WidgetSubtitle = styled(BoldInterText)`
    color: #191F2F;
    font-size: 2.4rem;
`

export const TypingContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.4s steps(40) 1s forwards;

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
`;