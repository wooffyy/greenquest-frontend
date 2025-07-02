import './globals.css';
import { Poppins as PoppinsFont } from 'next/font/google';
import SessionWrapper from '../components/SessionWrapper'; // <-- Make sure this path matches

const poppins = PoppinsFont({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'EcoChallenge',
  description: 'Daily sustainable actions for big impact',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
