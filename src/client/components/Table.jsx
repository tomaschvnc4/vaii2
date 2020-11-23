import React, { useState, Fragment } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
//icons
import IconButton from '@material-ui/core/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { EditOutlined } from '@material-ui/icons'
import SaveIcon from '@material-ui/icons/Save'
import { TextField } from '@material-ui/core'

const defaultNewosoba = { id: 0, fullName: '', userName: '', plat: '', pozicia: '' }
const defaultEditFlag = { id: 0, isOpen: false }

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

// const useStyles = makeStyles({
//   table: {
//     minWidth: 100,
//   },
// });

export default function CustomizedTables(props) {
  console.log(props)
  const { remove, update } = props

  const [editFlag, setEditFlag] = useState(defaultEditFlag)
  const [newOsoba, setNewOsoba] = useState(defaultNewosoba)

  const handleChange = (e) => {
    const valueName = e.target.name
    const value = e.target.value
    value && setNewOsoba({ ...newOsoba, [valueName]: value })
    // setEditFlag({ ...editFlag, osoba.[valueName]: value })
    console.log('handle change')
    console.log(newOsoba)
  }
  const handleSaveBtn = (id) => {
    console.log('savebtn')
    console.log(newOsoba)
    update({ ...newOsoba, id })

    setEditFlag(defaultEditFlag)
    setNewOsoba(defaultNewosoba)
  }

  const fldStyle = { minWidth: 100 }
  //   const classes = useStyles();
  //   console.log(remove);
  return (
    <>
      <TableContainer component={Paper} xs={12}>
        <Table /*className={classes.table}*/ aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>
                <b>Name</b>
              </StyledTableCell>
              <StyledTableCell align='center'>Username</StyledTableCell>
              <StyledTableCell align='center'>Plat</StyledTableCell>
              <StyledTableCell align='center'>Pozicia</StyledTableCell>
              <StyledTableCell align='center'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.zamestnanci.map((osoba) => {
              //   console.log(osoba)
              const { id, fullName, userName, plat, pozicia } = osoba
              return (
                <Fragment key={id}>
                  <StyledTableRow>
                    <StyledTableCell align='center'>{fullName}</StyledTableCell>
                    <StyledTableCell align='center'>{userName}</StyledTableCell>
                    <StyledTableCell align='center'>{plat}</StyledTableCell>
                    <StyledTableCell align='center'>{pozicia}</StyledTableCell>
                    <StyledTableCell align='center'>
                      <IconButton
                        aria-label='editBtn'
                        color='primary'
                        onClick={() => {
                          if (editFlag.isOpen) {
                            if (editFlag.id === id) {
                              setEditFlag(defaultEditFlag)
                            }
                          } else {
                            setEditFlag({ id, isOpen: true })
                            setNewOsoba({ ...osoba })
                          }
                        }}>
                        <EditOutlined />
                      </IconButton>
                      <IconButton aria-label='delete' color='secondary' onClick={() => remove(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>

                  {editFlag.id === id && (
                    <StyledTableRow>
                      <StyledTableCell align='center'>
                        <TextField
                          style={fldStyle}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='Full Name'
                          name='fullName'
                          onChange={handleChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <TextField
                          style={fldStyle}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='username'
                          name='userName'
                          onChange={handleChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <TextField
                          style={fldStyle}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='plat'
                          name='plat'
                          onChange={handleChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <TextField
                          style={fldStyle}
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='pozicia'
                          name='pozicia'
                          onChange={handleChange}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <IconButton
                          aria-label='save'
                          color='primary'
                          onClick={() => {
                            handleSaveBtn(id)
                          }}>
                          <SaveIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
