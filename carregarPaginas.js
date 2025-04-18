

function entrarEmContato() {


    let numero = "+5511968559541";
    let mensagem = "Olá, estou entrando em contato atráves do site *www.sitebooster.com.br* tenho interesse em saber mais sobre os serviços oferecidos.";

    let url = `https://wa.me/${numero}/?text=${mensagem}`;
    let urlDirecionamento = "paginaEmConstrucao.html";
    window.open(url);

}

function voltarAoInicio() {
    location = "index.html";
}

