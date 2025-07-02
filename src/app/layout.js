import './globals.css';
import { Poppins as PoppinsFont } from 'next/font/google';

const poppins = PoppinsFont({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Add the exact weights you need
});

export const metadata = {
  title: 'EcoChallenge',
  description: 'Daily sustainable actions for big impact',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
