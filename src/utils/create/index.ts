import {createComponent} from './component'
import { createBEM,BEM } from './bem'
import { createI18N, Translate } from './i18n'


type CreateNamespaceReturn = [
    // 回傳 createComponent的回傳型別
    ReturnType<typeof createComponent>,
    BEM,
    Translate
]

export function createNamespace(name: string): CreateNamespaceReturn{
    name = `fake-van-${name}`
    return [createComponent(name),createBEM(name),createI18N(name)]
}