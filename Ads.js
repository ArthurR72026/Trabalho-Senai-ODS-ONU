/* =========================================================
   CATÁLOGO DE PROJETOS
========================================================= */


/* =========================================================
   CONFIGURAÇÃO DOS PROJETOS
========================================================= */

const projetos = [

    {
        titulo: "Projeto 01",

        imagem:
            "https://placehold.co/800x500/1e1e1e/ffffff?text=Projeto+01",

        descricao:
            "Descrição do primeiro projeto. Aqui você poderá explicar brevemente o objetivo e as principais características.",

        link: "#"
    },


    {
        titulo: "Projeto 02",

        imagem:
            "https://placehold.co/800x500/1e1e1e/ffffff?text=Projeto+02",

        descricao:
            "Descrição do segundo projeto. Você poderá substituir este conteúdo pelas informações do seu projeto.",

        link: "#"
    },


    {
        titulo: "Projeto 03",

        imagem:
            "https://placehold.co/800x500/1e1e1e/ffffff?text=Projeto+03",

        descricao:
            "Descrição do terceiro projeto. Você poderá substituir este conteúdo pelas informações do seu projeto.",

        link: "#"
    },


    {
        titulo: "Projeto 04",

        imagem:
            "https://placehold.co/800x500/1e1e1e/ffffff?text=Projeto+04",

        descricao:
            "Descrição do quarto projeto. Você poderá substituir este conteúdo pelas informações do seu projeto.",

        link: "#"
    },


    {
        titulo: "Projeto 05",

        imagem:
            "https://placehold.co/800x500/1e1e1e/ffffff?text=Projeto+05",

        descricao:
            "Descrição do quinto projeto. Você poderá substituir este conteúdo pelas informações do seu projeto.",

        link: "#"
    },


    {
        titulo: "Projeto 06",

        imagem:
            "https://placehold.co/800x500/1e1e1e/ffffff?text=Projeto+06",

        descricao:
            "Descrição do sexto projeto. Você poderá substituir este conteúdo pelas informações do seu projeto.",

        link: "#"
    }

];



/* =========================================================
   ELEMENTOS DO HTML
========================================================= */

const listaProjetos =
    document.getElementById("listaProjetos");

const btnTema =
    document.getElementById("btnTema");

const formAvaliacao =
    document.getElementById("formAvaliacao");

const btnAbrirAvaliacoes =
    document.getElementById("btnAbrirAvaliacoes");



/* =========================================================
   URL DO CLOUDFLARE WORKER
========================================================= */

const URL_WORKER =
    "https://catalogo-avaliacoes-api.avaliacoestrabalhosenai.workers.dev/";



/* =========================================================
   MOSTRAR PROJETOS
========================================================= */

function mostrarProjetos() {

    if (!listaProjetos) {

        console.error(
            "Elemento #listaProjetos não foi encontrado no HTML."
        );

        return;
    }


    listaProjetos.innerHTML = "";


    if (projetos.length === 0) {

        listaProjetos.innerHTML = `
            <div class="col-12">

                <div class="alert alert-secondary text-center">
                    Nenhum projeto disponível no momento.
                </div>

            </div>
        `;

        return;
    }


    projetos.forEach((projeto) => {

        const linkValido =
            projeto.link &&
            projeto.link !== "#" &&
            projeto.link.trim() !== "";


        const botaoProjeto =

            linkValido

                ? `
                    <a
                        href="${projeto.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn-acessar-projeto"
                    >
                        🔗 Acessar Projeto
                    </a>
                `

                : `
                    <div class="btn-projeto-indisponivel">
                        🔗 Link em breve
                    </div>
                `;


        const card =
            document.createElement("div");


        card.className =
            "col-xl-4 col-lg-4 col-md-6 col-sm-12";


        card.innerHTML = `

            <article class="card-projeto">

                <div class="imagem-projeto-container">

                    <img
                        src="${projeto.imagem}"
                        alt="Imagem do projeto ${projeto.titulo}"
                        class="imagem-projeto"
                        loading="lazy"
                    >

                </div>


                <div class="card-projeto-body">

                    <h3 class="titulo-projeto">
                        ${projeto.titulo}
                    </h3>


                    <p class="descricao-projeto">
                        ${projeto.descricao}
                    </p>


                    ${botaoProjeto}

                </div>

            </article>

        `;


        listaProjetos.appendChild(card);

    });

}



