import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet, polygon } from "viem/chains";
import {safe, injected} from 'wagmi/connectors'
import { SafeEvmWalletConnectors } from "@dynamic-labs-connectors/safe-evm";
import { createClient } from "viem";
import Main from "./Main";
import { GlobalWalletExtension } from "@dynamic-labs/global-wallet";

import {PortabilityProvider} from 'universal-portability'

const config = createConfig({
  chains: [mainnet, polygon],
  multiInjectedProviderDiscovery: true,
  ssr: true,
  connectors: [injected(), safe()],
  //connectors: [injected()],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

const queryClient = new QueryClient();

const App = () => (
  <DynamicContextProvider
    theme="auto"
    settings={{
      environmentId: "",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <WagmiProvider config={config}>

      <QueryClientProvider client={queryClient}>
      <PortabilityProvider>
        <DynamicWagmiConnector>
          <Main />
        </DynamicWagmiConnector>
        </PortabilityProvider>
      </QueryClientProvider>

    </WagmiProvider>
  </DynamicContextProvider>
);

export default App;