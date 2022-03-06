import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "../components/common/AppLayout";

const reactQueryClient = new QueryClient();

const App: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
    return (
    <QueryClientProvider client={reactQueryClient}>
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    </QueryClientProvider>
    );
}

export default App;