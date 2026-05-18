interface ErrorStateProps {
  message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">😔</p>
      <p className="text-red-500 text-lg font-semibold">{message}</p>
    </div>
  );
}

export default ErrorState;
