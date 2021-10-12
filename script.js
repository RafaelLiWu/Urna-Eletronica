let s = e => document.querySelector(e);

let seuVoto = s('.urna-tela-d-1-left-1 span');
let info = s('.urna-tela-d-1-left-4');
let cargo = s('.urna-tela-d-1-left-2 span');
let lateral = s('.urna-tela-d-1-right');
let avisos = s('.urna-tela-d-2');
let numeros = s('.urna-tela-d-1-left-3');

let numero = '';
let etapaAtual = 0;
let votoEmBranco = false;
let votoEmNulo = false;

let comecarEtapa = () => {
    let etapa = etapas[etapaAtual];
    numero = '';
    let numeroHtml = '';
    votoEmBranco = false;
    votoEmNulo = false;

   for(let i = 0; i < etapa.numeros; i++){
       if( i === 0 ){
        numeroHtml += '<div class="numero pisca"></div>';
       } else {
        numeroHtml += '<div class="numero"></div>';
    }};

   numeros.innerHTML = numeroHtml;
   cargo.innerHTML = etapa.titulo; 
   seuVoto.style.display = 'none'; 
   lateral.innerHTML = '';
   info.innerHTML = '';
   avisos.style.display = 'none';
};

let atualizarInterface = () => {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((e)=>{
        if(e.numero === numero){
            return e
        };
    });
    if ( candidato.length > 0 ) {
        candidato = candidato[0];
        seuVoto.style.display = 'block';
        info.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        avisos.style.display = 'block';

        let qtd_fotos_candidato = '';
        for (let i in candidato.fotos){
            if(i == 1){
                qtd_fotos_candidato += `<div class="urna-tela-d-1-right-image small"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            } else {
            qtd_fotos_candidato += `<div class="urna-tela-d-1-right-image"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            }
        };
        lateral.innerHTML = qtd_fotos_candidato;
    } else {
        votoNulo();
    };

        
};
let votoNulo = () => {
    seuVoto.style.display = 'block';
    info.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    avisos.style.display = 'block';
    votoEmNulo = true;
};

let clicou = n => {
    Piscando = document.querySelector('.numero.pisca')
        if( Piscando !== null ) {
            Piscando.innerHTML = `${n}`
            Piscando.classList.remove('pisca');
            numero = `${numero}${n}`;

            if ( Piscando.nextElementSibling !== null ) {
                Piscando.nextElementSibling.classList.add('pisca')
            } else {
            atualizarInterface();
            }
        }
   
};
let corrigir = () => {
    comecarEtapa();
};
let branco = () =>{
    comecarEtapa();
    numeros.innerHTML = '';
    seuVoto.style.display = 'block';
    info.innerHTML = '<div class="aviso-grande pisca" style="display:flex; align-items:center;" >VOTO EM BRANCO</div>';
    avisos.style.display = 'block';
    votoEmBranco = true;
};
let confirmar = () => {
    if( numero.length == etapas[etapaAtual].numeros || votoEmBranco || votoEmNulo){
        if( etapaAtual != 1 ) {
            etapaAtual++;
            comecarEtapa(); 
        } else {
            s('.urna-tela').innerHTML = '';
            let contagem = 20;
            s('.urna-tela').innerHTML = `<div class="C4"><div>Iniciando a C4</div><div class="temporizador">${contagem}</div></div>`;
            var timer = setInterval(()=>{
                contagem --;
                s('.urna-tela').innerHTML = `<div class="C4"><div>era uma C4 e agora vai explodir!!</div><div class="temporizador">${contagem}</div></div>`;
                if ( contagem == 0 ) {
                    stopTimer();
                };
            }, 500);
            let stopTimer = () => {
            clearInterval(timer);
            };

            
        }
    }
    
};
comecarEtapa();