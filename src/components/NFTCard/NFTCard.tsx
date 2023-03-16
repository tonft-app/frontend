import React, { useEffect, useState } from 'react';
import { CardImage, CardSubtitle, CardTitle, CardWrapper, CardWrapperHorizontal, CollectionNameText, PriceWithoutDiscount, UpTitle } from './NFTCardStyles';
import DefaultImage from  "../../assets/pictures/noImg.png"
import ImageLoading from  "../../assets/pictures/imgLoading.png"
import { parseFloatPrice } from '../../helpers/helpers';
// @ts-ignore
import encodeImageToBlurhash from "../../helpers/encoder.js"
import { Blurhash } from 'react-blurhash';

export interface NFTCardProps {
    url: string;
    nftName: string;
    nftPrice: string;
    onClick: () => void;
    myNFT?: boolean;
    collectionName?: string;
    royalty?: string;
    referral?: string;
    floor?: string;
}




const NFTCard = ({ url, nftName, nftPrice, onClick, myNFT, collectionName, royalty, referral, floor} : NFTCardProps) => {    
    const nftPriceWithoutDiscount = (parseFloat(nftPrice) * 1.1).toFixed(2);
    const collectionNameAdjusted = collectionName?.length! > 13 ?  `${collectionName?.slice(0,13)}...` : collectionName;
    const nftNameAdjusted = nftName.length! > 13 ?  `${nftName.slice(0,13)}...` : nftName;
    // const [hashUrl, setHashUrl] = useState('U27UC_Tg00D$.AW?E1nN00EA%4~7ISMw%2-p');
    // const [isLoaded, setLoaded] = useState(false);
    // const [isLoadStarted, setLoadStarted] = useState(false);
  
    // const handleLoad = () => {
    //   setLoaded(true);
    // };
  
    // const handleLoadStarted = () => {
    //   console.log("Started: ");
    //   setLoadStarted(true);
    // };

    // useEffect(() => {
    //   async function getHashUrl() {
    //     // console.log('getHashUrl');
    //     const hash = await encodeImageToBlurhash(url);
    //     console.log(hash)
    //     // const hash = await encodeImageToBlurhash(mountain);
    //     // setHashUrl(hash);
    //     // setImage(<Blurhash hash={hashUrl} width={300} height={200} />)
    //   }
    //   getHashUrl();
    // }, []);

    const ipfs = url?.includes("ipfs://") 
    let nftUrl = url;
    if (ipfs) {
        nftUrl = "https://ipfs.io/ipfs/" + nftUrl.split("ipfs://")[1];
    }
    return (
        <CardWrapper onClick={onClick}>
            <CardImage  
                threshold={50}
                effect='blur'
                src={nftUrl} 
                // placeholderSrc={image}
                onError={(e: any) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DefaultImage ;
                }}
                alt="No Image Found"
                // onLoad={handleLoad}
                // beforeLoad={handleLoadStarted}
            />
            {/* {!isLoaded && isLoadStarted && (
                <Blurhash hash={hashUrl} width={300} height={200} />
            )} */}
            <CardTitle>{nftNameAdjusted}</CardTitle>
            {myNFT && <CollectionNameText>{collectionNameAdjusted}</CollectionNameText>}
            {!myNFT && (
                <>  
                    {/* <PriceWithoutDiscount>{parseFloatPrice(nftPriceWithoutDiscount)} TON</PriceWithoutDiscount> */}
                    <CardSubtitle>{parseFloatPrice(nftPrice)} TON</CardSubtitle>
                </>
            )}
            {!myNFT &&  <UpTitle>Ref: {referral}%  Royalty: {royalty}%</UpTitle>}
            {!myNFT &&  <UpTitle floorLower={parseFloat(nftPrice) < parseFloat(floor || "0")} mt="0">Floor: {floor ? `${floor} TON` : "?"}</UpTitle>}
        </CardWrapper>
    )
}
export const NFTCardHorizontal = ({ url, nftName, nftPrice, onClick, myNFT, collectionName, referral, royalty, floor } : NFTCardProps) => {    
    const nftPriceWithoutDiscount = (parseFloat(nftPrice) * 1.1).toFixed(2);
    const collectionNameAdjusted = collectionName?.length! > 13 ?  `${collectionName?.slice(0,13)}...` : collectionName;
    const nftNameAdjusted = nftName.length! > 13 ?  `${nftName.slice(0,13)}...` : nftName;
    const ipfs = url?.startsWith("ipfs://") 
    
    let nftUrl = url;
    
    if (ipfs) {
        nftUrl = "https://ipfs.io/ipfs/" + nftUrl.split("ipfs://")[1];
    }

    return (
        <CardWrapperHorizontal onClick={onClick}>
            <CardImage
                src={ipfs ? nftUrl : url}
                effect='blur'
                placeholderSrc={ipfs ? nftUrl : url}
                onError={(e: any) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DefaultImage ;
                }}
                alt="No Image Found"
            />
            <CardTitle>{nftNameAdjusted}</CardTitle>
            {myNFT && <CollectionNameText>{collectionNameAdjusted}</CollectionNameText>}
            {!myNFT && (
                <>  
                    {/* <PriceWithoutDiscount>{parseFloatPrice(nftPriceWithoutDiscount)} TON</PriceWithoutDiscount> */}
                    <CardSubtitle>{parseFloatPrice(nftPrice)} TON</CardSubtitle>
                </>
            )}
            {!myNFT &&  <UpTitle>Ref: {referral}%  Royalty: {royalty}%</UpTitle>}
            {!myNFT &&  <UpTitle floorLower={parseFloat(nftPrice) < parseFloat(floor || "0")} mt="0">Floor: {floor ? `${floor} TON` : "?"}</UpTitle>}

        </CardWrapperHorizontal>
    )
}

export default NFTCard;