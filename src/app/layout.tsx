import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Navbar} from '../components/navbar';
import {Footer} from '../components/footer';
import Protect from '../components/protect';
import RecoilRootContainer from '../components/RecoilRootContainer';
import './globals.css';
import '@/src/styles/variable.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootContainer>
          <Protect>
            <div className="flex h-full relative">
              <Navbar />
              <div className="grow overflow-x-auto overflow-y-auto">
                <div className="mainContainer">{children}</div>
                <Footer />
              </div>
            </div>
          </Protect>
        </RecoilRootContainer>
      </body>
    </html>
  );
};

export default RootLayout;
