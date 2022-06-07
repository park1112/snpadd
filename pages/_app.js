import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ThemeContext } from '../context/ThemeContext';
import { useState } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [linkId, setLinkID] = useState('');
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    // '세션'은 'getServerSideProps' 또는 'getInitialProps'에서 가져옵니다.
    // 첫 번째 로드 시 깜박임/세션 로드를 방지합니다.
    <ThemeContext.Provider
      value={{ mobileMenuOpen, setMobileMenuOpen, linkId, setLinkID }}
    >
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </ThemeContext.Provider>
  );
}
