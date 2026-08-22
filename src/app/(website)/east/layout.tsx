import Footer from "./component/Footer";
import Navbar from "./navbar/page";
// import "../../globals.css";


export default function EastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
      <Navbar/>
        {children}
        <Footer/>
      </>
  );
}
