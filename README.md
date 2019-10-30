# serie-node
API com mongo

## [API NodeJS + Express + Mongo] Estrutura e cadastro | Diego Fernandes

> Video aula:
https://www.youtube.com/watch?v=BN_8bCfVp88&t=304s

git clone https://github.com/ederpbj/serie-node.git

> Iniciar

    npm init -y

> Pacotes

    yarn add express
    yarn add body-parser
    yarn add mongoose
    npm install bcrypt
    yarn add jsonwebtoken

> Start inicial

    node src/index.js

    	
Path: para trabalhar com caminhos
Fs: trabalha com arquivos

    yarn add fs path

Configurar email fake
- mailtrap
https://mailtrap.io/inboxes

Outras ferramentas para produção 
- sparkpost
- mailship
- sendgrid
- mandril 

Ferramenta para teste email
https://mailtrap.io/inboxes/737590/messages

    yarn add node mailer

Criar pasta src/modules
- Arquivos que não estão relacionados diretamente com a aplicação

Forma de preencher engines em arquivos html

    yarn add nodemailer-express-handlebars