import { genPackageEntry } from "./gen-package-entry"
import { genStyleDepsMap } from "./gen-style-deps-map"

export async function genSiteEntry():Promise<void>{
    new Promise ((resolve,reject) =>{
        genStyleDepsMap().then(() =>{
            genPackageEntry({
                outputPath:PACKAGE_ENTRY_FILE
            })
            resolve()
        }).catch(err=>{
            reject(err)
        })
    })
}

export async function compileSite(production = false){
    await genSiteEntry()
    if(production){

    }else{

    }
}