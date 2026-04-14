/**
 * IGOR | VRTICE - ENGINE DO FORMULÁRIO
 * Interatividade de Elite: Progresso, Auto-Scroll e AJAX Submit
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. ANIMAÇÃO FORENSE DE ENTRADA (Cascata)
    const formItems = document.querySelectorAll('.anim-form-item');
    gsap.to(formItems, {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.2
    });

    // 2. ENGINE DE PROGRESSO (Barra Superior)
    const form = document.getElementById('mapeamento-form');
    const progressFill = document.getElementById('form-progress');
    // Pegamos todos os inputs que possuem a classe .check-progress
    const progressInputs = form.querySelectorAll('.check-progress');

    // Remove duplicates from radio groups (contar apenas o nome do grupo)
    const uniqueRequiredNames = new Set();
    progressInputs.forEach(input => uniqueRequiredNames.add(input.name));
    const totalSteps = uniqueRequiredNames.size;

    function calculateProgress() {
        const filledNames = new Set();
        progressInputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) filledNames.add(input.name);
            } else {
                if (input.value.trim() !== '') filledNames.add(input.name);
            }
        });
        
        const percent = (filledNames.size / totalSteps) * 100;
        progressFill.style.width = `${percent}%`;
    }

    // Ouve qualquer alteração nos campos para atualizar a barra
    form.addEventListener('input', calculateProgress);

    // 3. AUTO-SCROLL INTELIGENTE (Para os Radios)
    const autoScrollInputs = form.querySelectorAll('.auto-scroll');
    autoScrollInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const nextSectionId = e.target.getAttribute('data-next');
            if(nextSectionId) {
                const nextSection = document.getElementById(nextSectionId);
                if(nextSection) {
                    // Pequeno atraso para o usuário ver que clicou
                    setTimeout(() => {
                        nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 400);
                }
            }
        });
    });

    // 4. SUBMISSÃO ASSÍNCRONA DE ELITE (API ORION)
    const submitBtn = document.getElementById('btn-submit');
    const successOverlay = document.getElementById('success-overlay');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        // Estado de "Carregamento"
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "PROCESSANDO DADOS <i class='ph ph-spinner ph-spin'></i>";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";

        // 🛡️ Transformação: Converte o FormData em um JSON Sênior
        const formData = new FormData(form);
        const jsonPayload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonPayload)
            });

            if (response.ok) {
                // SUCESSO: Mostra o Overlay de Sucesso (mantendo o utilizador na página)
                // ou redireciona para a página de obrigado se preferirem.
                successOverlay.classList.add('active');
            } else {
                const errorData = await response.json();
                alert(`Ocorreu um erro: ${errorData.detail || "Falha no servidor."}`);
            }
        } catch (error) {
            alert("Erro de conexão. Verifique se a API do Orion está online.");
            console.error(error);
        } finally {
            // Restaura o botão
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.style.pointerEvents = "auto";
        }
    });
});