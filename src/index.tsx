import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import GlobalStyles from './globalStyles';
import './i18n'
import LoadingComponent from './components/LodingComponent/LoadingComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );

const theme = {
  dark: "#121616"
}

root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingComponent/>}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <App />
          </ThemeProvider>
        </RecoilRoot>
    </Suspense>
  </React.StrictMode>
);

