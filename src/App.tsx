import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
