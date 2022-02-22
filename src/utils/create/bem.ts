/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export type Mod = string | {[key: string]: any}
export type Mods = Mod | Mod[]

/**
 * 用來處理修飾符( modifier )，且生成最終的 class name。
 * 由於 modifier 還有分成 陣列與物件兩種格式參數, 所以必須處理。  
 * 
 * @param name 
 * @param mods - 修飾符 modifier
 */
function generate (name: string,mods?: Mods): string{
    if(!mods){
        return ''
    }

    if(typeof mods === 'string'){
        return ` ${name}--${mods}`
    }

    if(Array.isArray(mods)){
        return mods.reduce<string>((ret,item) => ret + generate(name,item),'')
    }
    
    return Object.keys(mods).reduce((ret,key)=> ret + (mods[key] ? generate(name,key): '') ,'')
}

export function createBEM (name: string){
    return function(el?: Mods,mods?: Mods): Mods{
        if(el && typeof el !== 'string'){
            mods = el
            el = ''
        }

        el = el ? `${name}__${el}` : name
        return `${el}${generate(el,mods)}`
    }
} 

export type BEM =  ReturnType<typeof createBEM>