/* =========================================================
   TEMA
========================================================= */

function alternarTema() {

    document.body.classList.toggle(
        "tema-claro"
    );


    const temaClaro =
        document.body.classList.contains(
            "tema-claro"
        );


    if (temaClaro) {

        if (btnTema) {

            btnTema.textContent =
                "☀️";

            btnTema.title =
                "Ativar tema escuro";

        }


        localStorage.setItem(
            "temaCatalogo",
            "claro"
        );

    } else {

        if (btnTema) {

            btnTema.textContent =
                "🌙";

            btnTema.title =
                "Ativar tema claro";

        }


        localStorage.setItem(
            "temaCatalogo",
            "escuro"
        );

    }

}



/* =========================================================
   CARREGAR TEMA
========================================================= */

function carregarTema() {

    const temaSalvo =
        localStorage.getItem(
            "temaCatalogo"
        );


    if (temaSalvo === "claro") {

        document.body.classList.add(
            "tema-claro"
        );


        if (btnTema) {

            btnTema.textContent =
                "☀️";

            btnTema.title =
                "Ativar tema escuro";

        }

    } else {

        document.body.classList.remove(
            "tema-claro"
        );


        if (btnTema) {

            btnTema.textContent =
                "🌙";

            btnTema.title =
                "Ativar tema claro";

        }

    }

}



/* =========================================================
   ACESSO À ÁREA DE AVALIAÇÕES
========================================================= */

if (btnAbrirAvaliacoes) {

    btnAbrirAvaliacoes.addEventListener(
        "click",
        async function () {

            const resultado =
                await Swal.fire({

                    title:
                        "Área restrita",

                    text:
                        "Digite a senha dos desenvolvedores.",

                    input:
                        "password",

                    inputPlaceholder:
                        "Digite a senha",

                    inputAttributes: {

                        autocapitalize:
                            "off",

                        autocorrect:
                            "off",

                        autocomplete:
                            "current-password"

                    },

                    showCancelButton:
                        true,

                    confirmButtonText:
                        "Entrar",

                    cancelButtonText:
                        "Cancelar",

                    confirmButtonColor:
                        "#2864e8",

                    showLoaderOnConfirm:
                        true,

                    allowOutsideClick:
                        () => !Swal.isLoading(),


                    preConfirm:
                        async (senha) => {

                            if (!senha) {

                                Swal.showValidationMessage(
                                    "Digite a senha."
                                );

                                return false;
                            }


                            try {

                                const resposta =
                                    await fetch(
                                        URL_WORKER + "auth",
                                        {
                                            method:
                                                "POST",

                                            headers: {

                                                "Content-Type":
                                                    "application/json"

                                            },

                                            body:
                                                JSON.stringify({

                                                    senha:
                                                        senha

                                                })

                                        }
                                    );


                                let dados;


                                try {

                                    dados =
                                        await resposta.json();

                                } catch {

                                    throw new Error(
                                        "Resposta inválida do servidor."
                                    );

                                }


                                console.log(
                                    "Resposta da autenticação:",
                                    dados
                                );


                                if (
                                    !resposta.ok ||
                                    !dados.sucesso
                                ) {

                                    throw new Error(
                                        dados.mensagem ||
                                        "Senha incorreta."
                                    );

                                }


                                return dados;


                            } catch (erro) {

                                console.error(
                                    "Erro na autenticação:",
                                    erro
                                );


                                Swal.showValidationMessage(
                                    erro.message ||
                                    "Não foi possível validar a senha."
                                );


                                return false;

                            }

                        }

                });


            /* =================================================
               ACESSO AUTORIZADO
            ================================================= */

            if (
                resultado.isConfirmed &&
                resultado.value &&
                resultado.value.token
            ) {

                const token =
                    resultado.value.token;


                /*
                   O token fica salvo somente
                   durante esta sessão do navegador.
                */

                sessionStorage.setItem(
                    "tokenAvaliacoes",
                    token
                );


                console.log(
                    "Token de avaliações salvo na sessão."
                );


                await Swal.fire({

                    icon:
                        "success",

                    title:
                        "Acesso autorizado!",

                    text:
                        "Abrindo área de avaliações...",

                    timer:
                        900,

                    showConfirmButton:
                        false

                });


                window.location.href =
                    "avaliacoes.html";

            }

        }
    );

}



/* =========================================================
   FORMULÁRIO DE AVALIAÇÃO
========================================================= */

