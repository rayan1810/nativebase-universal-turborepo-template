#!/usr/bin/env node

const shelljs = require("shelljs");
const fs = require("fs");
const prompts = require("prompts");

let options = [
  {
    title: "Basic Javascript Setup",
    value: "solito-universal-app-template-nativebase",
  },
  {
    title: "With Typescript Setup",
    value: "solito-universal-app-template-nativebase-typescript",
  },
];

let promptsConfig = [
  {
    type: "select",
    name: "value",
    message: "Pick your template",
    choices: options,
    initial: 0,
  },
];

function main() {
  shelljs.exec(
    "git clone https://github.com/GeekyAnts/nativebase-templates.git"
  );
  shelljs.cd("nativebase-templates");
  (async () => {
    const response = await prompts(promptsConfig);
    shelljs.exec(
      `cp -Rf ./${response.value} ../${response.value}`,
      function (err) {
        console.log(err);
      }
    );
    shelljs.exec(
      `cd ../${response.value} && npm install && cd apps/expo && npm install && cd ../next && npm install && cd ../../packages/app && npm install && cd ../.. && npm install`
    );
    shelljs.exec(`cd .. && rm -rf nativebase-templates`);
    console.log("To start with your project, run: ");
    console.log("cd " + response.value);
    console.log("yarn web or npm run web");
    console.log("yarn native or npm run native");
    console.log("Setup Done, Happy Coding!");
  })();
}

if (require.main === module) {
  main();
}
