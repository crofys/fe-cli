#!/usr/bin/env node

/*
 * @Description:
 * @Author: 徐长剑
 * @Date: 2019-12-04 10:29:09
 * @LastEditTime: 2019-12-04 18:32:33
 * @LastEditors: 徐长剑
 */
const { prompt } = require('inquirer')
const { exec } = require('shelljs')

const questions = [
  {
    type: 'list',
    name: 'commitType',
    message: '选择版本',
    choices: ['feat', 'fix', 'improve', 'docs', 'style', 'chore', 'test']
  },
  {
    type: 'input',
    name: 'commit',
    message: '备注信息',
    validate: function(val) {
      if (!val) {
        return '模板名称不为空'
      } else {
        return true
      }
    }
  },
  {
    type: 'list',
    name: 'version',
    message: '选择版本',
    choices: ['小版本', '中版本', '大版本', '开发版']
  }
]

start()
async function start() {
  const { version, commit, commitType } = await prompt(questions)

  console.log('提交代码')
  exec('git add .')

  console.log('备注信息')
  exec(`git commit -am ${commitType}:${commit}`)

  switch (version) {
    case '小版本':
      exec('npm version patch')
      break
    case '中版本':
      exec('npm version minor')
      break
    case '大版本':
      exec('npm version major')
      break
    case '开发版':
      exec('npm version premajor')
      break
  }

  console.log('推到远程')
  exec('git push')
}
