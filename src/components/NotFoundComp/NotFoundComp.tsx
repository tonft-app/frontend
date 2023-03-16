import { useNavigate } from "react-router";
import styled from "styled-components";
import { GradientBackground } from "../../pages/BasePage/BasePageStyles";
import { BlueButton } from "../Buttons/Buttons";
import Header from "../Header/Header";
import { ILoadingComponentProps } from "../LodingComponent/LoadingComponent";
import { BoldInterText, RegularInterText } from "../Texts/MainTexts";

const NotFoundPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100%;
`

const BoldText = styled(BoldInterText)`
    align-self: center;
    color: #000;
    margin-bottom: 1rem;
`

const Subtitle = styled(RegularInterText)`
    align-self: center;
    color: #b1b0b0;
    margin-bottom: 3rem;
    font-size: 1.6rem;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    position: absolute;
    transform: translate(-50%, -50%); 
    top: 50%;  
    left: 50%;
    align-self: center;
    width: 100%;

`

export const NotFoundComponent: React.FunctionComponent<ILoadingComponentProps> = ({children}) => {
    const navigate = useNavigate();
    return (
        <NotFoundPageContainer>
            <Header width="90%"/>
            <GradientBackground/>
            <ContentWrapper>
                <BoldText>This Page Does Not Exist</BoldText>
                <Subtitle>Maybe NFT  was sold or canceled</Subtitle>
                <BlueButton width={"10rem"} onClick={() => navigate('/')}>Home</BlueButton>
            </ContentWrapper>
        </NotFoundPageContainer>
    );
}



export default NotFoundComponent;