if (formAvaliacao) {

    formAvaliacao.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const nome =
                document
                    .getElementById(
                        "nomeAvaliacao"
                    )
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById(
                        "emailAvaliacao"
                    )
                    ?.value
                    .trim();


            const nota =
                document
                    .getElementById(
                        "notaAvaliacao"
                    )
                    ?.value;


            const avaliacao =
                document
                    .getElementById(
                        "textoAvaliacao"
                    )
                    ?.value
                    .trim();



            /* =================================================
               VALIDAR CAMPOS
            ================================================= */

            if (
                !nome ||
                !email ||
                !nota ||
                !avaliacao
            ) {

                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    Swal.fire({

                        icon:
                            "warning",

                        title:
                            "Campos obrigatórios",

                        text:
                            "Preencha todos os campos antes de enviar."

                    });

                } else {

                    alert(
                        "Preencha todos os campos antes de enviar."
                    );

                }


                return;

            }



            /* =================================================
               VALIDAR E-MAIL
            ================================================= */

            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email);


            if (!emailValido) {

                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    Swal.fire({

                        icon:
                            "warning",

                        title:
                            "E-mail inválido",

                        text:
                            "Digite um e-mail válido."

                    });

                } else {

                    alert(
                        "Digite um e-mail válido."
                    );

                }


                return;

            }



            /* =================================================
               VALIDAR NOTA
            ================================================= */

            const notaNumerica =
                Number(nota);


            if (
                !Number.isInteger(notaNumerica) ||
                notaNumerica < 1 ||
                notaNumerica > 5
            ) {

                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    Swal.fire({

                        icon:
                            "warning",

                        title:
                            "Nota inválida",

                        text:
                            "Selecione uma nota entre 1 e 5."

                    });

                } else {

                    alert(
                        "Selecione uma nota entre 1 e 5."
                    );

                }


                return;

            }



            /* =================================================
               DADOS DA AVALIAÇÃO
            ================================================= */

            const dadosAvaliacao = {

                nome:
                    nome,

                email:
                    email,

                nota:
                    notaNumerica,

                avaliacao:
                    avaliacao

            };



            /* =================================================
               BOTÃO DE ENVIO
            ================================================= */

            const botaoEnviar =
                formAvaliacao.querySelector(
                    'button[type="submit"]'
                );


            if (botaoEnviar) {

                botaoEnviar.disabled =
                    true;

                botaoEnviar.textContent =
                    "⏳ Enviando...";

            }



            /* =================================================
               ENVIAR PARA O WORKER
            ================================================= */

            try {

                const resposta =
                    await fetch(
                        URL_WORKER,
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    dadosAvaliacao
                                )

                        }
                    );


                let resultado;


                try {

                    resultado =
                        await resposta.json();

                } catch {

                    throw new Error(
                        "O servidor retornou uma resposta inválida."
                    );

                }


                console.log(
                    "Resposta do Worker:",
                    resultado
                );


                if (
                    !resposta.ok ||
                    !resultado.sucesso
                ) {

                    throw new Error(
                        resultado.mensagem ||
                        "Não foi possível enviar a avaliação."
                    );

                }



                /* =================================================
                   SUCESSO
                ================================================= */

                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    await Swal.fire({

                        icon:
                            "success",

                        title:
                            "Avaliação enviada!",

                        text:
                            resultado.mensagem ||
                            "Sua avaliação foi registrada com sucesso."

                    });

                } else {

                    alert(
                        resultado.mensagem ||
                        "Sua avaliação foi registrada com sucesso."
                    );

                }


                formAvaliacao.reset();



            } catch (erro) {

                console.error(
                    "Erro ao enviar avaliação:",
                    erro
                );


                if (
                    typeof Swal !==
                    "undefined"
                ) {

                    Swal.fire({

                        icon:
                            "error",

                        title:
                            "Erro ao enviar",

                        text:
                            erro.message ||
                            "Não foi possível enviar sua avaliação."

                    });

                } else {

                    alert(
                        erro.message ||
                        "Não foi possível enviar sua avaliação."
                    );

                }



            } finally {

                if (botaoEnviar) {

                    botaoEnviar.disabled =
                        false;

                    botaoEnviar.textContent =
                        "📩 Enviar Avaliação";

                }

            }

        }
    );

}



/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarTema();

        mostrarProjetos();

    }
);