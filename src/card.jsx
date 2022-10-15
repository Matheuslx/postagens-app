import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal'
import Loader from './loader';

export default function card(props) {
    let postagens = props.postagens
  return (
    <div>
        <div style={{'margin': '10px'}} className='row flex-center'>
            <div style={{'padding': '0px', 'margin': '0px'}} className='col-md-12'>
                {postagens.length>0? 
                postagens.map((p,i)=> {
                return (
                    p.userId &&
                    <div className='flex-center'>
                    <div className='dados'>
                        <h2 className='textoDados'>{`${p.title ?? ""}`}</h2>
                        <span className='textoDados'>{`${p.body ?? ""}`}</span>
                         
                    </div>
                        <div className='icones'>
                            <a onClick={()=>props.remove(p.id, i)} className="m-10 btn btn-success icon">
                                <i className="bi bi-trash-fill btn-actions"></i>
                            </a>
                            <a onClick={()=>props.edit(p)} className='m-10 btn btn-warning'>
                                <i class="bi bi-pencil btn-actions"></i>
                            </a>
                        </div>

                    </div>
                )})
            : <div>
               <h2>Nenhuma postagem por aqui :)</h2>
               <h3>Cadastre uma nova postagem ou clique em "Pesquisar postagens"</h3>
              </div> 
            
            }
            </div>  
        </div>

    </div>
  )
}
