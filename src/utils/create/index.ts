import {createComponent} from './component'

type CreateNamespaceReturn = [
    // 回傳 createComponent的回傳型別
    ReturnType<typeof createComponent>
]

export function createNamespace(name: string): CreateNamespaceReturn{
    name = `fake-van-${name}`
    return [createComponent(name)]
}