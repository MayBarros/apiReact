import {useState} from 'react';
import {FiSearch} from 'react-icons/fi'
import './styles.css';
import React from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('') //input é o estado da variavel mostra/chama o que foi escrito - o setinput é a função para trocar o estado. o usestate vazio é como a variavel deve comçar
  const [cep,setCep] = useState({}); //criando outra variavel para guardar os dados recebidos do cep


  async function handleSearch(){
    if (input === ' '){
      alert("Preencha algum CEP!")
      return; //para parar a execução do código
    }

    try{
      const reponse = await api.get(`${input}/json`);
      setCep(reponse.data)
      setInput(" ");

    }catch{

      alert("Ops erro ao buscar CEP");
      setInput(" ")//limpa o input

    }
  }
  
  return (
    <div className="container">
     <h1 className="title">Buscador de CEP</h1>

     <div className="containerInput">
        <input type="text"  placeholder="Digite um CEP.."
        value={input} //tudo que for saldo irá para a varivavel input
        onChange={(e) => setInput(e.target.value) } // guardando o valor digitado e passando para o usetate input
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF'/>
        </button>
     </div>

    {/* colocando o campo de mostrar dados apenas se houver pesquisa */}

     {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>

     </main>
     )}

     
    </div>
  );
}

export default App;
