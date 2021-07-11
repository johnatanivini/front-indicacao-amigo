import { Button, Card, CardContent, Container, Divider, Grid, LinearProgress, makeStyles, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react'
import { Router } from 'react-router-dom';
import config from '../config/config';

const useStyles = makeStyles({
    card:{
        display:'flex',
        justifyContent:'center'
    },
    button:{
        marginTop:'1em'
    }
})

function Home() {
    const classes = useStyles()
    const [email, setEmail] = useState('johnatan.ivini@gmail.com')
    const [nome, setNome] = useState('Johnatan')
    const [cpf, setCpf] = useState('01836593333')
    const [telefone, setTelefone] = useState('85987543565')
    const [success, setSuccess] = useState(false)
    const [retornoAxios, setRetornoAxios] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(event)
    {
        setLoading(true)
        event.preventDefault()
        console.log('Log:', `Email - ${email} - Nome - ${nome} - Cpf - ${cpf} - Telefone - ${telefone}`)

        const dados = {
            nome : nome,
            email:email,
            telefone: telefone,
            cpf: cpf
        }

        axios.post(`${config.api.base_url}/indicacoes`,dados, {
            headers: config.headers
        }).then(response => {

            
            if (response.statusText === 'OK' || response.status === 201) {
                setSuccess(true)
                setRetornoAxios(response.message ? response.message : 'Seu amigo foi indicado')
            }


            setLoading(false)
            }).catch(error => {
                setSuccess(false)
                if(!error.response) {
                    setRetornoAxios('Error: Network Error')
                }

                if(error.response) {
                    
                    if(error.response.data.errors) {
                        
                        setRetornoAxios(Object.values(error.response.data.errors).join('/'))
                    }

                    if(!error.response.data.errors) {
                        setRetornoAxios('Ocorreu um erro na API')
                    }
                }

                setLoading(false)
            })
    }

    return (
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
            <Grid item xs={12} lg={6} md={6}>
            <Card md={12} width={2/4}>
                {loading && <LinearProgress color="secondary"/>}
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Indique um amigo!!
                    </Typography>

                    {!success &&  retornoAxios &&                   
                        <Alert severity="error">
                            {retornoAxios}
                        </Alert>
                    }
                     {success &&  retornoAxios  &&               
                        <Alert severity="success">
                            {retornoAxios}
                        </Alert>
                    }
                    <form className='form-indicacao'  autoComplete="off" onSubmit={handleSubmit}>
                        <TextField required id="nome" minLength="5" value={nome} label="Nome" maxLength="120" onInput={e => setNome(e.target.value)} />
                        <Divider />
                        <TextField required id="cpf" label="CPF" placeholder="999.999.999-99" max="14" min="14" value={cpf} onInput={e => setCpf(e.target.value)} />
                        <Divider />
                        <TextField required id="email" type="email" minLength="10" maxLength="120" label="Email" value={email} onInput={e => setEmail(e.target.value)} />
                        <Divider />
                        <TextField  id="telefone" maxLength="16" min="15" placeholder="(99) 9 9999-9999" label="Telefone" value={telefone}  onInput={e => setTelefone(e.target.value)}/>
                        <Divider />
                        <Button type="submit" color="secondary" variant="contained" className={classes.button}>
                            Indicar
                        </Button>
                    </form>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
    );
}

export default Home