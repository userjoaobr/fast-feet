### :computer: Fast Feet esta aplicação será formada por:

```
1.backend - Este  é api da aplicação
2.frontend - Aplicação web
3.mobile - Aplicativo móvel
```
_Use estes dados para realizar login na aplicação:_
<blockquote><strong>Email:</strong> admin@fastfeet.com</blockquote>
<blockquote> <strong>Senha:</strong> 123456</blockquote>

<h1 align="center">
<img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/frontend/.github/image1.jpg" width="50%" height="50%"/>

___
# Installing the dependencies

```
yarn ou npm install,
To start the project,
yarn start ou npm start.
```
Funcionalidades
A seguir, estarão listadas as funcionalidades já implementadas no projeto.


### :computer:Instruções para o backend
Para facilitar os testes na solução de backend clicar no botão seguinte;

   Run in Insomnia
   ```
   https://drive.google.com/file/d/1RIlS0b0W2MrYyHtkbn5LGLnibhy3Ikg_/view?usp=sharing
   ```
Você precisará ter instalado na sua máquina o``` Node.js, o Yarn e o Docker```. Feitas as configurações, seguem os passos para executar o backend da aplicação:

Executar o comando ```yarn``` para fazer o dowload de todas as dependências necessárias para executar o projeto;

Para criar um``` seed``` utilize o comando:
```yarn sequelize seed:generate --name admin-user```

Agora execute:
```yarn sequelize db:seed:all```

Iremos instalar duas imagens de dois bancos de dados: Postgres, para armazenar nossas tabelas; e o Redis, um banco extremamente performático, que será utilizado para envio de e-mails com filas. Abaixo, seguem os respectivos comandos para realizar o download:

```
sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name redis -p 6379:6379 -d -t redis:alpine
```
Execute yarn queue para que a fila de processamento de emails esteja funcionando.

Execute as migrations para que as tabelas sejam criadas:
```
yarn sequelize db:migrate
Se quiser, também pode gerar alguns dados, como usuário administrador e planos, executando os seeds:
```
Após isso, execute yarn dev para que o backend esteja funcionando.

### :computer: Instruções para o frontend
Executar o comando yarn para fazer o dowload de todas as dependências necessárias para executar o projeto``` yarn install```. Crie um  arquivo `.env.development.local` (preenchendo as variáveis encontradas no `.env.example`);

Feitos os downloads de todas as dependências, execute``` yarn start ```para iniciar a aplicação;

### :computer: Instruções para o mobile

```
yarn install
react-native run-android
```
<h1 align="center">
<img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/mobile/.github/image1.jpg" width="30%" height="30%" /><img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/mobile/.github/image3.jpg" width="30%" height="30%" /><img src="https://raw.githubusercontent.com/MicaelliMedeiros/FastFeet/master/mobile/.github/image4.jpg" width="30%" height="30%" />

___

🧑🏻‍💻 Coding [João Alvaro](https://www.linkedin.com/in/jo%C3%A3o-alvaro-58b79a15b/)!
