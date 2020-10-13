export default function(callback){
    //Private
    let url = '/equipe4/';
    //Private
    const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
    if (hash !== null){
        const type = hash.substr(Math.ceil(hash.length - 1) / 2, 1);
        switch (type) {
            case '0': url = "/perfil/estudante"; break;
            case '1': url = "/perfil/responsavel"; break;
            case '2': url = "/perfil/servidor"; break;
            default: url = "/"; break;
        }
    }
    callback(url);
}