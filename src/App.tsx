import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Router from "./components/navigation/Router";

// QueryClient fuera del componente para evitar recreación
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos - datos considerados frescos
      gcTime: 10 * 60 * 1000, // 10 minutos - tiempo de caché en memoria
      refetchOnWindowFocus: false, // No refetch al volver a la pestaña
      refetchOnMount: false, // NO refetch al montar si hay datos en caché
      refetchOnReconnect: false, // No refetch al reconectar
      retry: 1, // Reintentar una vez si falla
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
export default App;
