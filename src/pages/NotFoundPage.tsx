import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
      <p className="text-8xl font-black text-slate-200 mb-4">404</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Page not found</h1>
      <p className="text-slate-500 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
      >
        Back to Pokemon
      </Link>
    </main>
  );
}

export default NotFoundPage;
