const canvas = document.getElementById("mesa");
const ctx = canvas.getContext("2d");

let num = 5;
let filosofos = [];
let garfos = [];
let intervalo = null;
let velocidade = 800;

/* ===== FAQ - FUNÇÃO ===== */
function toggle(element) {
    const faqContainer = element.closest('.faq');
    const isOpen = element.classList.contains('active');

    // Fecha todas as perguntas
    const allQuestions = faqContainer.querySelectorAll('.q');
    allQuestions.forEach(q => {
        q.classList.remove('active');
        const answer = q.nextElementSibling;
        if (answer && answer.classList.contains('a')) {
            answer.classList.remove('show');
        }
    });

    // Abre a clicada
    if (!isOpen) {
        element.classList.add('active');
        const answer = element.nextElementSibling;
        if (answer && answer.classList.contains('a')) {
            setTimeout(() => {
                answer.classList.add('show');
            }, 10);
        }
    }
}

/* ===== LOG ===== */
function log(msg){
    let el = document.getElementById("log");
    el.innerHTML += msg + "<br>";
    el.scrollTop = el.scrollHeight;
}

function limparLog(){
    const logElement = document.getElementById("log");
    logElement.innerHTML = "";
    // Se quiser deixar vazio, basta remover a linha abaixo
    log("Log limpo ✅");
}
function limparLog(){
    const logElement = document.getElementById("log");
    logElement.innerHTML = "";
    // Se quiser deixar vazio, basta remover a linha abaixo
    log("Log limpo ✅");
}

// Integração com o botão
document.getElementById("btnLimpar").addEventListener("click", limparLog);


/* ===== CRIAR ===== */
function criar(){
    filosofos = [];
    garfos = new Array(num).fill(true);

    for(let i=0;i<num;i++){
        filosofos.push({estado:"pensando"});
    }
}

/* ===== DESENHAR ===== */
function desenhar(){
    ctx.clearRect(0,0,500,500);

    let cx=250, cy=250, r=180;

    for(let i=0;i<num;i++){
        let ang=i*2*Math.PI/num;
        let x=cx+r*Math.cos(ang);
        let y=cy+r*Math.sin(ang);

        let cor="gray";
        if(filosofos[i].estado==="comendo") cor="green";
        if(filosofos[i].estado==="esperando") cor="orange";

        ctx.fillStyle=cor;
        ctx.beginPath();
        ctx.arc(x,y,30,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle="white";
        ctx.fillText(i+1,x-5,y+5);
    }
}

/* ===== TENTAR COMER ===== */
function tentar(i){
    let e=i;
    let d=(i+1)%num;

    if(garfos[e] && garfos[d]){
        garfos[e]=garfos[d]=false;
        filosofos[i].estado="comendo";

        log("Filósofo "+(i+1)+" está comendo");

        setTimeout(()=>{
            garfos[e]=garfos[d]=true;
            filosofos[i].estado="pensando";
        },2000);

    } else {
        filosofos[i].estado="esperando";
    }
}

/* ===== CICLO ===== */
function ciclo(){
    filosofos.forEach((f,i)=>{
        if(f.estado==="pensando" && Math.random()<0.4) tentar(i);
        else if(f.estado==="esperando") tentar(i);
    });

    desenhar();
    atualizar();
}

/* ===== STATUS ===== */
function atualizar(){
    let html="";

    filosofos.forEach((f,i)=>{
        let cor="#aaa", emoji="⚪";

        if(f.estado==="comendo"){
            cor="#2ecc71"; emoji="🟢";
        }
        if(f.estado==="esperando"){
            cor="#f39c12"; emoji="🟠";
        }

        html+=`
        <div>
            <span>Filósofo ${i+1}</span>
            <span style="color:${cor}; font-weight:bold;">
                ${emoji} ${f.estado}
            </span>
        </div>`;
    });

    document.getElementById("status").innerHTML = html;
}

/* ===== CONTROLES ===== */
function iniciar(){
    if(!intervalo){
        intervalo = setInterval(ciclo, velocidade);
        log("Simulação iniciada");
    }
}

function parar(){
    clearInterval(intervalo);
    intervalo = null;
    log("Simulação pausada");
}

function resetar(){
    parar();
    criar();
    desenhar();
    atualizar();
    log("Sistema resetado");
}

/* ===== INIT ===== */
window.onload = function(){
    criar();
    desenhar();
    atualizar();
};
