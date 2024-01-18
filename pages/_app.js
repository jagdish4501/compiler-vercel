import { GameContextProvider } from 'context/fruitbox-flex/GameContext';
import { AppProvider } from 'context/quick-compiler/AppContext';
import { SaveProvider } from 'context/quick-compiler/SaveContext';
import { SettingsProvider } from 'context/quick-compiler/SettingsContext';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import 'styles/index.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script src={`https://www.googletagmanager.com/gtm.js?id=GTM-5NHFSJ5`} />
      <GameContextProvider>
        <AppProvider>
          <SaveProvider>
            <SettingsProvider>
              <Component {...pageProps} />
            </SettingsProvider>
          </SaveProvider>
          <Toaster />
        </AppProvider>
      </GameContextProvider>
    </>
  );
}
