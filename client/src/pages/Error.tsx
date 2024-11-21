import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="flex flex-col items-center text-center p-8 rounded-lg shadow-lg bg-white text-gray-800 max-w-md">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M11.25 9.75a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm.75 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm9.75-8.25a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg mb-6">
          We couldn't process your request. Please try again later.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary btn-wide"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default Error;
