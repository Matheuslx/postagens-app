import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import swall from 'sweetalert2'
import Card from './card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal'
import Loader from './loader';


Modal.setAppElement("#root")

function App() {

  const [tituloEditar, setTituloEditar] = useState('')
  const [postagemEditar, setPostagemEditar] = useState('')
  const [openModalEditar, setOpenModalEditar] = useState(false)
  const [tituloCadastro, setTituloCadastro ] = useState('')
  const [postagemCadastro, setPostagemCadastro ] = useState('')
  const [postagens, setPostagens] = useState([])
  const [postagensFiltradas, SetPostagensFiltradas] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [exibirLoader, setExibirLoader] = useState(false);
  const [postagemAtual, setPostagemAtual] = useState({});

  const handleCloseModal = () => setOpenModal(false);
  const handleShowModal = () => setOpenModal(true);
  

  const removerPostagem = async (id, index)=>{
    postagens.splice(index,1)
    const novasPostagens = postagens || []
    setPostagens([...postagens])
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    
  }

  const editarPostagem = (postagem)=>{
    if(!postagem.id){
      errorAlert("Não é possivel editar uma postagem criada por você mesmo (API NÃO SUPORTA KKKK)")
      return false
    }
    setTituloEditar(postagem.title)
    setPostagemEditar(postagem.body)
    setPostagemAtual(postagem)
    setOpenModalEditar(true)
  
  }

  const editarPostagemAtual = async ()=>{
    let postagem = {}
    let title = tituloEditar
    let body = postagemEditar
    let userId = 1
    let id = postagemAtual.id
    let postagensAtualizadas = undefined

    postagem = {
      title,
      body,
      userId,
      id
    }

    if(!title || !body){
      noDataAlert()
      return false
    }

    setExibirLoader(true)
  
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, postagem)
      successAlert("Postagem editada com sucesso")
      postagens.map((p,i)=>{
        if(p.id==id){
          postagens[i] = postagem
        }
      }

      )
      setPostagens(postagens)

      handleCloseModalEditar()
      
    } catch (error) {
      errorAlert("Ocorreu um erro ao editar sua postagem!")
    }

    setExibirLoader(false);

  
  }

  const errorAlert = (msg) =>{
    return  swall.fire({
      icon: 'error',
      title: 'Vishhh',
      text: msg,
      })
  }
  const noDataAlert = () =>{
    return  swall.fire({
      icon: 'error',
      title: 'Opa opa opa',
      text: 'Preencha os campos corretamente para cadastrar sua postagem!',
      })
  }

  const successAlert = (msg)=>{
    return swall.fire(msg)
  }

  const handleChangePostagemEditar = (e)=>{
    setPostagemEditar(e.target.value)
  }

  const handleChangeTituloEditar = (e)=>{
    setTituloEditar(e.target.value)
  }
  const handleCloseModalEditar = ()=>{
    setOpenModalEditar(false)
  }

  const handleChangeTituloCadastro = (e)=>{
    setTituloCadastro(e.target.value)
  }

  const handleChangePostagemCadastro = (e)=>{
    setPostagemCadastro(e.target.value)
  }

  const atualizar= async ()=>{
    let postagens = undefined
    await axios.get('https://jsonplaceholder.typicode.com/posts/?userId=1')
    .then(resp=>postagens = resp.data)
    setPostagens(postagens)
  }
  
  const cadastrarPostagem = async () =>{
    let title = tituloCadastro
    let body = postagemCadastro
    if(!title || !body){
      noDataAlert()
      return false
    }
    let postagem = {title, body, userId:1}

    setExibirLoader(true)
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', postagem)
      successAlert("Postagem salva com sucesso!")
      setPostagens([...postagens, postagem])
      setTituloCadastro('')
      setPostagemCadastro('')
      handleCloseModal()
      
    } catch (error) {
      errorAlert("Ocorreu um erro ao salvar sua postagem!")
    }
    setExibirLoader(false);
  }

  return (
    <div className="home">
      <h2 className="title">Postagens</h2>
        <button onClick={()=>atualizar()} className="m-10 btn btn-primary botaoPesquisar">Pesquisar postagens</button>
        <button onClick={()=>handleShowModal()} className="m-10 btn btn-success botaoCadastrar">Cadastrar postagem</button>
        
        
        <Modal
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        >
          <div className='cadastro'>
            <div className='row flex-center'>
              <div style={{'margin': '10px'}} className='col-md-6 '>
                  <div className='flex-center' style={{'margin' : '10px'}}>
                    <h2 className='title'>Cadastro de Postagem</h2>   
                  </div>
                  <label htmlFor="tituloCadastro">Titulo da postagem</label>
                  <input type="text" value={tituloCadastro} onChange={(e)=>handleChangeTituloCadastro(e)} className="form-control" placeholder="Digite o titulo da postagem"/>
                  <br />
                  <label for="exampleFormControlTextarea1">Postagem:</label>
                  <textarea value={postagemCadastro} onChange={(e)=>handleChangePostagemCadastro(e)} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Digite sua postagem'></textarea>
                  <div className='flex-center' style={{'margin' : '10px'}}>
                    <Button style={{'margin-right': '10px'}} variant="danger" onClick={handleCloseModal}>Voltar</Button>     
                    <Button  variant="success" onClick={()=>cadastrarPostagem()}>Cadastrar</Button>     
      
                  </div>
              </div>
            </div>
            <div className='flex-center'>
              {exibirLoader && <Loader/>} 
            </div>
          </div>          
        </Modal>

        <Modal
        isOpen={openModalEditar}
        onRequestClose={handleCloseModalEditar}
        contentLabel="Example Modal"
        >
          <div className='cadastro'>
            <div className='row flex-center'>
              <div style={{'margin': '10px'}} className='col-md-6 '>
                  <div className='flex-center' style={{'margin' : '10px'}}>
                    <h2 onClick={()=>console.log(postagemAtual)} className='title'>Edição de Postagem</h2>   
                  </div>
                  <label htmlFor="tituloCadastro">Titulo da postagem</label>
                  <input type="text" value={tituloEditar} onChange={(e)=>handleChangeTituloEditar(e)} className="form-control" placeholder="Digite o titulo da postagem"/>
                  <br />
                  <label for="exampleFormControlTextarea1">Postagem:</label>
                  <textarea value={postagemEditar} onChange={(e)=>handleChangePostagemEditar(e)} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Digite sua postagem'></textarea>
                  <div className='flex-center' style={{'margin' : '10px'}}>
                    <Button style={{'margin-right': '10px'}} variant="danger" onClick={handleCloseModalEditar}>Voltar</Button>     
                    <Button  variant="success" onClick={()=>editarPostagemAtual()}>Editar</Button>     
      
                  </div>
              </div>
            </div>
            <div className='flex-center'>
              {exibirLoader && <Loader/>} 
            </div>
          </div>          
        </Modal>

        <Card
        postagens = {postagensFiltradas.length>0? postagensFiltradas : postagens}
        remove = {removerPostagem}
        edit = {editarPostagem}
        />


        
      
    </div>
  );
}

export default App;
 