"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-sand pt-24 pb-20 flex flex-1 items-center">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="font-heading text-[6rem] font-bold leading-none text-clay/25 select-none">
            :(
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-midnight sm:text-4xl">
            Something went wrong
          </h1>
          <p className="mt-4 text-midnight/60 leading-relaxed">
            An unexpected error occurred. Our team has been notified. You can
            try again, or head back home.
          </p>

          {error.digest && (
            <p className="mt-3 text-xs text-midnight/30 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => unstable_retry()}
            >
              Try again
            </Button>
            <Link
              href="/"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
