import Head from 'next/head'
import NavBar from "./NavBar"

const Layout = ({children}) => {
    return ( 
        <>
            <Head>
                <title>The Old School</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
            </Head> 
            <NavBar />   
            {children}     
        </>
     );
}
 
export default Layout;