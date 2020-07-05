


### :computer: Fast Feet Esta aplicação será formada por:

1.backend - Este  é api da aplicação
2.frontend - Aplicação web
3.mobile - Aplicativo móvel
<h1 align="center">
<img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/mobile/.github/image1.jpg" width="30%" height="30%" /><img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/mobile/.github/image3.jpg" width="30%" height="30%" /><img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/mobile/.github/image4.jpg" width="30%" height="30%" />

___

#backend
#instalando as dependências
yarn
#iniciando a aplicação yarn dev
                                                             
#instalando as dependências Frontend do Fastfeet 
yarn                                                           
Feitos os downloads de todas as dependências, execute yarn start para iniciar a aplicação;

Funcionalidades
A seguir, estarão listadas as funcionalidades já implementadas no projeto.


Para criar um seed utilize o comando:
yarn sequelize seed:generate --name admin-user

Agora execute:
yarn sequelize db:seed:all

Iremos instalar duas imagens de dois bancos de dados: Postgres, para armazenar nossas tabelas; e o Redis, um banco extremamente performático, que será utilizado para envio de e-mails com filas. Abaixo, seguem os respectivos comandos para realizar o download:

sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name redis -p 6379:6379 -d -t redis:alpine

Execute yarn queue para que a fila de processamento de emails esteja funcionando.

Execute as migrations para que as tabelas sejam criadas:

yarn sequelize db:migrate
Se quiser, também pode gerar alguns dados, como usuário administrador e planos, executando os seeds:

yarn sequelize db:seed:all
Com isso, você terá o email admin@fastfeet.com e a senha 123456 para fazer autenticação.

Após isso, execute yarn dev para que o backend esteja funcionando.

Instruções para o frontend
Executar o comando yarn para fazer o dowload de todas as dependências necessárias para executar o projeto yarn install. Crie um  arquivo `.env.development.local` (preenchendo as variáveis encontradas no `.env.example`);

_Após isto, você precisa mudar para o ip de sua máquina neste arquivo:_
[api.js](https://github.com/MicaelliMedeiros/FastFeet/blob/master/mobile/src/services/api.js)
```javascript
  baseURL: 'http://192.168.43.179:3000',
```

### :iphone: Aplicativo mobile do Fastfeet
react-native run-android








