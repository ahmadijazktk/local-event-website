import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['600', '700'],
    variable: '--font-poppins',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Localeventdirectory | Verified Global Events & Local Business Discovery',
    description:
        'Discover upcoming global conferences, trade shows, business networking events, and local happenings with verified dates, canonical location hierarchies, and high data trust.',
    metadataBase: new URL('https://localeventdirectory.com'),
    openGraph: {
        title: 'Localeventdirectory | Verified Global Events Marketplace',
        description: 'Clean, calm, verified event and local business discovery platform.',
        type: 'website',
        url: 'https://localeventdirectory.com',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
            <body className="min-h-screen flex flex-col bg-neutral-0 text-neutral-900 font-sans antialiased">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
