import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useFavorites = () => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .select("property_id")
      .eq("user_id", user.id);
    if (!error && data) {
      setFavoriteIds(new Set(data.map((f) => f.property_id)));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = useCallback(
    async (propertyId: string) => {
      if (!user) {
        toast.error("Faça login para salvar favoritos.");
        return;
      }
      const isFav = favoriteIds.has(propertyId);
      // Optimistic update
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (isFav) next.delete(propertyId);
        else next.add(propertyId);
        return next;
      });

      if (isFav) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", propertyId);
        if (error) {
          // Revert
          setFavoriteIds((prev) => new Set(prev).add(propertyId));
          toast.error("Erro ao remover favorito.");
        }
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, property_id: propertyId });
        if (error) {
          // Revert
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.delete(propertyId);
            return next;
          });
          toast.error("Erro ao salvar favorito.");
        }
      }
    },
    [user, favoriteIds]
  );

  const isFavorite = useCallback(
    (propertyId: string) => favoriteIds.has(propertyId),
    [favoriteIds]
  );

  return { favoriteIds, loading, toggleFavorite, isFavorite, refetch: fetchFavorites };
};
