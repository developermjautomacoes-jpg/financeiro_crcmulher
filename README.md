# Central da Comissão — CRC ES Mulher (versão Vercel)

Este pacote tem tudo pronto para publicar o painel num link fixo, com os
dados guardados de verdade num banco de dados (não depende do Claude para
funcionar depois de publicado).

## O que tem aqui
- `index.html` — o app inteiro (Início, Eventos, Financeiro, Membros, Mensalidades etc.)
- `api/storage.js` — a "gaveta" onde os dados ficam guardados (Redis via Upstash)
- `package.json` — lista a biblioteca que o site usa para falar com o banco

## Aviso importante (atualizado)
A Vercel **descontinuou o produto "Vercel KV"** em dezembro de 2024. Hoje
esse tipo de banco de dados se instala pelo **Marketplace** da Vercel, com um
parceiro chamado **Upstash**. Se você (ou alguém) seguiu um passo a passo
antigo mencionando "Vercel KV", é por isso que as telas não bateram — o
código deste pacote já está atualizado para o caminho atual.

## Passo a passo para publicar

### 1. Criar uma conta na Vercel
Vá em **vercel.com** → "Sign Up" → pode entrar com uma conta do GitHub, Google
ou e-mail. É gratuito para esse tipo de uso.

### 2. Subir esses arquivos
1. Crie uma conta gratuita em **github.com**, se ainda não tiver.
2. Crie um repositório novo (botão verde "New").
3. Faça upload dos 3 itens deste pacote (`index.html`, a pasta `api`, e
   `package.json`) direto pela interface do GitHub (arrastar e soltar
   funciona).
4. Na Vercel, clique em **"Add New" → "Project"**, escolha **"Import Git
   Repository"** e selecione esse repositório do GitHub.
5. Pode deixar todas as configurações como estão e clicar em **"Deploy"**.

### 3. Instalar o banco de dados (Upstash, pelo Marketplace)
1. Depois que o projeto for criado, abra o painel do projeto na Vercel.
2. Vá na aba **"Storage"** (ou em "Integrations" / "Marketplace", dependendo
   da versão da tela).
3. Procure por **"Upstash"** (Redis) e clique em **Install** / **Add
   Integration**.
4. Ele vai pedir pra você conectar (ou criar) uma conta Upstash — pode deixar
   a Vercel gerenciar isso automaticamente.
5. Escolha criar um banco Redis novo (qualquer nome, região mais próxima do
   Brasil se tiver opção).
6. Na etapa de conectar aos projetos, marque este projeto e marque **todos os
   ambientes** (Production, Preview e Development) — não deixe só
   "Production" marcado.
7. Confirme. A Vercel vai injetar as variáveis de ambiente
   (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) automaticamente no projeto.

### 4. Redeploy
Vá em **"Deployments"**, clique nos "..." do último deploy → **"Redeploy"** —
isso garante que a nova conexão com o banco chegue ao site.

### 5. Use sempre o link de Produção
Depois do deploy, use o link marcado como **Production** no painel (não um
link de preview com "-git-" no meio) — é esse que fica fixo e é o que deve
ser compartilhado com a comissão.

### 6. Conferir se está funcionando
Abra o site publicado e olhe no canto superior direito: deve aparecer
**🟢 Dados sincronizados**. Se aparecer **🔴 Falha ao salvar/carregar**, o
banco ainda não está conectado direito — repita o passo 3.

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
