"use client"; // Mark as a client component
import { ErrorInfo, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function ErrorBoundary({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);

      router.push("/");
    }
  }, [error, errorInfo, router]);

  return (
    <div>
      {error ? (
        <div>
          <h2>Ha ocurrido un error</h2>
          <p>{error.message}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default ErrorBoundary;

