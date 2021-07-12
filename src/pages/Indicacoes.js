import { Fab, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { CheckCircle, Delete } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../config/config'



const useStyles = makeStyles({
    card:{
       margin:'20px',
       marginTop:'5rem'
    },
    button:{
        marginTop:'1em'
    }
})

function Indicacoes () {

    const classes = useStyles()
    const [indicacoes, setIndicacoes]= useState([])
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState(false);

    const base_url = config.api.base_url
    const token = config.token


    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${token}`
            config.headers.Accept = 'application/json'
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    function remove(id)
    {
        setLoading(true)
        axios.delete(`${base_url}/indicacoes/${id}`).then(response => {
            setLoading(false)
            getIndicacoes()
        }).catch(error => {
            setMsg(error.message)
        })
    }

     function updateStatus(id)
    {
       setLoading(true)
       axios.put(`${base_url}/indicacoes/${id}`).then(response => {
            setLoading(false)
            switch(response.status){
                case 201:
                case 200:
                    getIndicacoes()
                    break                    
                default:
                    setMsg(response.data.message)
                    break
                    break
            }
           
        }).catch(error => {
            setMsg(error.message)
        })
    }

    const getIndicacoes = () => { 

        setLoading(true)
         axios.get(`${base_url}/indicacoes`).then(response => {
              setLoading(false)
              const {data} = response.data

              data.sort((a,b) => {
                  return a.id - b.id || a.pessoa.nome.localCompare(b.pessoa.nome) 
              })

              setIndicacoes(data)
          }).catch(error => {
            setMsg(error.message)
        })
      }

    useEffect(()=>{

        getIndicacoes();
         
    },[])

    return (
        <Paper className={classes.card}>
            {loading && <LinearProgress color="secondary"/>}
            {msg && <Alert severity="info">{msg}</Alert>}
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Cpf</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {indicacoes.map((row, index) => {
                            
                            let  severity = 'info';

                            switch(row.status.nome){
                                case 'INICIADA':
                                    severity = 'info'
                                    break
                                case 'EM ANDAMENTO':
                                    severity = 'secondary'
                                    break
                                case 'FINALIZADA':
                                    severity = 'primary'
                                    break;
                                default:
                                    severity = 'error'
                                    break;
                            }

                        return ( 
                          <TableRow key={row.pessoa.cpf}>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.pessoa.nome}</TableCell>
                                <TableCell align="right">{row.pessoa.contatos.filter((contato) => {
                                    if(contato.tipo_contato.nome === 'Email'){
                                        return true
                                    }
                                    return false
                                })[0].valor}
                                </TableCell>
                                <TableCell align="right">{row.pessoa.contatos.filter((contato) => {
                                    if(contato.tipo_contato.nome === 'Telefone'){
                                        return true
                                    }
                                    return false
                                })[0].valor}
                                </TableCell>
                                <TableCell align="right">
                                   
                                    <Typography color={severity}>
                                            {row.status.nome}
                                    </Typography>
                                    
                                </TableCell>
                                <TableCell align="right">
                                   
                                    <Fab color="primary" aria-label="add" onClick={() => updateStatus(row.id)}>
                                        <CheckCircle />
                                    </Fab>
                                    
                                    <Fab color="secondary" aria-label="remove" onClick={() => remove(row.id)}>
                                        <Delete/>
                                    </Fab>
                                   
                               </TableCell>

                            </TableRow> 
                        )

                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}



export default Indicacoes