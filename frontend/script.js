//Login
var btnAtivado = false
var visibilityClick = false
function frg(){
    const eye = document.getElementById("eye")
    const input = document.getElementById("keyInput")
    if(visibilityClick == false){
        eye.innerHTML = "visibility_off"
        input.type = "text"
        visibilityClick = true
    }
    else{
        eye.innerHTML = "visibility"
        visibilityClick = false
        input.type = "password"
        console.log("invisible")
    }
}

var x = 0


function keyB(){
    console.log("É o seu numero: "+$("#calendario").css("left"))
    if(parseInt($("#calendario").css("left")) < 235){
        x -= 100
        $("#calendario").css("left","auto")
        $("#calendario").css("right",(x)+"px")
    }
}

function keyA(){
    x += 100 
    console.log(x)
    $("#calendario").css("left","auto")
    $("#calendario").css("right",(x)+"px")
}

function adicionarProfissionais() { ////////////MUDAR PROFISSIONAIS.NOME DUPLICADO
    let url = "/profissionais";
 
    let xhttp = new XMLHttpRequest(); //método do HTML que permite que faça requisições por script, no front
 
    xhttp.open("get", url, false) ; //abre a requisição do XMLHttpRequest com esses parâmetros. False é sobre ser síncrono, pois vai pegar só uma requisição. True é assíncrono (para realizar mais de uma requisição ao mesmo tempo)
 
    xhttp.send(); //manda para o servidor 
    
    let data = JSON.parse(xhttp.responseText); //recebe o dado que retorna do xhttp enviado ao servidor
    console.log(data[0]);
 
    $("#corpo-tabela-profissionais")[0].innerHTML = ''; //aqui tiramos todas as informações do array. Índice 0 pois o jQuery traz todos os elementos de "corpo-tabela-profissionais", mas queremos só o primeiro - que é a própria tabela (para depois dividir em linhas)
 
    data.forEach(PROFISSIONAIS => {  //cada linha da tabela se torna uma linha diferente. forEach = paraCada. 
       
       //acessa o 1º objeto da tabela e introduz a informação do banco de dados, acessando cada tabela do banco com o comando "${PROFISSIONAIS.}". No caso, "PROFISSIONAIS" é uma das tabelas e o que vem depois do "." é a coluna 
       $("#corpo-tabela-profissionais")[0].innerHTML += `
          <tr> 
            <td> <a data-toggle="modal" href="#modalhoras"><div class="modal_professional"> ${PROFISSIONAIS.nome} </div> </a> </td>
            <td> ${PROFISSIONAIS.nome} </td>
            <td> ${PROFISSIONAIS.tipo} </td>
            <td> ${PROFISSIONAIS.estado} </td>
            <td> ${PROFISSIONAIS.area} </td>
          </tr>             
       `  //aqui pode colocar scripts dentros, funções e tudo mais dentro dessa string (`)
          //${} permite passar um script  
          //foi correlacionado, dinamicamente, o banco de dados com a parte a ser implementada no texto
    });
}


//Get projetos
function geraTabelaProj(){
    const tabelaProj = document.getElementById("tabelaProj")
    let requestProj = new XMLHttpRequest();
    requestProj.onreadystatechange = function(){
        let dados = JSON.parse(this.responseText);
        let tamanhoDados = dados.length;
        let duracao = []
        tabelaProj.innerHTML = `<tr>
        <th>Projeto</th><!--primeira linha da tabela-->
        <th>Duração</th>
        <th>Nº Funcionários/Projetos</th>
        <th>Unidade</th>
        </tr>`
        for(let i = 0; i < tamanhoDados; i++){
            // if(dados[i].anoFim - dados[i].anoInicio > 0){
            // }
            duracao.push((dados[i].anoFim - dados[i].anoInicio)*12 + eval("meses." + dados[i].mesFim) - eval("meses."+ dados[i].mesInicio)) // O if estava sendo inútil, então tirei o código dele
            // else{
            //     duracao.push(eval("meses." + dados[i].mesFim) - eval("meses."+ dados[i].mesInicio))
            // }
            // console.log(duracao[i]);
            tabelaProj.innerHTML +=`<tr> <td id="coldata" class="aba"> <a href="#modalgraphs" data-toggle="modal">${dados[i].nome}</a> </td><td id="coldata" class="aba"> <a href="#modalgraphs" data-toggle="modal">${duracao[i]} Meses</a> <center> </td><td id="coldata"> <a href="#modalgraphs" data-toggle="modal">${dados[i].numberFunc}</a> <center> <td>${dados[i].unidade}</td></tr>`
        }
    }
    url = "projetos/tabela"
    requestProj.open("GET", url, true)
    requestProj.send()
}

//POST PROJETOS
function enviaProjeto(){
    const nomeProj = document.getElementById("nomeProj").value
    const unidadeProj = document.getElementById("unidadeProj").value
    const diaInicioProj = document.getElementById("diaInicioProj").value
    const mesInicioProj = document.getElementById("mesInicioProj").value
    const anoInicioProj = document.getElementById("anoInicioProj").value
    const mesFimProj = document.getElementById("mesFimProj").value
    const anoFimProj = document.getElementById("anoFimProj").value
    const areaProj = document.getElementById("areaProj").value
    url = "/projetos/adicionar"
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "nome": nomeProj,
                "area": areaProj,
                "mesInicio": mesInicioProj,
                "anoInicio": anoInicioProj,
                "mesFim": mesFimProj,
                "anoFim": anoFimProj,
                "unidade": unidadeProj
            }
        )
    });
}

var meses = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11
}

function getEmployees(){
    let requestLines = new XMLHttpRequest();
    requestLines.onload = function(){
        let dados = JSON.parse(this.responseText)
        let tamanhoDados = dados.length
        for(let i = 0; i < tamanhoDados; i++){
            alocacao(dados[i].nome,dados[i].id)
        }
    }
    /*rota que será exibida*/

    url = "/profissionais"
    requestLines.open("GET", url, true);
    requestLines.send();
}


function alocacao(nomedb,iddb){
    var nome = nomedb
    var id = iddb
    document.getElementById("alocacaos").innerHTML += "<option value="+id+">"+nome+"</option>"
}


