import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import NewsView from '../components/news/NewsView';
import { INews } from '../model/news/INews';
import { fetchNews } from '../util/api';

export interface IHomePageOwnProps {}

const HomePage: NextPage<IHomePageOwnProps> = (props) => {
  return <NewsView />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<INews[]>(['news'], fetchNews);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
