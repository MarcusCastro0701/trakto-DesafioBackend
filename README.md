

## Descrição

Desafio Back-End proposto pela Trakto. Recebe a URL pública de uma imagem e seu fator de compactação desejado. Processa a imagem e salva a versão original e a cópia no sistema de arquivos. Também insere em uma instância de MongoDB os dados EXIF da imagem.

## Instalação

```bash
$ npm install
```

## Dotenv Config
Crie um arquivo com o nome '.env' na raíz do projeto e configure-o de acordo com o exemplo contido no arquivo '.env.example'


## Para rodar a aplicação

```bash
# em desenvolvimento
$ npm run start

# em modo de observação
$ npm run start:dev

# em modo de produção
$ npm run start:prod
```
