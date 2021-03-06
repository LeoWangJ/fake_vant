import { DefaultProps,FunctionComponent } from '../types'
import Vue, {ComponentOptions,VueConstructor,VNode,RenderContext} from 'vue'
import {isFunction} from '..'
import {SlotsMixin} from '../../mixins/slots'
import {camelize} from '../format/string';

export interface VantComponentOptions extends ComponentOptions<Vue> {
    functional?: boolean;
    install?: (Vue: VueConstructor) => void;
};

export type TsxBaseProps<Slots> = {
   key: string | number;
   props: any;
   class: any;
   style: string | object[] | object;
   scopedSlots: Slots;
}

export type TsxComponent<Props,Events,Slots> = (
    props: Partial<Props & Events & TsxBaseProps<Slots>>
) => VNode

function install(this: ComponentOptions<Vue>,Vue: VueConstructor){
    const {name} = this;
    Vue.component(name as string,this);
    Vue.component(camelize(`-${name}`), this)
    console.log('camelize name:',camelize(`-${name}`));
    
}

/**
 * 統一 slot 格式
 */
export function unifySlots(context: RenderContext){
    const scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
    const slots = context.slots();

    Object.keys(slots).forEach((key)=>{
        if(!scopedSlots[key]){
            scopedSlots[key] = () => slots[key]
        }
    })
    return scopedSlots
}

/**
 * 將函式轉乘函數式組件
 */
function transformFunctionComponent(pure: FunctionComponent): VantComponentOptions{
    return {
        functional: true,
        props: pure.props,
        model: pure.model,
        render:(h,context): any => pure(h,context.props,unifySlots(context),context)
    }
}

/**
 * VantComponentOptions - 使用vue中options 創建組件, 傳的參數為object
 * FunctionComponent - 使用函式創建組件, 傳的參數為 function
 * @param name - 組件名稱
 * 
 * return 返回TSX 組件
 */
export function createComponent(name: string){
    return function <Props = DefaultProps, Events = {}, Slots = {}>(
        sfc: VantComponentOptions | FunctionComponent
    ): TsxComponent<Props,Events,Slots>{
        if(isFunction(sfc)){
            sfc = transformFunctionComponent(sfc);
        }
        
        // https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
        // 因為 functional this 無法正確獲取到 , 所以僅只做 Component options  
        if(!sfc.functional){
            sfc.mixins = sfc.mixins || [];
            sfc.mixins.push(SlotsMixin);
        }
        
        sfc.name = name;
        sfc.install = install

        return sfc as TsxComponent<Props,Events,Slots>
    }
}