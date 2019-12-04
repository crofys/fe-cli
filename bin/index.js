#!/usr/bin/env node

/*
 * @Description:
 * @Author: 徐长剑
 * @Date: 2019-12-03 11:41:02
 * @LastEditTime: 2019-12-04 15:47:13
 * @LastEditors: 徐长剑
 */
const program = require('commander')
const chalk = require('chalk')
const createHandle = require('../packages/create')
// 定义当前版本
// 定义使用方法
// 定义四个指令
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init')
  .description('初始化项目')
  .action(async (...args) => {
    if(!args[1]) {
      console.log(chalk.red('请输入文件名'))
      return
    }
    const [name] = args[1]
    await createHandle(name)
  })

// .command('-c','create', 'add a new template')
// .command('delete', 'delete a template')
// .command('list', 'list all the templates')
// .command('init', 'generate a new project from a template')
// 解析命令行参数
const _params = program.parse(process.argv)
// console.log(_params['args'], 'process.argv')
