/**
 * VRTICE - Orion Funnel Logic - High End Edition
 */

const leadData = {
    nome_negocio: '',
    email: '',
    respostas: { q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' },
    pontuacao_real: 0,
    pontuacao_exibida: 0,
    utm_source: new URLSearchParams(window.location.search).get('utm_source'),
    utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
};

// Pre-loader Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('.vrtice-logo-svg path, .vrtice-logo-svg polygon', {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        fill: "#C8A970"
    })
    .to('#preloader', {
        opacity: 0,
        duration: 0.8,
        ease: "power1.out",
        onComplete: () => {
            document.getElementById('preloader').style.display = 'none';
            gsap.to('#step-1', {opacity: 1, duration: 1});
        }
    });
});

window.goToStep = function(step) {
    document.querySelectorAll('.step-container').forEach(el => {
        el.classList.remove('active');
        gsap.set(el, {opacity: 0});
    });
    const nextStep = document.getElementById(`step-${step}`);
    nextStep.classList.add('active');
    gsap.to(nextStep, {opacity: 1, duration: 0.8, y: -20, from: {y: 0}, ease: "power2.out"});
}

let currentQuestion = 1;

window.selectAnswer = function(question, answer) {
    leadData.respostas[question] = answer;
    
    // Smooth transition to next question
    gsap.to(`#${question}`, {opacity: 0, y: -20, duration: 0.4, onComplete: () => {
        document.getElementById(question).classList.add('hidden');
        currentQuestion++;
        const nextQ = document.getElementById(`q${currentQuestion}`);
        if(nextQ) {
            nextQ.classList.remove('hidden');
            gsap.fromTo(nextQ, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.6, ease: "power2.out"});
            updateProgressBar();
        }
    }});
}

function updateProgressBar() {
    const total = 7;
    const pct = Math.round(((currentQuestion - 1) / total) * 100);
    const bar = document.getElementById('quiz-progress-bar');
    if(bar) bar.style.width = pct + '%';
}

window.finishQuiz = function(answer) {
    leadData.respostas['q7'] = answer;
    
    // Show processing screen first
    const procScreen = document.getElementById('processing-screen');
    procScreen.style.display = 'flex';
    
    const tl = gsap.timeline();
    tl.to(procScreen, {opacity: 1, duration: 0.5})
      .to('#pt-1', {opacity: 1, duration: 0.8, y: -10})
      .to('#pt-1', {opacity: 0, duration: 0.5, delay: 0.5})
      .to('#pt-2', {opacity: 1, duration: 0.8, y: -10})
      .to('#pt-2', {opacity: 0, duration: 0.5, delay: 0.5})
      .to('#pt-3', {opacity: 1, duration: 0.8, y: -10})
      .to('#pt-3', {opacity: 0, duration: 0.5, delay: 0.5})
      .to(procScreen, {opacity: 0, duration: 0.5, onComplete: () => {
          procScreen.style.display = 'none';
          goToStep(3); // Opt-in screen
      }});
}

window.submitLead = async function(e) {
    e.preventDefault();
    
    const btnSubmit = document.getElementById('btn-submit-lead');
    const originalText = btnSubmit.innerText;
    btnSubmit.innerText = "GERANDO RELATÓRIO...";
    btnSubmit.disabled = true;

    leadData.nome_negocio = document.getElementById('lead-name').value;
    leadData.email = document.getElementById('lead-email').value;

    // Pontuação Real e Exata (0 a 100)
    const pointsMap = { 'A': 0, 'B': 4, 'C': 9, 'D': 14.28 }; // 7 * 14.28 = ~100
    let realScore = 0;
    
    Object.keys(leadData.respostas).forEach(q => {
        let ans = leadData.respostas[q];
        if(ans && pointsMap[ans] !== undefined) {
            realScore += pointsMap[ans];
        }
    });

    realScore = Math.round(realScore);
    if(realScore > 100) realScore = 100;
    
    leadData.pontuacao_real = realScore;
    leadData.pontuacao_exibida = realScore; // Agora usamos e mostramos a nota real

    let warningText = "";
    let diagnosisWord = "";
    let warningColor = "";
    
    if (realScore < 50) {
        warningText = "ALERTA DE ATENÇÃO DESPERDIÇADA";
        warningColor = "text-red-600";
        diagnosisWord = "Vazamento Crítico";
    } else if (realScore < 75) {
        warningText = "ATENÇÃO: ESTRUTURA MEDIANA";
        warningColor = "text-yellow-500";
        diagnosisWord = "Gargalo Comercial";
    } else {
        warningText = "ESTRUTURA ACIMA DA MÉDIA (MAS COM GARGALOS)";
        warningColor = "text-vrtice-emerald";
        diagnosisWord = "Ponto de Fricção";
    }

    try {
        const response = await fetch('http://localhost:4000/api/save-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });
        const result = await response.json();
    } catch (error) {
        console.error('Erro de conexão:', error);
    }

    // Populate Results Page
    document.getElementById('result-name').innerText = leadData.nome_negocio;
    document.getElementById('user-real-score').innerText = realScore;
    document.getElementById('text-score').innerText = realScore;
    
    const sw = document.getElementById('score-warning');
    if (sw) {
        sw.innerText = "SAÚDE COMERCIAL: " + warningText;
        sw.className = `text-sm uppercase tracking-widest font-bold mt-6 mb-2 ${warningColor}`;
    }
    
    const dd = document.getElementById('dynamic-diagnosis');
    if (dd) dd.innerText = diagnosisWord;

    btnSubmit.innerText = originalText;
    btnSubmit.disabled = false;
    goToStep(4); // Results screen
    animateScore(realScore);
}

window.animateScore = function(score) {
    const display = document.getElementById('score-display');
    const needle = document.getElementById('gauge-needle');
    
    let obj = { val: 0 };
    gsap.to(obj, {
        val: score,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function() {
            display.innerText = Math.round(obj.val);
        }
    });

    // Gauge math (0 to 100 mapped to -90deg to 90deg)
    const angle = (score / 100) * 180 - 90;
    gsap.to(needle, {
        rotation: angle,
        duration: 3,
        ease: "power3.out",
        delay: 0.5
    });
}
