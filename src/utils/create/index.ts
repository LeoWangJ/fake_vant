import {createComponent} from './component'
import { createBEM,BEM } from './bem'

type CreateNamespaceReturn = [
    // 回傳 createComponent的回傳型別
    ReturnType<typeof createComponent>,
    BEM
]

export function createNamespace(name: string): CreateNamespaceReturn{
    name = `fake-van-${name}`
    return [createComponent(name),createBEM(name)]
}