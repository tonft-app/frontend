import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/LodingComponent/LoadingComponent';
import MenuComponent from '../../components/Menu/Menu';
import { MyStyledInputSearch } from '../../components/Modal/PutOnSaleNFTModal/PutOnSaleNFTModalStyles';
import NFTCard from '../../components/NFTCard/NFTCard';
import { RegularInterText } from '../../components/Texts/MainTexts';
import { connector } from '../../connector';
import { useMyNFTStore } from '../../state/store';
import UserContext from '../../state/userState';
import { BasePageContainer, GradientBackground, NavTextsWrapper, NavText, ItemsWrapper, BottomPanelLink, BottomPanelText } from '../BasePage/BasePageStyles';

interface FormData {
    search: string;
}
export interface MyNFTSPageProps { }

const MyNFTSPage = ({} : MyNFTSPageProps) => {   
    const setMyNFT = useMyNFTStore(state => state.setMyNFT)
    const { t, i18n } = useTranslation();  
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<any>([]);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors, } } = useForm<FormData>();

    const filteredItems = items.filter((item: any) => {
        if(!watch("search")) return true;
        
        const nftName = item.metadata?.name ? item.metadata?.name.toLowerCase() : "untitled";
        return nftName.includes(watch("search"))
    });

    useEffect(() => {
        const fetchData = async () => {
            const address = connector.wallet?.account.address;
            setLoading(true);
            const res = await axios.get(`https://api.tonft.app/apiv1/getUserNfts?userAddress=${address}`);
            // console.log(res.data);
            setItems(res.data.nfts);
            setLoading(false);
        }
        fetchData();
    }, []);

    if(loading) return <LoadingComponent/>
        
    return (
        <BasePageContainer>
            <GradientBackground/>
            <Header/>
            <NavTextsWrapper>
                <NavText active={false} onClick={() => navigate("/")}>{t("myNFTSPage.market")}</NavText>
                <NavText active={true}>{t("myNFTSPage.mynfts")}</NavText>
            </NavTextsWrapper>
            <MyStyledInputSearch maxLength={7}  {...register('search')} placeholder="🔎 Search"/>
            {/* <MenuComponent/> */}
            <ItemsWrapper>
                { items 
                    ? 
                        filteredItems.map((item: any, index: number) => {
                            return (
                                <NFTCard
                                    onClick={() => {
                                        userContext.userDispatch({ type: 'createSale', payload: item })
                                        setMyNFT(item)
                                        navigate(`/create-sale`)}
                                    }
                                    key={index}
                                    nftName={item.metadata?.name ? item.metadata?.name : "Untitled"}
                                    nftPrice={"30"}
                                    url={item.metadata.image}
                                    myNFT={true}
                                    collectionName={item.collection?.name ? item.collection?.name : "No Collection Name"}
                                />
                            )
                        }) 
                    : 
                        <RegularInterText>{t("myNFTSPage.notFound")}</RegularInterText>
                }
            </ItemsWrapper>
            <BottomPanelText>Need Help? <BottomPanelLink href='https://t.me/TONFTchat'>Community Chat</BottomPanelLink> </BottomPanelText>
        </BasePageContainer>
    )
}

export default MyNFTSPage;