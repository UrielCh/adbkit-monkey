export type Callback<T> = (err: Error | null, result?: T, cmd?: string) => void;
