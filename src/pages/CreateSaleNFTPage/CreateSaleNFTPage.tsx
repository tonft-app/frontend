import { Dialog } from '@headlessui/react';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import axios from 'axios';
// @ts-ignore
import CryptoJS from "crypto-js";
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlueButton, GrayBtnWide } from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import { PutOnSaleNFTModal } from '../../components/Modal/PutOnSaleNFTModal/PutOnSaleNFTModal';
import { useMyNFTStore } from '../../state/store';
import { openLink } from '../../utils';
import { GradientBackground } from '../BasePage/BasePageStyles';
import { MyNFTSPageContainer } from '../MyNFTSPage/MyNFTSPageStyles';
import { BuyNFTImage, BuyNFTPageWrapper, CancelSellBtn, CrossedMediumText, InfoContainer, InfoContainerTitle, InfoPointSubtitle, InfoPointTitle, InfoPointWrapper, PriceContainer, PriceMediumText, PriceWrapper, TextInDollars } from './CreateSaleNFTPageStyles';

export const createHashString = () => {
    const hash =  Math.floor(Math.random() * 0xffffff).toString(16).padEnd(16, "0").toUpperCase()
    const timestamp = Math.floor(Date.now() / 1000);
    return hash.slice(0, -8) + timestamp.toString().slice(-8);
}

export interface CreateSaleNFTPageProps { }

const CreateSaleNFTPage = ({} : CreateSaleNFTPageProps) => {  
    const { t, i18n } = useTranslation(); 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const nft = useMyNFTStore(state => state.myNFT)

    const nftAddress = toUserFriendlyAddress(nft.address);
    const nftCollectionAddress = toUserFriendlyAddress(nft.collection.address);
    const nftAddressShort = nftAddress.slice(0, 3) + '...' + nftAddress.slice(-3);
    const ownerAddress = toUserFriendlyAddress(nft.owner.address);
    const ownerAddressShort = ownerAddress.slice(0, 3) + '...' + ownerAddress.slice(-3);

    const [royaltyPercent, setRoyaltyPercent] = useState(0);
    const [royaltyDest, setRoyaltyDest] = useState(null);

    // get royalty percent when open modals
    useEffect(() => {
        axios.get(`https://api.tonft.app/apiv1/getCollectionRoyalty?collectionAddress=${nftCollectionAddress}`)
            .then(function (response) {
                // console.log(response.data);
                setRoyaltyDest(response.data.destination);
                setRoyaltyPercent(response.data.percent);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    if(royaltyDest === null) return <LoadingComponent/>

    return (
        <MyNFTSPageContainer>
            <Dialog className={`w-screen h-screen absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
				<PutOnSaleNFTModal 
                    hash={createHashString()}
                    close={() => setModalIsOpen(false)}
                    nftItemAddress={nftAddress}
                    ownerAddress={ownerAddress}
                    royaltyPercent={royaltyPercent}
                    royaltyDest={royaltyDest}
                />
			</Dialog>
            <BuyNFTPageWrapper>
                <GradientBackground/>
                <Header width="100%"/>
                <BuyNFTImage src={nft.metadata.image} alt="No image found" />
                <BlueButton disabled={nft.sale ? true : false} onClick={() => setModalIsOpen(true)}>{!nft.sale ? t("createSalePage.putOnSaleBtn") : t("createSalePage.alredyOnSaleBtn")}</BlueButton>
                {nft.sale  && <CancelSellBtn  onClick={() => openLink(nft.cancelLink)}>{t("buyPage.cancelBtn")}</CancelSellBtn>}
                <InfoContainer>
                    <InfoContainerTitle>{t("createSalePage.info")}</InfoContainerTitle>
                    <InfoPointWrapper>
                        <InfoPointTitle>{t("createSalePage.name")}</InfoPointTitle>
                        <InfoPointSubtitle >{nft.metadata?.name ? nft.metadata?.name : "Untitled"}</InfoPointSubtitle>
                    </InfoPointWrapper>
                    <InfoPointWrapper>
                        <InfoPointTitle>{t("createSalePage.collection")}</InfoPointTitle>
                        <InfoPointSubtitle>{nft.collection?.name ? nft.collection?.name : "Untitled"}</InfoPointSubtitle>
                    </InfoPointWrapper>
                    <InfoPointWrapper>
                        <InfoPointTitle>{t("createSalePage.ownerAddress")}</InfoPointTitle>
                        <a target="_blank" href={`https://tonscan.org/address/${ownerAddress}`}><InfoPointSubtitle link={true} >{ownerAddressShort}</InfoPointSubtitle></a>
                    </InfoPointWrapper>
                    <InfoPointWrapper>
                        <InfoPointTitle >{t("createSalePage.nftAddress")}</InfoPointTitle>
                        <a href={`https://tonscan.org/nft/${nftAddress}`} target="_blank"><InfoPointSubtitle link={true}>{nftAddressShort}</InfoPointSubtitle></a>
                    </InfoPointWrapper>
                </InfoContainer>
            </BuyNFTPageWrapper>

        </MyNFTSPageContainer>
    )
}

export default CreateSaleNFTPage;