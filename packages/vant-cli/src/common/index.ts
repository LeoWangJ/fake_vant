import { existsSync, readdirSync,readFileSync } from "fs-extra"
import {SRC_DIR} from './constant.js'
import {  join } from 'path';

export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];

export type NodeEnv = 'development' | 'production' |'test'

export function setNodeEnv(value:NodeEnv){
    process.env.NODE_ENV = value
}

export function hasDefaultExport(code:string){
    return code.includes(`export default`) || code.includes(`export { default }`)
}

export function getComponents(){
    const EXCLUDES = ['.DS_Store']
    const dirs = readdirSync(SRC_DIR)

    return dirs.filter(dir=> !EXCLUDES.includes(dir))
    .filter(dir=> ENTRY_EXTS.some(ext=>{
        const path = join(SRC_DIR,dir,`index.${ext}`)
        if(existsSync(path)){
            return  hasDefaultExport(readFileSync(path, 'utf-8'));
        }

        return false
    }))
}