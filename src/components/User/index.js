
import { UserContext } from "../../contexts/user";
import { useContext, useState } from "react";

const User = () => {

  const [conteudo, setConteudo] = useState('');

  const handleChange = (e) => {
    setConteudo(e.target.value);
  }

  const alterarNome = () => {
    setUsername(conteudo);
    setConteudo('');
  }

  const { username, setUsername } = useContext(UserContext);

  return (
    <div className="user">
      <h3>Meu username é : {username}</h3>
      <br/>
      <input className="input-nome" value={conteudo} onChange={ handleChange} type="text" placeholder="Digite o seu nome" />
      <button className="alterar-nome" onClick={alterarNome}>Alterar nome</button>
    </div>
  )
};

export default User;