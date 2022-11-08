import { existsSync } from 'fs-extra';
import { pathToFileURL } from 'url';
import { join, dirname,isAbsolute } from 'path';


function findRootDir(dir:string):string{
    if(existsSync(join(dir,'vant.config.mjs'))){
        return dir
    }
    const parentDir = dirname(dir)
    if(dir === parentDir){
        return dir
    }

    return findRootDir(parentDir)
}

export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const VANT_CONFIG_FILE = join(ROOT,'vant.config.mjs')

async function getVantConfigAsync(){
    try{
        return (await import(pathToFileURL(VANT_CONFIG_FILE).href)).default
    }catch(err){
        return {}
    }
}

const vantConfig = await getVantConfigAsync()
function getVantConfig() {
    return vantConfig
}


function getSrcDir() {
    const vantConfig = getVantConfig()
    const srcDir = vantConfig.build?.srcDir
    if(srcDir){
        if(isAbsolute(srcDir)){
            return srcDir
        }
        return join(ROOT,srcDir)
    }
    return join(ROOT,'src')
}

export const SRC_DIR = getSrcDir()

