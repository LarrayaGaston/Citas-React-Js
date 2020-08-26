import React, {Fragment, useState}from 'react';

// import {v4 as uuid} from "uuid"; //importamos libreria de ID
import { v4 as uuidv4 } from 'uuid'; //importamos libreria de ID
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    
    
    // Crear state

    const [cita, actualizarCita] = useState({
       mascota: '', 
       propietario:'',
       fecha:'',
       hora:'',
       sintomas:'' 
    });

    const [error, actualizarError] = useState(false)

    
    // Funcion que se ejec cada vez que un usuario escribe en un imput

    const actualizarState = (e) => {
        // console.log('escribiedno....');
        
        //console.log(e.target.name); // aca nos dice en que campo estamos escrib
        // console.log(e.target.value);
        actualizarCita({
            ...cita,
            [e.target.name]:[e.target.value]
        })
    }


    // Extraer Valores

     const {mascota,propietario,fecha,hora,sintomas} = cita;

   

    // Cuando el usuario preciona agregar cita 

    const submitCita = e =>{
        e.preventDefault();

        // Validar 

        if(mascota === '' || propietario === '' || fecha  === '' ||
        hora  === '' || sintomas  === '' ){

            actualizarError(true);
            return; // este return lo ponemos para que el codigo no siga corriendo 

        }
            
        

        // Eliminar mensanje de Error
        actualizarError(false);

        // Asignar un ID 

        cita.id = uuidv4();
        

        //Crear la Cita 

        crearCita(cita);

        //Reiniciar el Form

        actualizarCita({
            mascota: '', 
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:'' 
        })
    }

    return (  
        <Fragment>
            <h2>Crear Cita</h2>

                {error ? <p className="alerta-error">¡Todos los campos son obligatorios!</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre persona"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="Date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="Time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                    
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button 
                    type="submit"
                   className="u-full-width button-primary" 
                >Crear</button>

            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;