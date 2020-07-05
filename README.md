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

>cd forcebook/backend

>yarn

>Ao finalizar a instalações das dependências execute yarn start e seu servidor backend já estará rodando

>Mantenha esta aba aberta e abra uma nova aba do terminal

# Instalar dependências e rodar o mobile

>cd ../mobile

>yarn

>Ao finalizar a instalações das dependências através do seu editor de código preferido acesse app/services/api/api.ts

>Edite a linha 8 da seguinte forma: baseURL: 'http://SEU_NUMERO_DE_IP:3333'

>Salve o arquivo e rode o comando yarn run android

>Aguarde a instalação do app no seu dispositivo físico ou no seu amulador virtual

>**Obs:** Certifique-se de que tenha algum emulador de Android aberto ou celular devidamente configurado antes de rodar o último comando.
