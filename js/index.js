const ID = document.getElementById('ID');
const nombre = document.getElementById('nombre');
const IDVoto = document.getElementById('IDVoto');
const correo = document.getElementById('correo');
const pass = document.getElementById('pass');
const repass = document.getElementById('repass');
const registrarBtn = document.getElementById('registrarBtn');

const database = firebase.database();

registrar = () => {
    let n = nombre.value;
    let a = apellido.value;
    let u = usuario.value;
    let c = correo.value;
    let p = pass.value;
    let rp = repass.value;

    if (p !== rp){
        alert ('Las contraseñas no coinciden');
        return;
    }

    if (p== ''){
        alert('no escribio una contraseña');
        return;
    }

    let objetoUsuario = {
        nombre: n,
        apellido: a,
        usuario: u,
        correo: c,
        pass: p,
    };

    let json =JSON.stringify(objetoUsuario);

    database.ref('users').push().set(objetoUsuario);
    }

registrarBtn.addEventListener('click', registrar);

database.ref('users').on('value', function(data){
data.forEach(
    function (user) {
    let clave = user.key;
    let valor = user.val();
    console.log(clave);
    console.log(valor.nombre);
}
);
});
