import React, { Fragment, useEffect, useState } from 'react'
import { Button, Container, Grid, InputAdornment, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MyTable from './components/Table'
import Axios from 'axios'
import { useForm } from 'react-hook-form'

function App2() {
  const { handleSubmit, register, errors } = useForm()
  //   const [fullName, setFullName] = useState('')
  //   const [userName, setUserName] = useState('')

  const [isShow, setIsShow] = useState(true)
  const [isGet, setIsGet] = useState(true)

  const [zamestnanci, setZamestnanci] = useState([])

  const getZamestnanci = () => {
    //chcem to loadnut len ked sa zmeni nieco v DB a to tak ze nastavujem flag isGet
    Axios.get('http://localhost:3001/zamestnanci').then((response) => {
      //   console.log(response);
      setZamestnanci(response.data)
    })
  }

  const deleteZamestnanci = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      console.log(response)
      setZamestnanci(
        zamestnanci.filter((osoba) => {
          return osoba.id !== id
        })
      )
      setIsGet(true)
    })
  }

  const updateZamestnanec = (updatedZam) => {
    console.log('updateZamestnanec()')
    console.log(updatedZam)
    Axios.put('http://localhost:3001/update', { ...updatedZam }).then((response) => {
      console.log('update')
      setZamestnanci(
        zamestnanci.map((osoba) => {
          return osoba.id === updatedZam.id ? { ...updatedZam } : osoba
        })
      )
    })
  }

  const submit = (formData, e) => {
    e.target.reset()
    console.log(formData)
    // const { fullName, userName } = formData
    console.log('click')
    Axios.post('http://localhost:3001/create', {
      //   fullName,
      //   userName,
      ...formData,
    }).then((response) => {
      console.log('success')
      setIsGet(true)
      setZamestnanci([...zamestnanci, { id: response.data.insertId, ...formData }])
    })
  }

  {
    // const handleSubmitt = () => {
    //   // e.preventDefault();
    //   // console.log(fullName, userName);
    //   console.log('click')
    //   Axios.post('http://localhost:3001/create', {
    //     fullName,
    //     userName,
    //   }).then((response) => {
    //     console.log('success')
    //     setIsGet(true)
    //     setZamestnanci([...zamestnanci, { id: response.data.insertId, fullName, userName }])
    //   })
    // }
  }

  useEffect(() => {
    console.log('use effect GET FROM DB', isShow)
    if (isShow) {
      if (isGet) {
        getZamestnanci()
        setIsGet(false)
      }
    }
  }, [isShow, zamestnanci])

  console.count('render')
  console.log(errors)

  return (
    <Container xs={12} className='zarovnanie ' spacing={3}>
      <Paper elevation={3} className='paper'>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                variant='outlined'
                label='Full Name(*)'
                placeholder='Full Name'
                name='fullName'
                type='text'
                id='fullName'
                error={errors.hasOwnProperty('fullName')} //ak ju errory v poli atribut fullname tak znamena ze je error a nastavi na true
                helperText={errors.fullName?.message}
                // onChange={(e) => setFullName(e.target.value)}
                inputRef={register({ required: 'Meno je potrebne vyplnit' })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                variant='outlined'
                label='user name(*)'
                placeholder='user name'
                name='userName'
                type='text'
                id='userName'
                error={errors.hasOwnProperty('userName')}
                helperText={errors.userName?.message}
                inputRef={register({ required: 'Uzivatelske meno je potrebne vyplnit' })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                variant='outlined'
                label='plat(*)'
                placeholder='plat'
                name='plat'
                type='text'
                id='plat'
                // startAdornment={<InputAdornment position='start'>€</InputAdornment>}
                error={errors.hasOwnProperty('plat')}
                helperText={errors.plat?.message}
                inputRef={register({ required: 'Plat je potrebne vyplnit' })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                variant='outlined'
                label='pozicia(*)'
                placeholder='pozicia'
                name='pozicia'
                type='text'
                id='pozicia'
                // startAdornment={<InputAdornment position='start'>€</InputAdornment>}
                error={errors.hasOwnProperty('pozicia')}
                helperText={errors.pozicia?.message}
                inputRef={register({ required: 'Poziciu je potrebne vyplnit' })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                /*onClick={() => handleSubmitt()} */ type='submit'>
                Add To Database
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper className='paper'>
        <h2>Zamestnanci</h2>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={() => {
            setIsShow(!isShow)
          }}>
          Show/Hide
        </Button>
      </Paper>
      <Grid item xs={12} className='MyTable'>
        {isShow && (
          <Paper elevation={3}>
            <Grid item>
              <MyTable zamestnanci={zamestnanci} remove={deleteZamestnanci} update={updateZamestnanec} />
            </Grid>
          </Paper>
        )}
      </Grid>
    </Container>
  )
}
const useStyles = makeStyles((theme) => ({
  paper: {
    // height: 85,
    width: 80,
  },
}))

export default App2
