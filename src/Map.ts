export type TKey = string | number;

export interface IMap<V> {
    get: (key: TKey) => V | undefined;
    put: (key: TKey, value: V) => void;
    remove: (key: TKey) => void;
    size: () => number;
    empty: () => boolean;
}
