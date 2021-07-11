import { Fab, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { CheckCircle, Delete } from '@material-ui/icons'
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
    const [token] = useState(config.token)
    const [loading, setLoading] = useState(true)

    useEffect(function(){

        axios.get(`${config.api.base_url}/indicacoes`,{
            headers: {
                'Accept':'application/json',
                'Authorization' : `Bearer `+ token
            }
        }).then(response => {
            setLoading(false)
            const {data} = response.data
            setIndicacoes(data)
        })

    },[])

    return (
        <Paper className={classes.card}>
            {loading && <LinearProgress color="secondary"/>}
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
                                    severity = 'warning'
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
                                   
                                    <Fab color="primary" aria-label="add">
                                        <CheckCircle />
                                    </Fab>
                                    
                                    <Fab color="secondary" aria-label="remove">
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