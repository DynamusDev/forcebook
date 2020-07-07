# Manual para configuração

---

## Pré-requisitos


>1. Obter o Node instalado em sua amáquina
>2. Obter o Yarn instalado em sua amáquina
>2. Obter o react-native cli instalado em sua amáquina

---

## Comandos para executar o projeto

**1. Passo - Clonar o projeto do Git**

>Com o terminal aberto em uma pasta de sua preferência execute: git clone https://github.com/DynamusDev/forcebook.git

**2. Passo - Instalar Dependências** 

# Instalar dependências e rodar o backend

>cd `forcebook/backend`

>yarn

>Ao finalizar a instalações das dependências execute yarn start e seu servidor backend já estará rodando

>Mantenha esta aba aberta e abra uma nova aba do terminal

# Instalar dependências e rodar o mobile

>cd `../mobile`

>yarn

>Ao finalizar a instalações das dependências através do seu editor de código preferido acesse `app/services/api/api.ts`

>Edite a linha 8 da seguinte forma: 'baseURL: `http://SEU_NUMERO_DE_IP:3333`'

>Salve o arquivo e rode o comando yarn run android

>Aguarde a instalação do app no seu dispositivo físico ou no seu amulador virtual

>**Obs:** Certifique-se de que tenha algum emulador de Android aberto ou celular devidamente configurado antes de rodar o último comando.

![](/mobile/assets/login.jpeg)

## Estrutura da Aplicação Mobile

```

├── mobile
|  ├── app
|  │   ├── components
|  │   ├── i18n
|  │   ├── utils
|  │   ├── models
|  │   ├── navigation
|  │   ├── screens
|  │   ├── services
|  │   ├── theme
|  │   ├── app.tsx
|  ├── storybook
|  │   ├── views
|  │   ├── index.ts
|  │   ├── storybook-registry.ts
|  │   ├── storybook.ts
|  ├── test
|  │   ├── __snapshots__
|  │   ├── storyshots.test.ts.snap
|  │   ├── mock-i18n.ts
|  │   ├── mock-reactotron.ts
|  │   ├── setup.ts
|  │   ├── storyshots.test.ts
|  ├── README.md
|  ├── android
|  │   ├── app
|  │   ├── build.gradle
|  │   ├── gradle
|  │   ├── gradle.properties
|  │   ├── gradlew
|  │   ├── gradlew.bat
|  │   ├── keystores
|  │   └── settings.gradle
|  ├── ignite
|  │   ├── ignite.json
|  │   └── plugins
|  ├── index.js
|  ├── ios
|  │   ├── IgniteProject
|  │   ├── IgniteProject-tvOS
|  │   ├── IgniteProject-tvOSTests
|  │   ├── IgniteProject.xcodeproj
|  │   └── IgniteProjectTests
|  ├── .env
|  └── package.json
└──
```

## Rodando o Storybook

>No terminal dendro da raiz do mobile, rode `yarn run storybook` isso vai startar o servidor storybook.

>Na raiz da pasta `mobile` no arquivo `index.js`, troque `SHOW_STORYBOOK` para `true` e recarregue o app.

>Se você utiliza o Visual Studio Code, existe uma extensão útil que facilita o carregamento de casos de uso do Storybook. Instale a extensão `React Native Storybook` by` Orta`, pressione `cmd + shift + P` e selecione" Reconectar Storybook ao VSCode ". Expanda a seção STORYBOOK na barra lateral para ver todos os casos de uso de componentes que possuem arquivos `.story.tsx` nos seus diretórios.