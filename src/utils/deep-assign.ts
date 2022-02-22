import {isDef, isObject} from '.'
import {ObjectIndex} from './types'

const { hasOwnProperty } = Object.prototype

function assignKey(to: ObjectIndex,from: ObjectIndex,key: string){
    const val = from[key]
    if(!isDef(val)){
        return;
    }

    if(!hasOwnProperty.call(to,key) || !isObject(val)){
        to[key] = val
    }else{
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        to[key] = deepAssign(Object(to[key]), from[key])
    }
}

/**
 * 該方法可以合併兩個物件, 若 to 與 from 有共同的 key, 則以 from[key] 的值為主 
 * @param to - 合併至該物件
 * @param from - 要合併的物件
 */
export function deepAssign(to: ObjectIndex,from: ObjectIndex): ObjectIndex{
    Object.keys(from).forEach(key=>{
        assignKey(to,from,key)
    })
    return to 
}