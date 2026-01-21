import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Chic Glam
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your one-stop solution for managing your salon.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/dashboard"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/auth/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Login <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
