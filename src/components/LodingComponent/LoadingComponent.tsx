import React, { ReactNode } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { GradientBackground } from '../../pages/BasePage/BasePageStyles';
import Header from '../Header/Header';

export interface ILoadingComponentProps {
    children?: ReactNode
}

const LoadingPageContainer = styled.div`
    height: 100vh;
    width: 100vw;

    @media only screen and (min-width: 780px) {
        width: 39rem;
        height: 85rem;
    }

    /* background: linear-gradient(180.04deg, #FFFFFF 11.27%, rgba(228, 228, 228, 0.3) 68.11%, rgba(224, 224, 224, 0.6) 99.97%); */
`

const LoadingWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%); 
    top: 50%;  
    left: 50%;

`

const LoadingComponent: React.FunctionComponent<ILoadingComponentProps> = ({children}) => {
    return (
        <LoadingPageContainer>
            {/* <Header width="90%"/> */}
            <LoadingWrapper>
                <ReactLoading
                    type="bubbles"
                    color={"#0593FF"}
                    height={"5rem"}
                    width={"5rem"}
                    />
            </LoadingWrapper>
        </LoadingPageContainer>
    );
}

export default LoadingComponent;