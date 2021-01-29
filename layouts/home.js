import Head from 'next/head';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </div>
    );
}
