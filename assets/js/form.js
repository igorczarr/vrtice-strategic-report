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

    // 4. SUBMISSÃO ASSÍNCRONA DE ELITE (AJAX Formspree)
    const submitBtn = document.getElementById('btn-submit');
    const successOverlay = document.getElementById('success-overlay');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o redirecionamento feio do Formspree

        // Estado de "Carregamento"
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "PROCESSANDO DADOS <i class='ph ph-spinner ph-spin'></i>";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Sucesso: Mostra a overlay premium
                successOverlay.classList.add('active');
                form.reset(); // Limpa o form
                calculateProgress(); // Zera a barra
            } else {
                alert("Ocorreu um erro no servidor. Por favor, tente novamente.");
            }
        } catch (error) {
            alert("Erro de conexão. Verifique sua internet.");
        } finally {
            // Restaura o botão caso o usuário feche a aba
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.style.pointerEvents = "auto";
        }
    });
});