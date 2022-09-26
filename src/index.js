// ./src/index.js
// importing the dependencies


/*
autores: Rodrigo Emiliano RA: 081190004 e Lucas Santos Costa RA:081190015
N1 2 Bimestre
Escreva uma API em NodeJS que receba os parâmetros :
• limite inferior m 
• limite superior n
• opção de método de execução: iterativa ou recursiva
A API deve calcular o produtório de acordo com os parâmetros de entrada e resultar
um JSON com o resultado final.

*/


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
/*
// defining an endpoint to return all ads
app.get('/', (req, res) => {
  console.log('inferior:='req.query.)  
  res.send(ads);
});*/

app.get('/produtorio', function (req, res) {
    inferior=req.query.inferior;
    superior=req.query.superior;
    opcao=req.query.opcao;
    
    //console.log('inferior: ' + req.query.inferior);
    //console.log('superior: ' + req.query.superior);
    //console.log('opcao: ' + req.query.opcao);

    if(inferior=== undefined || superior=== undefined || opcao=== undefined )
    {
        res.send({erro:"inferior, superior ou opcao não definidos!"}); 
    }
    else
    {
        if(opcao==='i')
        {
            let resultado=Produtorio_Iterativo(inferior,superior);
            //console.log('resultado= '+resultado);
            res.send({
                limite_inferior:inferior,
                limite_superior:superior,
                opcao:'iterativa',
                resultado:resultado
            });
        }
        else if(opcao==='r')
        {
            let resultado=Produtorio_recursivo(1,inferior,superior);
            //console.log('resultado= '+resultado);
            res.send({
                limite_inferior:inferior,
                limite_superior:superior,
                opcao:'recursiva',
                resultado:resultado
            });
        }
        
        
    }
   
  });

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});

function CalcularIteracao(numero) {
    return ((parseFloat(numero))+(parseFloat((1/numero))));
  }

function Produtorio_Iterativo(inferior,superior)
{
    let produto=1;
    //console.log('produto inicial= '+ produto);
    for (let i = inferior; i <= superior; i++) {
        let variavel=CalcularIteracao(i);
        produto=produto * variavel;
        //console.log('CalcularIteracao = '+ variavel);
        //console.log('produto = '+ produto);
      }

    return produto;
}

function Produtorio_recursivo(numero,inferior,superior)
{
    //console.log('numero = '+ numero);
    //console.log('inferior = '+ inferior);
    //console.log('superior = '+ superior);
    if(inferior<=superior)    
        return Produtorio_recursivo(numero*CalcularIteracao(inferior),parseFloat(inferior)+parseFloat(1),superior);
    else
        return numero;
}