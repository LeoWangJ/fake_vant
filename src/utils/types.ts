import {InjectOptions,PropsDefinition} from 'vue/types/options'
import { CreateElement,VNode,RenderContext } from 'vue';

export type ObjectIndex = Record<string,any>; 
export type DefaultProps = ObjectIndex
export type ScopedSlot <Props = any> = (
    props?: Props
) => VNode[] | VNode | undefined;

export type DefaultSlots = {
    default?: ScopedSlot;
}

export type ScopedSlots = DefaultSlots & {
    [key: string]: ScopedSlot | undefined;
}
export type ModelOptions = {
    prop?: string;
    event?: string;
}

// 
export type FunctionComponent< 
  Props = DefaultProps, PropsDefs = PropsDefinition<Props> 
> = {
 (
    h: CreateElement,
    props: Props,
    slots: ScopedSlots,
    context: RenderContext<Props>
 ): VNode | undefined;
 props?: PropsDefs;
 model?: ModelOptions;
 inject?: InjectOptions;
}