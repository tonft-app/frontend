import { toUserFriendlyAddress } from '@tonconnect/sdk';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoContainerTitle, InfoPointWrapper, InfoPointTitle, InfoPointSubtitle, InfoContainer } from './BuyNFTPageStyles';


export interface InfoContainerCompProps {
    nftTonApi: any;
    offer: any;
    formatAddress: (address: string) => string;
}

const InfoContainerComp = ({
    nftTonApi,
    offer,
    formatAddress
} : InfoContainerCompProps) => {   
    const { t, i18n } = useTranslation();  
    
    return (
        <InfoContainer>
            <InfoContainerTitle>{t("buyPage.info")}</InfoContainerTitle>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.name")}</InfoPointTitle>
                <InfoPointSubtitle>{nftTonApi.metadata?.name ? nftTonApi.metadata?.name : "Untitled"}</InfoPointSubtitle>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.collection")}</InfoPointTitle>
                <InfoPointSubtitle>{nftTonApi.collection?.name ? nftTonApi.collection?.name : "Untitled"}</InfoPointSubtitle>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.nftAddress")}</InfoPointTitle>
                
                <a 
                    href={`https://tonscan.org/nft/${offer.nft_item_address}`} 
                    target="_blank"
                >   
                    <InfoPointSubtitle 
                        link={true}
                    >
                        {formatAddress(offer.nft_item_address)}
                    </InfoPointSubtitle>
                </a>
            </InfoPointWrapper>
            { nftTonApi.collection?.address && 
                <InfoPointWrapper>
                    <InfoPointTitle>{t("buyPage.collectionAddress")}</InfoPointTitle>
                    
                    <a 
                        href={`https://tonscan.org/address/${nftTonApi.collection?.address}`} 
                        target="_blank"
                    >   
                        <InfoPointSubtitle 
                            link={true}
                        >
                            {formatAddress(toUserFriendlyAddress(nftTonApi.collection?.address))}
                        </InfoPointSubtitle>
                    </a>
                </InfoPointWrapper>
            }
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.ownerAddress")}</InfoPointTitle>
                
                <a 
                    href={`https://tonscan.org/nft/${offer.owner_address}`} 
                    target="_blank"
                >   
                    <InfoPointSubtitle 
                        link={true}
                    >
                        {formatAddress(offer.owner_address)}
                    </InfoPointSubtitle>
                </a>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.saleAddress")}</InfoPointTitle>
                
                <a 
                    href={`https://tonscan.org/nft/${offer.contract_address}`} 
                    target="_blank"
                >   
                    <InfoPointSubtitle 
                        link={true}
                    >
                        {formatAddress(offer.contract_address)}
                    </InfoPointSubtitle>
                </a>
            </InfoPointWrapper>
            <InfoPointWrapper>
                <InfoPointTitle>{t("buyPage.nftVerified")}</InfoPointTitle>
                    <InfoPointSubtitle 
                    >
                        {nftTonApi?.verified ? "✅" : "❌"}
                    </InfoPointSubtitle>
            </InfoPointWrapper>
        </InfoContainer>
    )
}

export default InfoContainerComp;