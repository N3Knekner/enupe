export default async function(callback = (url="/")=>{}, url = "/"){

    const instantUrl = window.location.pathname;
    console.log(instantUrl);

    const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
    if (hash === null) return route();

    const type = hash.substr(Math.ceil(hash.length - 1) / 2, 1);
    switch (type) {
        case '0': url = "/perfil/estudante"; break;
        case '1': url = "/perfil/responsavel"; break;
        case '2': url = "/perfil/servidor"; break;
        default: url = "/"; break;
    }
    route();

    function route(){
        if("/equipe4"+url === instantUrl) return;
        else if ("/equipe4/desenvolvedores" === instantUrl
        ||       "/equipe4/updatePassword" === instantUrl) return;
        callback(url);
    }
}