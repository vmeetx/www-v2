import Header from '../sections/Header';
import Footer from '../sections/Footer';
import Stats from '../components/Stats.tsx';
import Try from '../components/Try.tsx';
import Info from '../components/Info.tsx';

const MainPage = () => {
  return (
    <>
      <Header />
      <Info />
      <Stats />
      <Try />
      <Footer />
    </>
  );
};

export default MainPage;
