import { NavLinks } from '../components/NavLinks'

export default function NavLayout({children}:{children: React.ReactNode}) {
    return (
        <>
            <nav className='h-20 flex items-center'>
                <NavLinks />
            </nav>

            <main>{children}</main>
        </>
    );
};