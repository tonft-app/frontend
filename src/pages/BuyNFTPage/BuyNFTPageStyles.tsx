import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import { BoldInterText, MediumInterText, RegularInterText } from "../../components/Texts/MainTexts";

export const BuyNFTImage = styled(LazyLoadImage)`
    object-fit: cover;
    min-height: 37.2rem;
    /* max-height: 37.2rem; */
    /* height: 37.2rem; */
    width: 100%;
    border-radius: 15px 15px 15px 15px;
    margin-top: 4.2rem;
    margin-bottom: 2rem;

    @media only screen and (min-width: 480px) {
        width: 60rem;
        height: 60rem;
        max-height: 60rem;
        margin: 0;
    } 
`



export const BuyNFTPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ImageAndInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: 60rem;
    /* height: 100%; */
`

export const BtnAndPriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
`

export const BuyNFTPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    min-height: 100vh;
    align-self: center;

    @media only screen and (min-width: 480px) {
        max-width: 1520px;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
    }   
`

export const PriceContainer = styled.div`
    /* width: 100%; */
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.9rem 2.2rem;
    border-radius: 15px;
    margin-bottom: 2rem;

    @media only screen and (min-width: 480px) {
        flex: 1;
        margin: 0;
        margin-left: 5rem;
       /* width: 100%; */
    }  
    @media only screen and (max-width: 480px) {
       width: 100%;
    }  
`

export const InfoContainer = styled(PriceContainer)`
    margin-top: 2rem;;
    @media only screen and (min-width: 480px) {
       width: 100%;
       height: 100%;
       margin: 0;
       margin-left: 5rem;
    } 
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
export const BtnsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

