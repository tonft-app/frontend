import { Dialog, Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { DialogStyled, CloseIcon, Title, MyStyledInput, InfoTextWrapper, LeftText, RightText, Line, PutOnSaleBtn, CustomErrorText, TransactionWrapper, TransactionInfoWrapper, TransactionTitle, TransactionSubtitle, CancelBtnWide, ConfirmBtn, DoneIcon, DialogStyledScroll, MyStyledRefInput } from "./PutOnSaleNFTModalStyles";
import ReactLoading from "react-loading";
import axios from "axios";
import { connector } from "../../../connector";
import QRCode from "react-qr-code";
// @ts-ignore
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { parseFloatPriceFloat } from "../../../helpers/helpers";
import LoadingComponent from "../../LodingComponent/LoadingComponent";
import { usePutOnSaleState } from "../../../state/store";

interface PutOnSaleNFTModalProps {
	close: () => void;
    nftItemAddress: string;
    ownerAddress: string;
    royaltyPercent: number;
    royaltyDest: string;
    hash: string;
}

interface FormData {
    price: string;
    refAmount: string;
}

export const PutOnSaleNFTModal = ({ close, nftItemAddress, ownerAddress, royaltyPercent, hash, royaltyDest }: PutOnSaleNFTModalProps) => {
    const { t, i18n } = useTranslation(); 
    const navigate = useNavigate();
    const isMobile =  window.innerWidth < 768;
    const defaultValues: FormData = {
        price: "",
        refAmount: "2.5"
    };
    const initContractRequestsLeft = useRef(0);
    const nftTransferRequestsLeft = useRef(0);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ defaultValues });
    const [lastStep, setLastStep] = useState(false);
    const [initLink, setInitLink] = useState("");
    const [transferLink, setTransferLink] = useState("");
    const [contractInitialized, setContractInitialized] = useState(false);
    const contractAddressRef = useRef("");
    // const [transfered, setTransfered] = useState(false);
    const initLinkCreatedAt = useRef<any>();
    const rightPrice = useRef<number>();
    const [enabled, setEnabled] = useState(true);
    const setSaleState = usePutOnSaleState(state => state.setMyOnSaleState);
    const saleState = usePutOnSaleState(state => state.putOnSaleState);
    const transfered = saleState.transfered;
    const [minPriceError, setMinPriceError] = useState(false);

    const onSubmit = async (data: FormData) => {
        // substract from price very small random amount
        // const priceNow = parseFloatPriceFloat((parseFloat(watch("price")) * (1 - parseFloat(watch("refAmount")) / 100)) - (parseFloat(watch("price"))) * ( enabled ? royaltyPercent : 0));
        const priceNow = watch("price") ? parseFloatPriceFloat((parseFloat(watch("price")) * (1 - parseFloat(watch("refAmount")) / 100)) - (parseFloat(watch("price")) * ( enabled ? royaltyPercent : 0)  / 100)) : 0
        if(priceNow < 1) {
            console.log("price now: ", priceNow)
            setMinPriceError(true);
            return;
        }
        const randomNumber = Math.floor(Math.random() * (0.0099 * 1000 - 0.001 * 1000) + 0.001 * 1000) / 1000;
        if(parseFloat(data.price) < 1) {
            setMinPriceError(true);
            return;
        }

        let newSalePrice = 0; 
        newSalePrice =  parseFloat((parseFloat(data.price) + randomNumber).toFixed(6));
        rightPrice.current = newSalePrice;
        // send data to backend using axios
        // reverse nft item address
        
        await axios.get(`https://api.tonft.app/apiv1/getInitLink?nftItemAddress=${nftItemAddress}&fullPrice=${newSalePrice}&royaltyPercent=${enabled ? royaltyPercent : 0}&royaltyAddress=${royaltyDest}&refPercent=${watch("refAmount")}`)
            .then(function (response) {
                const unixTime = Math.floor(new Date().getTime() / 1000);
                const link = response.data.link;
                setLastStep(true);
                setInitLink(link);
                setSaleState((state: any) => ({...state, refAmount: watch("refAmount")}));
                initLinkCreatedAt.current = unixTime;
                initContractRequestsLeft.current = 120;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const updateContractState = useCallback(async () => {
        if (initContractRequestsLeft.current <= 0) {
            return;
        }

        initContractRequestsLeft.current -= 1;

        axios.get(`https://api.tonft.app/apiv1/checkInit?ownerAddress=${ownerAddress}&createdAt=${initLinkCreatedAt.current}}`)
			.then(function (response) {
                if(response.data.initialized === true){
                    const contractAddress = response.data.contractAddress;
                    axios.get(`https://api.tonft.app/apiv1/getTransferLink?nftItemAddress=${nftItemAddress}&contractAddress=${contractAddress}`)
                    .then(function (response) {
                        // console.log(response);
                        // console.log(response.data, "transfer link");
                        setTransferLink(response.data.link);
                        contractAddressRef.current = contractAddress;
                        nftTransferRequestsLeft.current = 120;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                    initContractRequestsLeft.current = 0;
                    setContractInitialized(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTransferState = useCallback(async () => {
        if (nftTransferRequestsLeft.current <= 0) {
            return;
        }

        initContractRequestsLeft.current -= 1;

        axios.get('https://api.tonft.app/apiv1/checkTransfer', { params: { 
            contractAddress: contractAddressRef.current,
            nftItemAddress: nftItemAddress,
            ownerAddress: ownerAddress,
            createdAt: initLinkCreatedAt.current,
            price: rightPrice.current,
            royaltyPercent: saleState.royaltyOn ? saleState.royaltyOn : 0,
            royaltyAddress: saleState.royaltyOn ? royaltyDest : "EQC1cUOzBT0xfWiaKYGh-IEUeH7RjBvTxwfMJLEVNKKKtsJX",
            refPercent: saleState.refAmount,
            hash: hash
        } })
			.then(function (response) {
                // console.log(enabled, "ROyalty");
                // console.log(saleState.royaltyOn, "ROyalty RIght");
                // console.log(response.data, "init contract initizalization state");
                if(response.data.transfered === true){
                    setSaleState((state: any) => ({...state, transfered: true}))
                    // setTransfered(true);
                    nftTransferRequestsLeft.current = 0;
                    navigate(`/offer/${response.data.hash}`)
                }

                return;

            })
            .catch(function (error) {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(initContractRequestsLeft.current > 0) {
                setInterval(updateContractState, 5000);
        }

    }, [updateContractState, lastStep]);

    useEffect(() => {
        if(saleState.transfered === true){
            setSaleState((state: any) => ({ state, transfered: false }))
            return;
        }
        if(nftTransferRequestsLeft.current > 0) {
            setInterval(updateTransferState, 5000);
        }
    }, [updateTransferState, transferLink]);

    
    if(lastStep){
        return (
            <Dialog.Panel as={DialogStyledScroll}>
                <CloseIcon onClick={close} />
                <Title>{t("createSalePage.secondModalTitle")}</Title>
                <TransactionWrapper>
                    {  !contractInitialized 
                        ?
                            <ReactLoading
                                type="spin"
                                color={"#0593FF"}
                                height={"6rem"}
                                width={"6rem"}
                            />
                        : 
                            <DoneIcon/>
                    }
                    <TransactionInfoWrapper>
                        {!contractInitialized && <TransactionTitle>{t("createSalePage.firstStepTitleOne")}</TransactionTitle>}
                        {contractInitialized && <TransactionTitle>{t("createSalePage.firstStepTitleTwo")}</TransactionTitle>}
                        {!contractInitialized && <TransactionSubtitle>{t("createSalePage.firstStepSubtitleOne")}</TransactionSubtitle>}
                        {contractInitialized && <TransactionSubtitle>{t("createSalePage.firstStepSubtitleTwo")}</TransactionSubtitle>}
                        {
                            !contractInitialized && (
                                <>
                                    <ConfirmBtn 
                                        onClick={() => {
                                            window.open(initLink, '_blank');
                                        }
                                    }>{t("createSalePage.confirm")}</ConfirmBtn>
                                    { !isMobile && 
                                        <QRCode
                                            size={256}
                                            className="mt-8 h-[100%] max-w-[100%]"
                                            value={initLink}
                                            viewBox={`0 0 256 256`}
                                        />
                                    
                                    }
                                </>
                            )
                        }
                        
                    </TransactionInfoWrapper>
                </TransactionWrapper>
            
                { true  && 
                    <TransactionWrapper>
                        {!transfered 
                            ?
                                <ReactLoading
                                    type="spin"
                                    color={"#0593FF"}
                                    height={"12rem"}
                                    width={"12rem"}
                                />
                            : 
                                <DoneIcon/>
                        }
                        <TransactionInfoWrapper>
                            <TransactionTitle>{t("createSalePage.secondStepTitle")}</TransactionTitle>
                            <TransactionSubtitle>{t("createSalePage.secondStepSubtitle")}</TransactionSubtitle>
                            { contractInitialized && transferLink && (
                                <ConfirmBtn
                                    onClick={() => {
                                        window.open(transferLink, '_blank');
                                    }}
                                >
                                    {t("createSalePage.confirm")}
                                </ConfirmBtn>
                            )}
                            { (!isMobile && contractInitialized && transferLink) && 
                                <QRCode
                                    size={256}
                                    className="mt-8 h-[100%] max-w-[100%]"
                                    value={transferLink}
                                    viewBox={`0 0 256 256`}
                                />
                            
                            }
                        </TransactionInfoWrapper>
                    </TransactionWrapper>
                }
            </Dialog.Panel>
        )
    }
    
	return (
		<Dialog.Panel as={DialogStyled}>
            <CloseIcon onClick={close} />
            <Title>{t("createSalePage.enterPrice")}</Title>
            <MyStyledInput maxLength={7} type="number"  {...register('price', {required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/})} placeholder="Enter price"/>
            <InfoTextWrapper>
                <LeftText>{t("createSalePage.serviceFee")}</LeftText>
                <RightText> {watch("refAmount")}% - { watch("price") ? parseFloatPriceFloat(parseFloat(watch("price")) * parseFloat(watch("refAmount")) / 100) : 0} TON</RightText>
                <MyStyledRefInput maxLength={2} type="number" {...register('refAmount', {required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/})} placeholder="Enter custom ref amount if you want"/>
            </InfoTextWrapper>
            <InfoTextWrapper>
                <LeftText>{t("createSalePage.royalties")}</LeftText>
                <RightText>{royaltyPercent}% -  {enabled && watch("price") ?  `${parseFloatPriceFloat((royaltyPercent / 100) * parseFloat(watch("price")))}` : "0"} TON</RightText>
                <Switch
                    checked={saleState.royaltyOn}
                    // disabled={true}
                    onChange={() => {
                        setEnabled(!enabled);
                        setSaleState({
                            royaltyOn: !saleState.royaltyOn
                        })
                    }}
                    className={`${
                        enabled ? 'bg-[#0593FF]' : 'bg-gray-200'
                    } relative inline-flex h-[3rem] w-[5rem] items-center rounded-full ml-[-5rem]`}
                    >
                    <span
                        className={`${
                        enabled ? 'translate-x-10' : 'translate-x-2'
                        } inline-block h-[2rem] w-[2rem] transform rounded-full bg-white transition`}
                    />
                </Switch>
            </InfoTextWrapper>
   
            <Line />
            <InfoTextWrapper>
                <LeftText>{t("createSalePage.recieve")}</LeftText>
                <RightText>{ watch("price") ? parseFloatPriceFloat((parseFloat(watch("price")) * (1 - parseFloat(watch("refAmount")) / 100)) - (parseFloat(watch("price")) * ( enabled ? royaltyPercent : 0)  / 100)) : 0} TON</RightText>
            </InfoTextWrapper>
            <PutOnSaleBtn onClick={handleSubmit(onSubmit)}>{t("createSalePage.putOnSaleBtn")}</PutOnSaleBtn>
            {errors.price && <CustomErrorText>{t("createSalePage.enterNumber")}</CustomErrorText>}
            {minPriceError && <CustomErrorText>Min 1 TON</CustomErrorText>}
		</Dialog.Panel>
	)
}

