#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const jsonfile = require('jsonfile');
const rimraf = require('rimraf');

const cwd = process.cwd();
const spinner = ora('');

program
    .version('1.0.0')
    .description('project boilerplate')
    .option('-c, --create [projectName]', 'create new project')
    .parse(process.argv);

if (process.argv.length <= 2) {
    console.log(chalk.red('指令不能为空'));
    return;
}

const projectName = program.create;
if (projectName != null) {
    if (projectName && typeof projectName === 'string') {
        const targetDir = path.resolve(cwd, projectName);
        if (fs.existsSync(targetDir)) {
            const stat = fs.statSync(targetDir);
            if (!stat.isDirectory()) {
                console.log(chalk.red(`${targetDir}已经存在，且不是文件夹`));
                return;
            }
            const childFiles = fs.readdirSync(targetDir);
            if (Array.isArray(childFiles) && childFiles.length > 0) {
                console.log(chalk.red(`${targetDir}已经存在, 且不为空`));
                return;
            }
        } else {
            fs.mkdirSync(targetDir)
        }
        const pjGitDic = {
            'react-antd-spa': 'gitee.com:Thyiad/react-ssr#master',
            'react-antd-ssr': 'gitee.com:Thyiad/react-ssr#master',
            'react-cra-spa': 'gitee.com:Thyiad/pt-react-cra#master',
            'react-antd-pro-v4': 'gitee.com:Thyiad/pt-antd-pro-v4#master',
            'react-antd-pro-v2': 'gitee.com:Thyiad/pt-antd-pro-v2#master',
            'vue-material': 'gitee.com:Thyiad/pt-vue-material#master',
            'vue-element': 'gitee.com:Thyiad/pt-vue-element#master',
        }

        // 选择模板
        inquirer
            .prompt([
                {
                    name: 'pt',    // pt: project template
                    message: '请选择你要的模板：',
                    type: 'list',
                    choices: Object.keys(pjGitDic).map(item=>({name: item}))
                }
            ])
            .then(answers => {
                const tagetGit = pjGitDic[answers.pt]
                // clone 代码
                spinner.start(`开始下载模板项目`)
                download(tagetGit, projectName, { clone: true }, (err) => {
                    if (err) {
                        spinner.fail('下载模板项目失败');
                        console.log(err);
                    } else {
                        spinner.succeed('下载模板项目完成');
                        spinner.start('开始处理代码');
                        if(answers.pt === 'react-antd-ssr'){
                            // 修改package.json
                            const pkgJsonPath = path.resolve(targetDir, 'package.json');
                            const pkg = jsonfile.readFileSync(pkgJsonPath);
                            pkg.scripts["dev"] = "node webpack/dev.js ssr";
                            pkg.scripts["build"] = "node webpack/build.js ssr";
                            [
                                "dev:spa",
                                "dev:ssr",
                                "build:spa",
                                "build:ssr"
                            ].forEach(item=>{
                                delete pkg.scripts[item];
                            });
                            jsonfile.writeFileSync(pkgJsonPath, pkg, { spaces: "  " });
                        } else if (answers.pt === 'react-antd-spa') {
                            // 删除server代码
                            rimraf.sync(path.resolve(targetDir, 'src/server'))
                            // 挪移client、global.d.ts到src平级
                            fs.renameSync(path.resolve(targetDir, 'src/client'), path.resolve(targetDir, 'client'));
                            fs.renameSync(path.resolve(targetDir, 'src/global.d.ts'), path.resolve(targetDir, 'global.d.ts'));
                            // 删除src目录，重命名client为src，挪移global.d.ts到新的src
                            fs.rmdirSync(path.resolve(targetDir, 'src'));
                            fs.renameSync(path.resolve(targetDir, 'client'), path.resolve(targetDir, 'src'));
                            fs.renameSync(path.resolve(targetDir, 'global.d.ts'), path.resolve(targetDir, 'src/global.d.ts'));
                            // 修改package.json
                            const pkgJsonPath = path.resolve(targetDir, 'package.json');
                            const pkg = jsonfile.readFileSync(pkgJsonPath);
                            pkg.scripts["dev"] = "node webpack/dev.js spa";
                            pkg.scripts["build"] = "node webpack/build.js spa";
                            // 删除script
                            [
                                "dev:spa",
                                "dev:ssr",
                                "build:spa",
                                "build:ssr"
                            ].forEach(item=>{
                                delete pkg.scripts[item];
                            });
                            // 删除dependencies
                            [
                                "@loadable/server",
                                "art-template",
                                "koa",
                                "koa-art-template",
                                "koa-bodyparser",
                                "koa-static"
                            ].forEach(item=>{
                                delete pkg.dependencies[item];
                            });
                            // 删除devDependencies
                            [
                                "@types/koa", 
                                "@types/koa-bodyparser", 
                                "@types/koa-static", 
                                "@types/koa__router", 
                                "@types/loadable__server"
                            ].forEach(item=>{
                                delete pkg.devDependencies[item];
                            })
                            jsonfile.writeFileSync(pkgJsonPath, pkg, { spaces: "  " });
                            // 修改tsconfig.json
                            const tsJsonPath = path.resolve(targetDir, 'tsconfig.json');
                            const ts = jsonfile.readFileSync(tsJsonPath);
                            ts.compilerOptions.paths["@client/*"] = ["*"];
                            ts.compilerOptions.paths["@/*"] = ["*"];
                            jsonfile.writeFileSync(tsJsonPath, ts, { spaces: "  " });
                            // 修改create-config.js
                            const webpackConfPath = path.resolve(targetDir, 'webpack/create-config.js');
                            const webpackConf = fs.readFileSync(webpackConfPath).toString();
                            const spaWebpackConf = webpackConf
                                .replace(`'@client': path.resolve(cwd, 'src/client'),`, `'@client': path.resolve(cwd, 'src'),`)
                                .replace(`'@': path.resolve(cwd, \`src\${spaClientFolder}\`),`, `'@': path.resolve(cwd, 'src'),`);
                            fs.writeFileSync(webpackConfPath, spaWebpackConf);
                            // 修改env-config.js
                            const envConfPath = path.resolve(targetDir, 'webpack/env-config.js');
                            const envConf = fs.readFileSync(envConfPath).toString();
                            const spaEnvConf = envConf.replace(`sysType: 'ssr',`, `sysType: 'spa',`);
                            fs.writeFileSync(envConfPath, spaEnvConf);
                        }
                        spinner.succeed('处理代码成功');
                    }
                })
            })
            .catch(error => {
                console.log(chalk.red('inquirer 发生错误'));
                console.log(error);
            });
    } else {
        console.log(chalk.red("请输入项目名称"))
    }
    return;
}

console.log(chalk.red(`无法识别的指令: ${process.argv.slice(2).join(' ')}`));