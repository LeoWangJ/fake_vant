import {Command} from 'commander'
import { cliVersion } from './index'

const program = new Command()

program.version(`@fake_vant/cli ${cliVersion}`)

program
    .command('dev')
    .description('run dev server')
    .action(async ()=>{
        const {dev} = await import('./commands/dev.js')
        return dev()
    })