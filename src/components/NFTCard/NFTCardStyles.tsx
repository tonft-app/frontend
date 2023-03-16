import styled from "styled-components";
import { BoldInterText, MediumInterText, RegularInterText, SemiBoldInterText } from "../Texts/MainTexts";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const CardWrapper  = styled.div`
   transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
    }
    /* flex: 1; */
    width: 16.7rem;
    /* max-width: 16.7rem; */
    border: 1px solid #E5E8EB;
    padding-bottom: 1rem;
    border-radius: 15px;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2.4rem;
    -webkit-mask-image: -webkit-radial-gradient(white, black); 
    /* margin-left: 1rem; */
    /* margin-right: 1rem; */
    /* margin: auto; */
    cursor: pointer;
    /* z-index: 0; */
    @media only screen and (min-width: 780px) {
        width: 21rem;
        /* margin-right: 0rem; */
        /* margin-left: 0rem; */
        /* margin-right: 0rem; */
    }
`

export const CardWrapperHorizontal = styled.div`
    min-width: 16.7rem;
    border: 1px solid #E5E8EB;
    padding-bottom: 1rem;
    border-radius: 15px;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2.4rem;
    -webkit-mask-image: -webkit-radial-gradient(white, black); 
    cursor: pointer;
    margin-right: 2.5rem;

    @media only screen and (min-width: 780px) {
        margin-right: 2.5rem;
        min-width: 21rem;

    }
`

export const CardImage = styled(LazyLoadImage)`
    object-fit: cover;
    max-height: 16.7rem;
    height: 16.7rem;
    
    /* min-height: 16.7rem; */
    width: 100%;

    @media only screen and (min-width: 780px) {
        /* margin-right: 2.5rem; */
        max-height: 21rem;
        height: 21rem;

    }
`

export const CardTitle = styled(SemiBoldInterText)`
    /* white-space: nowrap; */
    font-size: 1.6rem;
    color: #000;
    margin-top: 1.3rem;
    text-align: left;
    align-self: flex-start;
    margin-left: 1.5rem;
`

export const CardSubtitle = styled(CardTitle)`
    margin-top: 0.4rem;
    font-weight: 700;
`

export const CollectionNameText = styled(MediumInterText)`
    margin-top: 0.3rem;
    font-size: 1.6rem;
    color: #8A8A93;
    text-align: left;
    align-self: flex-start;
    margin-left: 1.5rem;
`

export const PriceWithoutDiscount = styled(CardTitle)`
    margin: 0;
    margin-left: 1.5rem;
    text-decoration: line-through;
    text-decoration-color: red;
    text-decoration-thickness: 1px;
    color: #999999;
    margin-top: 0.7rem;
`

export const UpTitle = styled(MediumInterText)<{ mt?: string, mb?: string, floorLower?: boolean }>`
    font-size: 1.1rem;
    color: ${props => props.floorLower ? "#1BB50E" : "#7B7B85"};
    align-self: flex-start;
    text-align: left;
    margin-left: 1.5rem;
    margin-top: ${props => props.mt ? props.mt : "0.7"}rem;
    margin-bottom: ${props => props.mb ? props.mb : ""}rem;
    /* margin-top: 0.7rem; */
    /* margin-bottom: 1rem; */

    @media only screen and (min-width: 780px) {
        font-size: 1.4rem;
    }
`


export const PriceWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`