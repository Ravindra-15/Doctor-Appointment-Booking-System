 
import Header from '../components/Header/Header';  // Correct case-sensitive path
import Footer from '../components/Footer/Footer';  // Correct case-sensitive path
import Routers from '../routes/Routers';          // Make sure this exists
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const Layout1 = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout1;