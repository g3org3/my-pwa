import { useNavigate } from '@reach/router';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/activities');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ padding: '0 24px', display: 'flex', flexDirection: 'column' }}
    >
      <h1>Home</h1>
    </div>
  );
};
export default Home;
