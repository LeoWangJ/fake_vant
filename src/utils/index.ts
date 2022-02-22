export {createNamespace} from './create'

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}
export function isDef <T>(val: T): val is NonNullable<T>{
    return val !== undefined && val !== null
}

export function isObject (val: unknown): val is Record<any,any>{
    return val !== null && typeof val === 'object'
}

export function get(object: any,path: string): any{
    const keys = path.split('.') 
    let result = object

    keys.forEach(key=>{
        result = result[key] ?? '';
    })
    return result
}