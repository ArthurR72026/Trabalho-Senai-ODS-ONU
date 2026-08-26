/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const API_URL =
    "https://catalogo-avaliacoes-api.avaliacoestrabalhosenai.workers.dev";


/* =========================================================
   ELEMENTOS
========================================================= */

const listaAvaliacoes =
    document.getElementById("listaAvaliacoes");


const carregando =
    document.getElementById("carregando");


const mensagemErro =
    document.getElementById("mensagemErro");


const semAvaliacoes =
    document.getElementById("semAvaliacoes");


const btnAtualizar =
    document.getElementById("btnAtualizar");


/* =========================================================
   CRIAR ESTRELAS
========================================================= */

function criarEstrelas(nota) {

    const notaNumerica =
        Number(nota);


    let estrelas = "";


    for (let i = 1; i <= 5; i++) {

        if (i <= notaNumerica) {

            estrelas += "★";

        } else {

            estrelas += "☆";

        }

    }


    return estrelas;

}


/* =========================================================
   FORMATAR DATA
========================================================= */

function formatarData(data) {

    if (!data) {

        return "";

    }


    const dataObjeto =
        new Date(
            data.replace(" ", "T")
        );


    if (Number.isNaN(dataObjeto.getTime())) {

        return data;

    }


    return dataObjeto.toLocaleString(
        "pt-BR",
        {
            dateStyle: "short",
            timeStyle: "short"
        }
    );

}


/* =========================================================
   MOSTRAR AVALIAÇÕES
========================================================= */

function mostrarAvaliacoes(avaliacoes) {

    listaAvaliacoes.innerHTML = "";


    if (
        !Array.isArray(avaliacoes) ||
        avaliacoes.length === 0
    ) {

        semAvaliacoes.hidden = false;

        return;

    }


    semAvaliacoes.hidden = true;


    avaliacoes.forEach(
        (avaliacao) => {

            const card =
                document.createElement("article");


            card.className =
                "card-avaliacao";


            /*
            =================================================
            TOPO
            =================================================
            */

            const topo =
                document.createElement("div");


            topo.className =
                "card-topo";


            /*
            =================================================
            INFORMAÇÕES DO USUÁRIO
            =================================================
            */

            const informacoes =
                document.createElement("div");


            const nome =
                document.createElement("h3");


            nome.className =
                "nome-avaliador";


            nome.textContent =
                avaliacao.nome ||
                "Usuário";


            const data =
                document.createElement("div");


            data.className =
                "data-avaliacao";


            data.textContent =
                formatarData(
                    avaliacao.data
                );


            informacoes.appendChild(nome);

            informacoes.appendChild(data);


            /*
            =================================================
            ESTRELAS
            =================================================
            */

            const estrelas =
                document.createElement("div");


            estrelas.className =
                "estrelas";


            estrelas.setAttribute(
                "aria-label",
                `Nota ${avaliacao.nota} de 5`
            );


            estrelas.textContent =
                criarEstrelas(
                    avaliacao.nota
                );


            /*
            =================================================
            TEXTO
            =================================================
            */

            const texto =
                document.createElement("p");


            texto.className =
                "texto-avaliacao";


            texto.textContent =
                avaliacao.avaliacao ||
                "";


            /*
            =================================================
            MONTAR CARD
            =================================================
            */

            topo.appendChild(
                informacoes
            );


            topo.appendChild(
                estrelas
            );


            card.appendChild(
                topo
            );


            card.appendChild(
                texto
            );


            listaAvaliacoes.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   BUSCAR AVALIAÇÕES
========================================================= */

async function carregarAvaliacoes() {

    carregando.hidden = false;

    mensagemErro.hidden = true;

    semAvaliacoes.hidden = true;


    try {

        const resposta =
            await fetch(
                API_URL,
                {
                    method: "GET"
                }
            );


        const dados =
            await resposta.json();


        if (
            !resposta.ok ||
            !dados.sucesso
        ) {

            throw new Error(
                dados.mensagem ||
                "Não foi possível carregar as avaliações."
            );

        }


        mostrarAvaliacoes(
            dados.avaliacoes
        );


    } catch (erro) {

        console.error(
            "Erro ao carregar avaliações:",
            erro
        );


        mensagemErro.textContent =
            "❌ Não foi possível carregar as avaliações. Tente novamente.";


        mensagemErro.hidden = false;


    } finally {

        carregando.hidden = true;

    }

}


/* =========================================================
   BOTÃO ATUALIZAR
========================================================= */

if (btnAtualizar) {

    btnAtualizar.addEventListener(
        "click",
        carregarAvaliacoes
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    carregarAvaliacoes
);