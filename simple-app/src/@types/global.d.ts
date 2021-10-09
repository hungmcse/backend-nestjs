type Constructor<T> = Function & { prototype: T }

type ConstructorFunction<T> = new (...args: any[]) => T;
