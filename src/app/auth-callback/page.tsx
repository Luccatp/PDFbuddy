"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 1000,
  });
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Ajustando sua conta...</h3>
        <p>Você sera redirecionado automaticamente.</p>
      </div>
    </div>
  );
};

export default Page;
