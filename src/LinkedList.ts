export interface INode<T> {
    value: T;
    next: INode<T> | null;
}

export function createNode<T>(value: T, next?: INode<T>): INode<T> {
    return {
        value,
        next: next ? next : null,
    };
}
