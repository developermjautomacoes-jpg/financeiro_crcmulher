# Central da Comissão — CRC ES Mulher (versão Vercel)

Este pacote tem tudo pronto para publicar o painel num link fixo, com os
dados guardados de verdade num banco de dados (não depende do Claude para
funcionar depois de publicado).

## O que tem aqui
- `index.html` — o app inteiro (Início, Eventos, Financeiro, Mensalidades etc.)
- `api/storage.js` — a "gaveta" onde os dados ficam guardados
- `package.json` — lista o banco de dados que o site usa (Vercel KV)

## Passo a passo para publicar

### 1. Criar uma conta na Vercel
Vá em **vercel.com** → "Sign Up" → pode entrar com uma conta do GitHub, Google
ou e-mail. É gratuito para esse tipo de uso.

### 2. Subir esses arquivos
A forma mais simples, sem precisar saber programação:
1. Crie uma conta gratuita em **github.com**, se ainda não tiver.
2. Crie um repositório novo (botão verde "New").
3. Faça upload dos 3 itens deste pacote (`index.html`, a pasta `api`, e
   `package.json`) direto pela interface do GitHub (arrastar e soltar
   funciona).
4. Na Vercel, clique em **"Add New" → "Project"**, escolha **"Import Git
   Repository"** e selecione esse repositório do GitHub.
5. Pode deixar todas as configurações como estão e clicar em **"Deploy"**.

### 3. Criar o banco de dados (Vercel KV)
1. Depois que o projeto for criado na Vercel, vá na aba **"Storage"** do
   projeto.
2. Clique em **"Create Database"** → escolha **"KV"** (Redis) → dê um nome
   qualquer → **Create**.
3. Na tela seguinte, clique em **"Connect Project"** e selecione este
   mesmo projeto. A Vercel conecta tudo sozinha (variáveis de ambiente
   automáticas).
4. Vá na aba **"Deployments"** do projeto e clique nos "..." do último
   deploy → **"Redeploy"** (só pra garantir que ele pega o banco de dados
   novo).

### 4. Pronto
O link do projeto (algo como `central-comissao-crces-mulher.vercel.app`) já
é o link definitivo — pode compartilhar com todo mundo. A senha de
organizadora continua sendo **2609**, e agora os dados nunca mais se
perdem, mesmo quando o código for atualizado no futuro.

## Se precisar atualizar o app no futuro
Basta substituir o arquivo `index.html` no repositório do GitHub (upload de
novo, sobrescrevendo) — a Vercel publica a nova versão sozinha em menos de
um minuto, sem apagar nada do banco de dados.

## Observação sobre a senha
A senha da organizadora (2609) fica escrita dentro do código do site. Isso
já era assim na versão anterior. Não é um cofre à prova de hackers — é uma
trava simples para impedir cliques acidentais de quem só tem o link. Para
uma comissão voluntária isso costuma ser suficiente, mas se um dia vocês
quiserem uma segurança mais forte (senha verificada no servidor, por
exemplo), é só pedir que a gente evolui isso.
