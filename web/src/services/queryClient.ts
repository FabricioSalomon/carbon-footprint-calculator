import {
  QueryClient,
  QueryClientConfig,
  useQueryClient,
} from "@tanstack/react-query";

const queryConfig = {
  retry: 3,
  refetchOnWindowFocus: false,
};

function createQueryClient(config?: QueryClientConfig) {
  return new QueryClient(config);
}

const queryClient = createQueryClient({
  defaultOptions: {
    queries: queryConfig,
  },
});

export { queryConfig, createQueryClient, queryClient, useQueryClient };
