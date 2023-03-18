import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import MenuComponent from '../../components/Menu/Menu';
import NFTCard, { NFTCardHorizontal } from '../../components/NFTCard/NFTCard';
import {  RegularInterText } from '../../components/Texts/MainTexts';
import { connector } from '../../connector';
import { BasePageContainer, BasePageSubtitle, BasePageSubtitleTwo, BasePageTitle, BottomPanelLink, BottomPanelText, GradientBackground, ItemsWrapper, ItemsWrapperHorizontal, MenuItemsWrapper, NavText, NavTextsWrapper,  UnderHeaderInfoWrapper, UnderlinedText } from './BasePageStyles';
// @ts-ignore
import CryptoJS from "crypto-js";
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { useTranslation } from 'react-i18next';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { Statistics } from '../../components/Statistics/Statistics';
export interface BasePageProps { }


const BasePage = ({} : BasePageProps) => { 
    const { t, i18n } = useTranslation(); 
    const [itemsNow, setItemsNow] = useState<"All" | "Sold">("All");
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any>([]);
    const [sold, setSold] = useState<any>([]);
    const [statistics, setStatistics] = useState<any>([]);
    const [sortBy, setSortBy] = useState< "PriceHigh" | "PriceLow" | "DateOld" | "DateNew" >("DateNew");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await axios.get(`https://api.tonft.app/apiv1/getAllOffers`)
                .then(function (res) {
                    setItems(res.data.activeOrders);
                    setSold(res.data.soldOrders);
                    setStatistics(res.data.statistics);
                })
                .catch(function (error) {
                    console.log(error);
                })
          
            setLoading(false);
        }
        fetchData();
    }, []);

    if(loading) return <LoadingComponent/>
    
    return (
        <BasePageContainer>
            {/* <GradientBackground/> */}
            <Header/>
            { connector.wallet && <Statistics mb='-2.7' mt='2.7' savedFees={statistics.totalSavedForUsers.toFixed(0)} volume={statistics.totalSoldAmount.toFixed(0)}/>}
            { connector.wallet 
                ?
                    (   
                        <NavTextsWrapper>
                            <NavText active={true}>{t("mainPage.market")}</NavText>
                            <NavText onClick={() => navigate("/my-nfts")}  active={false}>{t("mainPage.mynfts")}</NavText>
                        </NavTextsWrapper>
                    )   
                : 
                    (
                        <>
                            <BasePageTitle>{t("mainPage.title")}</BasePageTitle>
                        </>
                    )
            }
            {!connector.wallet &&  <Statistics mb="3.5" savedFees={statistics.totalSavedForUsers.toFixed(0)} volume={statistics.totalSoldAmount.toFixed(0)}/>}
            <BasePageSubtitleTwo>{t("mainPage.trending")}</BasePageSubtitleTwo>
            <ItemsWrapperHorizontal>
                { items 
                    ? 
                        items.map((item: any, index: number) => {
                            // console.log(item.collection?.name)
                            const itemsToShow = ["TON Sharks", "CALLIGRAFUTURISM — 24: Units", "kingyTON", "DAOLama TON for NFT", "Hello TON NFT", ]
                            if(!item.metadata) return;
                            // if(!itemsToShow.includes(item.collection?.name)) return
                            if((parseFloat(item?.floor_price) < parseFloat(item?.price)) && !itemsToShow.includes(item.collection?.name)) return

                            return (
                                <NFTCardHorizontal
                                    onClick={() => {
                                        const text = { 
                                            ownerAddress: item.owner_address,
                                            nftItemAddress: toUserFriendlyAddress(item.address),
                                            saleContractAddress: item.contract_address,
                                            hash: item.hash
                                         };
                       
                                        navigate(`/offer/${text.hash}`)
                                    }}
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={item.price}
                                    url={item.metadata?.image ? item.metadata?.image : "Not Found"}
                                    royalty={item.royalty_percent}
                                    referral={item.ref_percent}
                                    floor={item.floor_price}
                                />
                            )
                        }) 
                    : 
                        <RegularInterText>No NFTs Found</RegularInterText>
                }
            </ItemsWrapperHorizontal>
            <MenuItemsWrapper>
               <UnderlinedText transparent={itemsNow ===  "All" && true}><BasePageSubtitle onClick={() => setItemsNow("All")}>{t("mainPage.other")} ({items.length})</BasePageSubtitle></UnderlinedText>
               <UnderlinedText transparent={itemsNow ===  "Sold" && true}><BasePageSubtitle onClick={() => setItemsNow("Sold")}>{t("mainPage.sold")}</BasePageSubtitle></UnderlinedText>
            </MenuItemsWrapper>
            <MenuComponent setSortBy={setSortBy}/>
            <ItemsWrapper>
                { (itemsNow === "All" && items) 
                    &&
                        items.sort((a: any, b: any) => {
                            switch(sortBy) {
                                case "PriceHigh":
                                    return parseFloat(a.price) < parseFloat(b.price) ? 1 : -1;
                                case "PriceLow":
                                    return parseFloat(a.price) > parseFloat(b.price) ? 1 : -1;
                                case "DateOld":
                                    return a.created_at > b.created_at ? 1 : -1;
                                case "DateNew":
                                    return a.created_at < b.created_at ? 1 : -1;
                            }
                        }).map((item: any, index: number) => {
                            if(!item.metadata) return;

                            return (
                                <NFTCard
                                    onClick={() => {
                                        const text = { 
                                            ownerAddress: item.owner_address,
                                            nftItemAddress: toUserFriendlyAddress(item.address),
                                            saleContractAddress: item.contract_address,
                                            hash: item.hash
                                        };
                    
                                        navigate(`/offer/${text.hash}`)
                                    }}
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={item.price}
                                    url={item.metadata?.image ? item.metadata?.image : "Not Found"}
                                    royalty={item.royalty_percent}
                                    referral={item.ref_percent}
                                    floor={item.floor_price}
                                />
                            )
                        }) 
                }
                { (itemsNow === "Sold" && sold) 
                    && 
                        sold.sort((a: any, b: any) => {
                            switch(sortBy) {
                                case "PriceHigh":
                                    return parseFloat(a.price) < parseFloat(b.price) ? 1 : -1;
                                case "PriceLow":
                                    return parseFloat(a.price) > parseFloat(b.price) ? 1 : -1;
                                case "DateOld":
                                    return a.created_at > b.created_at ? 1 : -1;
                                case "DateNew":
                                    return a.created_at < b.created_at ? 1 : -1;
                            }
                        }).map((item: any, index: number) => {
                            if(!item.metadata) return;

                            return (
                                <NFTCard
                                    onClick={() => {
                                        const text = { 
                                            ownerAddress: item.owner_address,
                                            nftItemAddress: toUserFriendlyAddress(item.address),
                                            saleContractAddress: item.contract_address,
                                            hash: item.hash
                                        };
                    
                                        navigate(`/offer/${text.hash}`)
                                    }}
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={item.price}
                                    url={item.metadata?.image ? item.metadata?.image : "Not Found"}
                                    royalty={item.royalty_percent}
                                    referral={item.ref_percent}
                                    floor={item.floor_price}
                                />
                            )
                        }) 
                }
            </ItemsWrapper>
            <BottomPanelText>Need Help? <BottomPanelLink href='https://t.me/TONFTchat'>Community Chat</BottomPanelLink> </BottomPanelText>
        </BasePageContainer>
    )
}

export default trackWindowScroll(BasePage);