import {classToPlain, ClassTransformOptions, plainToClassFromExist} from "class-transformer";

/**
 * plaintoclassfromexist but retain default value if plain does not have
 * @param clsObject
 * @param plain
 * @param options
 */

export function plainToClassFromExistWithDefault<T, V>(clsObject: T, plain: V, options?: ClassTransformOptions): T {
	const defaultPlain = {...classToPlain(clsObject), ...plain};
	return plainToClassFromExist(clsObject, defaultPlain, options);
}
