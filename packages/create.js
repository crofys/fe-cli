/*
 * @Description:
 * @Author: 徐长剑
 * @Date: 2019-12-04 10:29:09
 * @LastEditTime: 2019-12-04 15:43:40
 * @LastEditors: 徐长剑
 */
const { prompt } = require('inquirer')
var chalk = require('chalk')
var path = require('path')
var ora = require('ora')
var gitDownload = require('download-git-repo')

const templateJson = require('../template.json')
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 10) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create React App requires Node 10 or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1);
}

const spinner = ora('Downloading...')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: '模板名称',
    validate: function(val) {
      if (!val) {
        return '模板名称不为空'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: '模板描述'
  },
  {
    type: 'list',
    name: 'client',
    message: '选择客户端',
    choices: ['PC端', '移动端', 'Wx小程序']
    // choices: ['Vue 2.0', 'React', 'Nest']
  }
]
const clientQuesition = {
  PC端: [
    {
      type: 'list',
      name: 'technologyStack',
      message: '选择模板',
      choices: ['react', 'vue', 'node', 'Wx']
    }
  ]
}
const installQuesition = {
  branch: {
    type: 'list',
    name: 'branch',
    message: '选择模板',
    choices: []
  },
  // installation: {
  //   type: 'list',
  //   name: 'installation',
  //   message: '选择模板',
  //   choices: ['yarn', 'Npm']
  // }
}

module.exports = async projectName => {
  const { branch } = await answerQuesition()
  const workDir = path.join(process.cwd(), projectName)
  spinner.start()
  try {
    await gitDownloadSync(templateJson[branch], workDir)
    spinner.succeed()
    console.log(chalk.green('\n 创建项目完成!'))
    console.log('\n 创建成功')
    console.log('\n cd ${projectName} \n')
  } catch (error) {
    spinner.fail()
    console.log(chalk.red(`创建项目失败 ${error}`))
  }
}

function gitDownloadSync(url, dir) {
  new Promise((resolve, reject) => {
    gitDownload(url, dir, function(err) {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

async function answerQuesition() {
  const { client } = await prompt(questions)
  const { technologyStack } = await prompt(clientQuesition[client])

  switch (technologyStack) {
    case 'vue':
      break
    case 'react':
      installQuesition.branch.choices = ['umi/ts/antd', 'umi/ts']
      break
    case 'node':
      break
    case 'wx':
      break
  }
  const _data = await prompt(Object.values(installQuesition))
  return {
    ..._data
  }
}