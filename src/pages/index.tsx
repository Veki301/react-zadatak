import { GetServerSideProps, NextPage } from "next";
import NewsContainer from "../components/news/NewsContainer"
import { INews } from "../model/news/INews";
import { fetchNews } from "../util/api";

export interface IHomePageOwnProps {
    news: INews[];
}

const HomePage: NextPage<IHomePageOwnProps> = (props) => {
    return <NewsContainer data={props.news} />;
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const data = await fetchNews(context.query);
    const result = JSON.stringify(data);

    return { props: { news: JSON.parse(result) } }
}

export default HomePage;