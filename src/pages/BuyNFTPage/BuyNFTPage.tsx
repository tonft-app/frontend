import React, { useContext, useEffect, useState } from 'react';
import { BlueButton, DarkGrayButton, GrayBtn } from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import { BoldInterText } from '../../components/Texts/MainTexts';
import { GradientBackground } from '../BasePage/BasePageStyles';
import { BtnAndPriceWrapper, BtnsWrapper, BuyNFTImage, BuyNFTPageContainer, BuyNFTPageWrapper, CrossedMediumText, ImageAndInfoWrapper, InfoContainer, InfoContainerTitle, InfoPointSubtitle, InfoPointTitle, InfoPointWrapper, PriceContainer, PriceMediumText, PriceWrapper, TextInDollars } from './BuyNFTPageStyles';
// @ts-ignore
import CryptoJS from "crypto-js";
import axios from 'axios';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import { connector } from '../../connector';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import InfoContainerComp from './InfoContainer';
import { Dialog } from '@headlessui/react';
import { BuyNFTModal } from '../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import DefaultImage from  "../../assets/pictures/noImg.png"
import ImageLoading from  "../../assets/pictures/imgLoading.png"
import { parseFloatPrice, parseTonFloatPrice } from '../../helpers/helpers';

export interface BuyNFTPageProps { }

const formatAddress = (nftAddress: string) => {
    return nftAddress.slice(0, 3) + '...' + nftAddress.slice(-3)
}

const encrypt = (notFriendlyAddress: string) => {
    return toUserFriendlyAddress(notFriendlyAddress).replace('+', '-').replace('/', '_').split("").reverse().join("");
}

const handleSrc = (src: string) => {

    const ipfs = src.startsWith("ipfs://") 
    if (ipfs) {
        return "https://ipfs.io/ipfs/" + src.split("ipfs://")[1];
    } else {
        return src;
    }

}

