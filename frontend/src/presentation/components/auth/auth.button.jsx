const AuthButton = ({ children, onClick, loading, type = "submit" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full py-3.5 bg-primary text-white font-medium rounded-2xl
        hover:bg-primary-hover transition-all duration-300 transform hover:scale-[1.01]
        active:scale-[0.99] shadow-soft disabled:opacity-60 disabled:cursor-not-allowed
        text-sm tracking-wide"
    >
      {loading ?
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </span>
      : children}
    </button>
  );
};

export default AuthButton;
