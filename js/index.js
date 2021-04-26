const Id = document.getElementById('Id');
const nombre = document.getElementById('nombre');
const IDVoto = document.getElementById('IDVoto');
const registrarBtn = document.getElementById('registrarBtn');
const registrarVotoBtn = document.getElementById('registrarVotoBtn');
const verCandidatosBtn = document.getElementById('verCandidatosBtn');
const verVotantesBtn = document.getElementById('verVotacionesBtn');

const database = firebase.database();
let counter = 0;

registrar = () => {
    let n = nombre.value;
    let i = Id.value;

    console.log(i);

    if (i == "" || n == "") {
        alert('El ID o el nombre estan vacios');
        return;
    }

    let objetoParticipante = {
        ID: i,
        nombre: n,
    };

    database.ref('participantes/' + objetoParticipante.ID).set(objetoParticipante);
}

registrarBtn.addEventListener('click', registrar);

registrarVotos = () => {
    let id = IDVoto.value;

    if (id == "") {
        alert('El ID esta vacio');
        return;
    }

    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let fecha = null;

    if (month < 10) {
        fecha = `${day}-0${month}-${year}`;

    } else {
        fecha = `${day}-${month}-${year}`;
    }

    let objetoVotante = {
        ID: id,
        Fecha: fecha,
    };

    database.ref('participantes').on('value', function (data) {

        data.forEach(
            function (user) {

                let clave = user.key;
                if (id == clave) {
                    database.ref('Votos/' + objetoVotante.ID).push().set(objetoVotante);
                }

            }

        );

    });

}


registrarVotoBtn.addEventListener('click', registrarVotos);

verCandi = () => {
    database.ref('participantes').on('value', function (data) {

        data.forEach(
            function (user) {

                let valor = user.val();

                alert('ID: ' + valor.ID + ', nombre: ' + valor.nombre);

            }

        );

    });
}

verCandidatosBtn.addEventListener('click', verCandi);

verVotos = () => {
    database.ref('participantes').on('value', function (data) {

        data.forEach(
            function (user) {

                let clave = user.key;
                database.ref('Votos/').on('value', function (data) {
                

                
                }



                );

            });

    }
    );
}


