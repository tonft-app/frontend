import { createGlobalStyle } from 'styled-components';

import InterRegular from './assets/fonts/Inter/static/Inter-Regular.ttf'
import InterMedium from './assets/fonts/Inter/static/Inter-Medium.ttf'
import InterSemiBold from './assets/fonts/Inter/static/Inter-SemiBold.ttf'
import InterBold from './assets/fonts/Inter/static/Inter-Bold.ttf'


export default createGlobalStyle`
    @font-face {
        font-family: "Inter", sans-serif;
        src: local('Inter'), local('Inter'), 
            url(${InterRegular}) format('ttf');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "Inter", sans-serif;
        src: local('Inter'), local('Inter'), 
            url(${InterMedium}) format('ttf');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: "Inter", sans-serif;
        src: local('Inter'), local('Inter'), 
            url(${InterSemiBold}) format('ttf');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: "Inter", sans-serif;
        src: local('Inter'), local('Inter'), 
            url(${InterBold}) format('ttf');
        font-weight: 700;
        font-style: normal;
    }

    #root {
        @media only screen and (min-width: 480px) {
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: "Inter", sans-serif;
        font-size: 10px;

        font-size: calc((100vw / 2220) * 10);

        @media only screen and (max-width: 1920px) {   
            font-size: calc((100vw / 1920) * 10);
        } 

        @media only screen and (max-width: 1520px) {   
            font-size: calc((100vw / 1520) * 10);
        } 

        @media only screen and (max-width: 480px) {  
            font-size: calc(100vw / 400 * 10);
        }
    }
`;