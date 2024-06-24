#!/usr/bin/env node
import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'node:fs'
import {checkPath,downloadTemp} from './utils.js'
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)

program.version(json.version) 
program.command('create <projectName>').alias('cre').description('创建项目').action((projectName)=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称',
            default: projectName
        },
        {
            type: 'confirm',
            name: 'isTs',
            message: '是否支持typeScript',
        },
    ]).then((res)=>{
        if(checkPath(res.projectName)){
            return
        }
        if(res.isTs){
            downloadTemp('ts',res.projectName)
        }else{
            downloadTemp('js',res.projectName)
        }
    })
})
program.parse(process.argv)