const BuyNFTPage = ({} : BuyNFTPageProps) => {  
    const { t, i18n } = useTranslation(); 
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const isMobile = window.innerWidth < 480;
    const [offer, setOffer] = useState<any>();
    const [nftTonApi, setNftTonApi] = useState<any>();
    const [toncoinPrice, setToncoinPrice] = useState<any>();
    const [cancelLink, setCancelLink] = useState<string>("");
    const [buyLink, setBuyLink] = useState<string>("");
    const [isCanelModalOpen, setCancelModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const onBuy = () => {
        isMobile ? window.open(buyLink, '_blank') : setModalIsOpen(true);
    }

    const onShareRefLink = () => {
        const walletAddress = encrypt(connector.wallet?.account?.address || "");
        const refLink = window.location.href + `/${walletAddress}`;
        setIsCopied(true);
        navigator.clipboard.writeText(refLink);
    }

    const cancelOffer = () => {
        isMobile ? window.open(cancelLink, '_blank') : setCancelModalOpen(true);
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        // console.log(searchParams)
        const currentURL = window.location.href;
        const currURLisNewOffer = currentURL.includes("offer");
		const encryptedDataCheck = searchParams.has('owner');
        if (encryptedDataCheck){
            const data = {
                nftItemAddress: searchParams.get('nftItem')!,
                ownerAddress: searchParams.get('owner')!,
                saleContractAddress: searchParams.get('saleContractAddress')!,
            }

            const fetchOffer = async () => {
                try {
                    setLoading(true)
                    const res = await axios.get(`https://api.tonft.app/apiv1/getOffer?nftItemAddress=${data.nftItemAddress}&ownerAddress=${data.ownerAddress}&saleContractAddress=${data.saleContractAddress}`);
                    // console.log(res.data)
                    const nftAddress = res.data.order.nft_item_address;
                    const resTonApi = await axios.get(`https://tonapi.io/v1/nft/getItems?addresses=${nftAddress}`);
                    setNftTonApi(resTonApi.data.nft_items[0])
                    setOffer(res.data.order)
                    setCancelLink(res.data.cancelLink)
                    const toncoinData = await axios.get(` https://api.coingecko.com/api/v3/coins/the-open-network`);
                    setToncoinPrice(toncoinData.data.market_data.current_price.usd);
                    setBuyLink(res.data.buyLink);
                } catch (error) {
                    setError("Offer not found or sold");
                }

                setLoading(false);
            }
            fetchOffer();
        } else if (currURLisNewOffer) {
            const linkArray = window.location.href.split('/');
            const hash = linkArray[4]; 
            const refID = linkArray[5]; 

            const fetchOffer = async () => {
                try {
                    setLoading(true)
                    let res;
                    if(linkArray.length === 6) {
                        res = await axios.get(`https://api.tonft.app/apiv1/offer/${hash}/${refID}`);
                    } else {
                        res = await axios.get(`https://api.tonft.app/apiv1/offer/${hash}`);
                    }
                    // console.log(res.data)
                    const nftAddress = res.data.order.nft_item_address;
                    const resTonApi = await axios.get(`https://tonapi.io/v1/nft/getItems?addresses=${nftAddress}`);
                    setNftTonApi(resTonApi.data.nft_items[0])
                    setOffer(res.data.order)
                    console.log(res.data.order)
                    setCancelLink(res.data.cancelLink)
                    const toncoinData = await axios.get(` https://api.coingecko.com/api/v3/coins/the-open-network`);
                    setToncoinPrice(toncoinData.data.market_data.current_price.usd);
                    setBuyLink(res.data.buyLink);
                } catch (error) {
                    setError("Offer not found or sold");
                }

                setLoading(false);
            }
            fetchOffer();
        }
    }, [])

    if(loading) return <LoadingComponent/>

    return (
        <BuyNFTPageContainer>
            <BuyNFTPageWrapper>
                { isMobile 
                    ? 
                        <>
                            <GradientBackground/>
                            <Header width="100%"/>
                            <BuyNFTImage 
                                // placeholderSrc={ImageLoading}
                                placeholderSrc={handleSrc(nftTonApi.metadata.image)}
                                effect='blur'
                                src={handleSrc(nftTonApi.metadata.image)} 
                                alt="No Image Found" 
                                onError={(e: any) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = DefaultImage ;
                                }}
                            />
                            <PriceContainer>
                                <PriceMediumText>{t("buyPage.description")}: {offer.royalty_percent ? offer.royalty_percent : 0}% Ref: {offer.ref_percent ? offer.ref_percent : 0}%</PriceMediumText>
                                {/* <CrossedMediumText>{parseFloatPrice((parseFloat(offer.price) * 1.1).toString())} TON</CrossedMediumText> */}
                                <PriceWrapper>
                                    <BoldInterText color='#000' fontSize={2.4}>{parseFloatPrice(offer.price)} TON</BoldInterText>
                                    <TextInDollars>{(parseTonFloatPrice((parseFloat(offer.price) * toncoinPrice).toString()))} $</TextInDollars>
                                </PriceWrapper>
                            </PriceContainer>
                            {offer.status === "sold" &&  <BlueButton disabled={true}>Item Sold</BlueButton>}
                            {offer.status === "canceled" &&  <BlueButton disabled={true}>Item Canceled</BlueButton>}
                            {(offer.status === "active" && connector.wallet && offer.owner_address === toUserFriendlyAddress(connector.wallet?.account.address))  &&  <BlueButton onClick={() => cancelOffer()}>Cancel Offer</BlueButton>}
                            {offer.status === "active" && ( connector.wallet ? offer.owner_address !== toUserFriendlyAddress(connector.wallet?.account.address) : true) &&  <BlueButton onClick={() => onBuy()}>Buy</BlueButton>}
                            {offer.status === "active" && connector.wallet &&  <DarkGrayButton  onClick={() => onShareRefLink()}>{isCopied ? "Copied" : t("buyPage.refBtn")}</DarkGrayButton>}
                            <InfoContainerComp
                                nftTonApi={nftTonApi}
                                offer={offer}
                                formatAddress={formatAddress}
                            />
                        </>
                    : 
                        <>  
                            <Dialog className={`w-full h-full  absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                                <BuyNFTModal close={() => setModalIsOpen(false)} link={buyLink}/>
                            </Dialog>
                            <Dialog className={`w-full h-full  absolute bg-black bg-opacity-50 top-0 flex justify-center items-center`} open={isCanelModalOpen} onClose={() => setCancelModalOpen(false)}>
                                <BuyNFTModal close={() => setCancelModalOpen(false)} link={cancelLink}/>
                            </Dialog>
                            <GradientBackground/>
                            <Header width="100%"/>
                            <ImageAndInfoWrapper>
                                <BuyNFTImage 
                                    placeholderSrc={handleSrc(nftTonApi.metadata.image)}
                                    effect='blur'
                                    src={handleSrc(nftTonApi.metadata.image)} 
                                    alt="No Image Found" 
                                    onError={(e: any) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = DefaultImage ;
                                    }}
                                />
                                <InfoContainerComp
                                    nftTonApi={nftTonApi}
                                    offer={offer}
                                    formatAddress={formatAddress}
                                />
                            </ImageAndInfoWrapper>
                            <BtnAndPriceWrapper>
                                {offer.status === "sold" &&  <BlueButton  width='60rem' disabled={true}>Item Sold</BlueButton>}
                                {offer.status === "canceled" &&  <BlueButton  width='60rem' disabled={true}>Item Canceled</BlueButton>}
                                <BtnsWrapper>
                                    {(offer.status === "active" && connector.wallet && offer.owner_address === toUserFriendlyAddress(connector.wallet?.account.address)) && <BlueButton width='60rem' onClick={() => cancelOffer()}>{t("buyPage.cancelBtn")}</BlueButton>}
                                    {offer.status === "active" && ( connector.wallet ? offer.owner_address !== toUserFriendlyAddress(connector.wallet?.account.address) : true)  &&  <BlueButton width='60rem' onClick={() => onBuy()}>{t("buyPage.buyBtn")}</BlueButton>}
                                    {offer.status === "active" && connector.wallet &&  <DarkGrayButton  onClick={() => onShareRefLink()}>{isCopied ? "Copied" : t("buyPage.refBtn")}</DarkGrayButton>}
                                </BtnsWrapper>
                                <PriceContainer>
                                    <PriceMediumText>{t("buyPage.description")}: {offer.royalty_percent ? offer.royalty_percent : 0}% Ref: {offer.ref_percent ? offer.ref_percent : 0}%</PriceMediumText>
                                    {/* <CrossedMediumText>{parseFloatPrice((parseFloat(offer.price) * 1.1).toString())} TON</CrossedMediumText> */}
                                    <PriceWrapper>
                                        <BoldInterText color='#000' fontSize={2.4}>{parseFloatPrice(offer.price)} TON</BoldInterText>
                                        <TextInDollars>{(parseTonFloatPrice((parseFloat(offer.price) * toncoinPrice).toString()))} $</TextInDollars>
                                    </PriceWrapper>
                                </PriceContainer>
                            </BtnAndPriceWrapper>
                        </>
                }
            </BuyNFTPageWrapper>
        </BuyNFTPageContainer>
    )
}

export default BuyNFTPage;