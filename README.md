# Mensagem Oculta - Projeto Individual - 2

**Feito por:** Jonatas (Jhonny)

**Linguagens utilizadas:** HTML, CSS e Javascript

## Proposta do Projeto

Projeto para o curso WebDev Resilia. O objetivo é criar uma codificação de mensagens onde a pessoa usuária deverá ser capaz de inserir uma mensagem a ser codificada ou decodificada, escolher o algoritmo a ser utilizado e receber o retorno da mensagem. <br>
Os algoritmos utilizados são Cifra de César e base64.

## Desenvolvimento do Projeto

No primeiro momento, foi criado a estrutura HTML da página. Utilizando o Figma, foi criado o protótipo de design da página, que depois foi passado para o CSS. <br>
A maior parte do projeto foi feita pelo Javascript, em partes. Primeiramente, foi desenvolvido algumas dinâmicas da página, como a imagem de fundo que se adapta à mudança de tamanho da tela. Algumas respostas de campo também foram pensadas, como o aparecimento e o limite de incremento quando for selecionado cifra de César. Os botões radio são personalizados, sua seleção sendo validada e estilizado via javascript, utilizando manipulação do CSS através do DOM. <br>
Por fim, foram desenvolvidos os algoritmos de codificação e descodificação. O maior processo foi para Cifra de Cézar, onde os caracteres foram convertidos para seu código char e incrementados com o valor passado pelo usuário. Utilizado RegExp para encontrar índices de letras maiúsculas e fazer que o codificado também fosse maiúscula no índice, e também para manter símbolos e caracteres especiais. Para o base64, foram usadas as funções nativas do JS *atob()* e *btoa()*. <br>
Como última etapa, foram feitos validações de formulário, evitando que campos não sejam preenchidos ou que contenham dados inválidos.

## Como executar o projeto

O projeto pode ser acessado e executado através da Pages do repositório, através do link: https://jhonny515.github.io/Mensagem-Oculta---Projeto-Individual-2/
