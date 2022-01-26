'use strict';


const limparFormulario = (endereco) => {
   document.getElementById('endereco').value = "";
   document.getElementById('numero').value = "";
   document.getElementById('bairro').value = "";
   document.getElementById('cidade').value = "";
   document.getElementById('estado').value = "";
   
}

const preencherFormulario = (endereco) => {
   limparFormulario();
   document.getElementById('endereco').value = endereco.logradouro;
   document.getElementById('numero').value = endereco.gia;
   document.getElementById('bairro').value = endereco.bairro;
   document.getElementById('cidade').value = endereco.localidade;
   document.getElementById('estado').value = endereco.uf;
   
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);


const pesquisarCep = async() => {
   limparFormulario()
   const cep = document.getElementById('cep').value;
   const url = `http://viacep.com.br/ws/${cep}/json`;
   if (cepValido(cep)){
   const dados = await fetch(url);
   const endereco = await dados.json();
   if( endereco.hasOwnProperty('erro')){
      document.getElementById('endereco').value ='CEP não encontrado';
      document.getElementById('numero').value ='CEP não encontrado';
      document.getElementById('bairro').value ='CEP não encontrado';
      document.getElementById('cidade').value ='CEP não encontrado';
      document.getElementById('estado').value ='CEP não encontrado';
   }else {
      preencherFormulario(endereco);
    }
   }else{
      document.getElementById('endereco').value = 'CEP incorreto';
   }
}

document.getElementById('btn')
        .addEventListener('click', pesquisarCep);
