export type AtLeastOne<T, U = { [K in keyof T]: Pick<Required<T>, K> }> = Partial<T> & U[keyof U];
