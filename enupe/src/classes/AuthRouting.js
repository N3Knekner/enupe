import {matchPath} from "react-router-dom";

export default async function(callback = (url="/")=>{}, url = "/"){
    
    let loggedURLs = ["/perfil", "/ocorrencias", "/notas", "/agenda"];

    const instantUrl = window.location.pathname;

    const hash = localStorage.getItem('authenticated') || sessionStorage.getItem('authenticated');
    if (hash === null) return route();

    const type = hash.substr(Math.ceil(hash.length - 1) / 2, 1);

    if (type !== 2) loggedURLs = loggedURLs.slice(0,3); //Block direct access from not autorized user to servers/admin URLs

    let match = 0;
    loggedURLs.forEach((e, i) => {
        if(matchPath(instantUrl, { path: "/equipe4" + e })) match = i;
    });

    switch (type) {
        case '0': url = loggedURLs[match] + "/estudante";   break;
        case '1': url = loggedURLs[match] + "/responsavel"; break;
        case '2': url = loggedURLs[match] + "/servidor";    break;
        default:  url = "/";                                break;
    }
    route();

    function route(){
        if      ("/equipe4" + url           === instantUrl) return;
        else if ("/equipe4/desenvolvedores" === instantUrl
        ||       "/equipe4/updatePassword"  === instantUrl) return;
        callback(url);
    }
}