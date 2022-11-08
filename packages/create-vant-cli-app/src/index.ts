import consola from 'consola'
import { prompt } from 'inquirer'
import {ensureDir} from 'fs-extra'
import {VueGenerator} from './generator'

const PROMPTS = [
    {
        type: 'input',
        name:'name',
        message:'Your package name'
    }
]

async function run (){
    const {name} = await prompt(PROMPTS)
    try{
        await ensureDir(name)
        const generator = new VueGenerator(name)
        await generator.run()
    }catch(e){
        consola.error(e)
    }
}

run()