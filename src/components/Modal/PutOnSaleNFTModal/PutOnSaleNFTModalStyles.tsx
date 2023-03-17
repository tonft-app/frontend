import { Dialog } from "@headlessui/react"
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/20/solid"
import styled from "styled-components"
import { BlueButton, GrayBtnWide } from "../../Buttons/Buttons"
import { BoldInterText, MediumInterText, RegularInterText } from "../../Texts/MainTexts"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"


export const DialogStyled = styled(Dialog.Panel)`
    padding: 10rem 2.8rem;
	background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    position: relative;
    ;
    @media only screen and (min-width: 480px){
        width: 40rem;
        height: 85%;
        border-radius: 15px;
    }
`

export const DialogStyledScroll = styled(DialogStyled)`
    overflow-y: scroll;
`

export const CloseIcon = styled(XMarkIcon)`
    cursor: pointer;
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    top: 2rem;
    left: 2rem;
`

export const DoneIcon = styled(CheckCircleIcon)`
    width: 3.5rem;
    height: 3.5rem;
`

export const Title = styled(BoldInterText)`
    font-size: 2.8rem;
    color: #000;
    align-self: flex-start;
`


export const InfoTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2.7rem;
`

export const LeftText = styled(MediumInterText)`
    font-size: 1.6rem;
    color: #7B7B85;
`

// export const LeftTextSwitcher = styled(LeftText)``

export const RightText = styled(MediumInterText)`
    font-size: 1.6rem;
    color: #000;
`

export const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #00000033;
    margin-bottom: 2.7rem;
`

export const PutOnSaleBtn = styled(BlueButton)`
    margin-top: 2.5rem;
`

export const MyStyledInput = styled.input`
    width: 100%;
    height: 4.7rem;
    border-color: #E5E8EB;
    background-color: #FAFAFC;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    color:#00000080;
    font-size: 1.6rem;
    padding: 1.5rem 1.5rem;; 
    margin-bottom: 3rem;
    margin-top: 1.8rem;
    outline: none;
`

export const MyStyledRefInput = styled.input`
    margin-left: -4rem;
    width: 7.7rem;
    height: 4.7rem;
    border-color: #E5E8EB;
    background-color: #FAFAFC;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    color:#00000080;
    font-size: 1.6rem;
    padding: 1.5rem 1.5rem;
    text-align: center;
    /* margin-bottom: 3rem; */
    /* margin-top: 1.8rem; */
    outline: none;
`
export const MyStyledInputSearch = styled.input`
  
    width: 100%;
    height: 4.7rem;
    border-color: #E5E8EB;
    background-color: #FAFAFC;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    color:#00000080;
    font-size: 1.6rem;
    padding: 1.5rem 1.5rem;
    padding-left: 4.5rem;
    /* margin-bottom: 3rem; */
    /* margin-top: -3rem; */
    outline: none; 
`

export const SearchIcon = styled(MagnifyingGlassIcon)`
    position: absolute;
    left: 1.3rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;

`
export const SearchWrapper = styled.div`
    margin-bottom: 3rem; 
    margin-top: -3rem; 
    width: 90%;
    position: relative;
    height: 4.7rem;
`

export const MyStyledInputSearchComp = () => {
    return (
        <SearchWrapper>
            <MyStyledInputSearch />
                <SearchIcon />
        </SearchWrapper>
    )
}


export const CustomErrorText = styled(RegularInterText)`
    color: red;
    font-size: 1.4rem;
    align-self: flex-start;
    margin-top: 2rem;
`

export const TransactionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 3rem;
`

export const TransactionInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 2.5rem;
`

export const TransactionTitle = styled(MediumInterText)`
    font-size: 1.8rem;
    color: #000;
`

export const TransactionSubtitle = styled(MediumInterText)`
    font-size: 1.8rem;
    color: #7B7B85;
`

export const CancelBtnWide = styled(GrayBtnWide)`
    position: absolute;
    bottom: 2.8rem;
    width: 90%;

    @media only screen and (min-width: 480px){
        /* width: 100%; */
        position: absolute;
        right: 50%;  /* position the top  edge of the element at the middle of the parent */
        left: 50%; /* position the left edge of the element at the middle of the parent */
        bottom: 0rem;
        transform: translate(-50%, -50%); 
    }
    /* left: 3rem; */
    /* right: 3rem; */
`

export const ConfirmBtn = styled(BlueButton)`
    margin-top: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.6rem ;
    border-radius: 10px;
`

