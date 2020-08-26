import React, {Fragment, useState, useEffect}from 'react';

import Formulario from './componentes/Formulario';
import Cita from './componentes/Cita';


function App() {

  //Citas en local storage 

  // Aca estamos obteniendo las citas en caso de que no haya citas inicia como array vacio
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales){
      citasIniciales=[];  //array vacio
    }

  // Arreglo de Cita

  const [citas, guardarCitas] = useState(citasIniciales);

  // UseEffect para realizar operaciones cuando el state cambia

  useEffect(() => {
      if(citasIniciales){ 
        localStorage.setItem('citas', JSON.stringify(citas));
      }else{
        localStorage.setItem('citas', JSON.stringify([]));

      }
  }, [citas, citasIniciales]);

  // Funcion que toma la citas actuales y agrega una nueva

  const crearCita = (cita) =>{
    guardarCitas([ ...citas, cita]);
  }

  // Funcion que elimina la cita por su ID

  const elimiarCita = (id) =>{
      const nuevaCita = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevaCita);
  }

  //Mensaje de Administra o no tu cita

  const mensaje = (citas.length) === 0  ? 'No hay citas' : 'Administra tus citas';

  return (

    <Fragment>
      <h1>Adminitrador de Pacientes</h1>

      <div className="container">
        <div className="Row">
          <div className="one-half column">
                <Formulario 
                  crearCita={crearCita}
                />
          </div>
          <div className="one-half column">
                <h2>{mensaje}</h2>
                {citas.map(cita =>(
                  <Cita 
                    elimiarCita={elimiarCita}
                    key={cita.id}
                    cita={cita}
                  />

                ))}
                
          </div>
        </div>
      </div>

    </Fragment>
    
  );
}

export default App;
