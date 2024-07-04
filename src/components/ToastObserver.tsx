"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ToastObserver() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.has("error")) {
      toast({
        description: searchParams.get("error") as string,
        variant: "destructive",
      });

      router.replace(pathName);
    }

    if (searchParams.has("success")) {
      toast({
        description: searchParams.get("success") as string,
      });

      router.replace(pathName);
    }
  }, [searchParams, toast, pathName, router]);

  return null;
}
