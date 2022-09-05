# NOTES

project started from nestjs sample `25-dynamic-modules`

## TLDR

```shell
# dynamic-module
$ cd dynamic-module
$ npm run start:dev
or
$ npm run build

# consumer-app
$ cd consumer-app
$ npm run start:debug
# or launch debug
```

## Required to be a node package

`dynamic-module/package.json`

```json
  "main": "dist/index.js",
  "files": [
    "dist/**/*",
    "*.md"
  ],
```

## Change src to lib

`dynamic-module/tsconfig.json`

change "include": `["src/**/*"]` to `"include": ["lib/**/*"]`

`dynamic-module/tsconfig.build.json`

add `"include": ["lib/**/*"],`

```json
{
  "extends": "./tsconfig.json",
  "include": ["lib/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

build to assert everything is working

```shell
$ npm run build
```

## Debug ConsumerApp Config

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/consumer-app/src/main.ts",
      "preLaunchTask": "tsc: build - consumer-app/tsconfig.json",
      "outFiles": [
        "${workspaceFolder}/**/dist/**/*.js"
      ],
      "cwd": "${workspaceFolder}/consumer-app"
    }
  ]
}
```

> notes for cwd to read config, and consumer-app on program, preLaunchTask and outFiles

> to debug dynamic-modules must change `"${workspaceFolder}/consumer-app/dist/**/*.js"` to `"${workspaceFolder}/**/dist/**/*.js"`, else breakpoints will be grey

## Test breakpoint in

`consumer-app/src/main.ts`
`dynamic-module/src/config/config.service.ts`

## Fix: Cannot read file tsconfig.json, when it's in subfolders and not in root

- [Parsing error: Cannot read file tsconfig.json, when it&#39;s in subfolders and not in root  · Issue #1170 · microsoft/vscode-eslint](https://github.com/microsoft/vscode-eslint/issues/1170)