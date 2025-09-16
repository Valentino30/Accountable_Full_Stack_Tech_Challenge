export interface UserContextType {
  userId: string | null;
  isPending: boolean;
  error: Error | null;
  refetch: () => void;
}
