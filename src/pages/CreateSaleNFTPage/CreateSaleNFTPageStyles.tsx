import styled from "styled-components";
import { BlueButton } from "../../components/Buttons/Buttons";
import Header from "../../components/Header/Header";
import { BoldInterText, MediumInterText, RegularInterText } from "../../components/Texts/MainTexts";

export const BuyNFTImage = styled.img`
    object-fit: cover;
    max-height: 37.2rem;
    width: 100%;
    border-radius: 15px 15px 15px 15px;
    margin-top: 4.2rem;
    margin-bottom: 2rem;
`

export const BuyNFTPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    align-self: center;
`

export const PriceContainer = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.9rem 2.2rem;
    border-radius: 15px;
    margin-bottom: 2rem;
`

export const InfoContainer = styled(PriceContainer)`
    margin-top: 2rem;
`

export const PriceMediumText = styled(MediumInterText)`
    margin-bottom: 1.2rem;
    font-size: 1.8rem;
    color: #00000080;
`
export const CrossedMediumText = styled(PriceMediumText)`
    font-size: 2rem;
    text-decoration: line-through;
    text-decoration-color: red;
    text-decoration-thickness: 3px;
`

export const TextInDollars = styled(PriceMediumText)`
    margin: 0;
    margin-left: 1.8rem;
`

export const InfoContainerTitle = styled(BoldInterText)`
    font-size: 1.8rem;
    color: #000;
`

export const InfoPointTitle = styled(BoldInterText)`
    font-size: 1.3rem;
    color: #8A8A93;
`

export const InfoPointSubtitle = styled(RegularInterText)<{link?: boolean}>`
    font-size: 1.7rem;
    color: #000;
    text-decoration: ${({link}) => link ? "underline" : "none"};; 
    cursor:  ${({link}) => link ? "pointer" : "default"};
`
export const InfoPointWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
`

export const PriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

export const CancelSellBtn = styled(BlueButton)`
    margin-top: 1.7rem;
`