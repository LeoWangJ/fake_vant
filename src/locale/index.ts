import Vue from 'vue'
import {deepAssign} from '../utils/deep-assign'
import defaultMessages from './lang/zh-TW';

const proto = Vue.prototype
const { defineReactive } = (Vue as any).util

defineReactive(proto,'$fakeVantLang' , 'zh-TW')
defineReactive(proto,'$fakeVantMessages',{
    'zh-TW': defaultMessages
})

/**
 * function @message - 返回當前語言包訊息 
 * function @use - 切換語言
 * function @add - 覆蓋語言包, 可以實現文案的修改和擴展
 */
export default{
    messages(){
        return proto.$fakeVantMessages[proto.$fakeVantLang]
    },
    use(lang: string, messages?: object){
        proto.$fakeVantLang = lang
        this.add({[lang]: messages })
    },
    add(messages = {}){
        deepAssign(proto.$fakeVantMessages,messages)
    }
}