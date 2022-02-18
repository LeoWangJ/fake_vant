export {createNamespace} from './create'

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}