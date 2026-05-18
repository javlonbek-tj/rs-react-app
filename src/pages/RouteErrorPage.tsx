import { useRouteError } from 'react-router';

function RouteErrorPage() {
  const error = useRouteError();
  console.error('Caught by router errorElement:', error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50">
      <div className="text-6xl mb-6">💥</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-slate-500 text-center max-w-sm mb-8">
        An unexpected error occurred. The details have been logged to the
        console.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-green-500 text-slate-900 rounded-lg hover:bg-green-400 transition-colors font-semibold cursor-pointer"
      >
        Reload page
      </button>
    </div>
  );
}

export default RouteErrorPage;
