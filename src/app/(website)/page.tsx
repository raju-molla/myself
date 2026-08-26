'use client'
import TampleteOne from './east/page';
import TamplateTwo from './west/page';

const Home: React.FC = () => {
  const flag = 1;
  
  return (
    <>
      {flag == 1 ? <TampleteOne /> : <TamplateTwo />}
    </>
  );
}

export default Home;
