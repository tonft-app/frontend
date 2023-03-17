import { ReactNode } from "react";
import styled from "styled-components";
import { BoldInterText } from "../../components/Texts/MainTexts";

export const   BasePageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* align-self: center; */
    /* width: 90%; */
    min-height: 100vh;

    @media only screen and (min-width: 480px) {
        width: 100%;
        max-width: 1520px;
    }  
`

export const GradientBackground = styled.div`
    background: linear-gradient(180.04deg, #FFFFFF 11.27%, rgba(228, 228, 228, 0.3) 68.11%, rgba(224, 224, 224, 0.6) 99.97%);
    width: 100vw;
    min-height: 100vh;
    left: 0;
    right: 0;
    height: 100vh;
    position: fixed;
    z-index: -1000;
    /* bottom: 0; */
`
export const BasePageTitle = styled(BoldInterText)`
        color: #000;
        text-align: center;
        font-size: 3.2rem;
        width: 70%;
        margin-top: 3.5rem;
        margin-bottom: 5rem;

        @media only screen and (min-width: 480px) {
            margin-top: 6rem;
            width: 90%;
            text-align: start;
            
        }
`

interface TextWrapperProps {
    transparent: boolean;
}


const TextWrapper = styled.span<TextWrapperProps>`
    position: relative;
    display: inline-block;
    margin-top: 4rem;
    margin-right: 5rem;
    @media only screen and (min-width: 780px) {
        margin-right: 6rem;
    }
    margin-bottom: 2.8rem;
    &::after {
        content: '';
        position: absolute;
        bottom: -7px;
        left: 0;
        right: 0;
        height: 4px;
        background-color: ${({ transparent }) => (!transparent ? 'transparent' : '#0088CC')};
    }
`;


interface UnderlinedTextProps {
    children: ReactNode;
    transparent?:  boolean;
}
  
export const UnderlinedText: React.FC<UnderlinedTextProps> = ({ children, transparent = false }) => {
    return <TextWrapper transparent={transparent}>{children}</TextWrapper>;
};

export const BasePageSubtitle = styled(BoldInterText)`
        cursor: pointer;
        color: #000;
        align-self: center;
        text-align: start;
        font-size: 2.8rem;
       
`

export const BasePageSubtitleTwo = styled(BoldInterText)`
        width: 90%;
        color: #000;
        align-self: center;
        text-align: start;
        font-size: 2.8rem;
        width: 90%;
        /* margin-top: 4.7rem; */
        margin-bottom: 1.6rem;
`

export const ItemsWrapper = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 21rem); 
    @media only screen and (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, 16.7rem); 
    }
    grid-gap: 1rem; 
    justify-content: space-between; 
`

export const ItemsWrapperHorizontal = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: ƒlex-start;
    justify-content: flex-start;
    flex-wrap: no-wrap;
    overflow-x: scroll;
    overflow: -moz-scrollbars-horizontal;; 
`
export const NavTextsWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    align-self: center;
    margin-top: 5.8rem;
    margin-bottom: 5.5rem;
`

export const NavText = styled(BoldInterText)<{active: boolean}>`
    font-size: 2.8rem;
    color: ${props => !props.active ? '#000' : '#0088CC'};
    margin-right: 4.3rem;
    cursor: pointer;
`

export const BottomPanelText = styled(BoldInterText)`
    margin-top: 3rem;
    margin-bottom: 3rem;
    color: #000;
    font-size: 1.8rem;
`

export const BottomPanelLink = styled.a`
    color: #0088CC;
    font-size: 1.8rem;
    cursor: pointer;
    font-weight: 700;
`

export const UnderHeaderInfoWrapper = styled.div`
    margin-top: 5.8rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const MenuItemsWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`
