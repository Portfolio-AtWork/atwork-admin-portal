const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        role="status"
        aria-label="Carregando"
        className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
