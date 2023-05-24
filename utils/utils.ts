export function generate0Or1():number {
	const num = Math.random();
	if (num < 0.5 ) return 0;
	return 1;
}
export function documentGetElementByIdOrError<T>(id:string)  {
	const element = document.getElementById(id) as T;
	if(!element) throw new Error(`ERROR: No se encontro el elemento de id ${id}`);

	return element;
}
