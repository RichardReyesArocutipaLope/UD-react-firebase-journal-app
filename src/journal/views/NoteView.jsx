import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = ({ note, messageSaved, isSaving }) => {

    const { body, title, date, onInputChange, formState } = useForm(note)

    const dispatch = useDispatch();

    const fileInputRef = useRef();
    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved?.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files == 0) return;
        dispatch(startUploadingFiles(target.files))

    }

    return (
        <>
            <Grid
                container direction='row'
                justifyContent="space-between"
                alignItems={'center'} sx={{ mb: 1 }}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid item>
                    <Typography fontSize={39} fontWeight={'light'}>
                        {dateString}
                    </Typography>
                </Grid>

                <input
                    type="file" multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />
                <IconButton color="primary" disabled={isSaving} onClick={() => { fileInputRef.current.click() }}>
                    <UploadOutlined />
                </IconButton>

                <Grid item>
                    <Button
                        disabled={isSaving}
                        color='primary'
                        sx={{ padding: 2 }}
                        onClick={onSaveNote}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} /> Guardar
                    </Button>
                </Grid>

                <Grid container>
                    <TextField
                        type="text"
                        variant="filled" fullWidth
                        placeholder="Ingrese un titulo"
                        label='Título'
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={title}
                        onChange={onInputChange}
                    />
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth multiline
                        placeholder="¿Que sucedio hoy?"
                        minRows={5}
                        name="body"
                        value={body}
                        onChange={onInputChange}
                    />
                </Grid>

                <ImageGallery images={note.imageUrls}/>

            </Grid>
        </>
    )
}

// prueba de cambio de correo
