import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";

export function useStoreUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { isLoaded } = useUser();
  const storeUser = useMutation(api.users.store);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !isLoaded) return;

    async function createUser() {
      const id = await storeUser(); // ✅ NO ARGS
      setUserId(id);
    }

    createUser();

    return () => setUserId(null);
  }, [isAuthenticated, isLoaded, storeUser]);

  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}

