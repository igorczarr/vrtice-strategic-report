/**
 * VRTICE | CONSULTORIA TÁTICA (JS)
 * Motor de Animação, ScrollTrigger e Lógica de Conversão (Modal)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Registar o Plugin de Scroll do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // =========================================
    // 2. TIMELINE DO PRELOADER
    // =========================================
    const tl = gsap.timeline({
        onComplete: () => {
            // Recalcula todas as posições da página no momento em que a cortina desaparece.
            // Isto previne que as secções fiquem encravadas ou invisíveis devido a erros matemáticos do DOM.
            ScrollTrigger.refresh();
        }
    });

    tl.to(".logo-anim-wrapper", {
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out"
    })
    .to([".vrtice-vector", ".vrtice-motto-vector"], {
        strokeDashoffset: 0, 
        duration: 2.5, 
        ease: "power3.inOut"
    })
    .to([".vrtice-vector", ".vrtice-motto-vector"], {
        fill: "var(--white-off)", 
        stroke: "transparent", 
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6") 
    .to(["#vrtice-loader-svg", "#motto-loader-svg"], {
        filter: "drop-shadow(0 0 15px rgba(200, 169, 112, 0.4))",
        duration: 0.5
    }, "<")
    .to(".logo-anim-wrapper", { duration: 0.8 }) 
    .to(".logo-anim-wrapper", { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power2.in" 
    })
    .to("#preloader", { 
        y: "-100%", 
        duration: 1.2, 
        ease: "expo.inOut" 
    }, "-=0.2")

    // 3. ENTRADA DO HERO (Pós-Cortina)
    .from(".vrtice-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
    .from(".hero-title", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7")
    .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7")
    .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7")
    // O botão CTA principal (que abre o modal)
    .fromTo("#open-modal-btn", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.7"
    )
    .fromTo(".btn-disclaimer", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
    );


    // =========================================
    // 4. SCROLL ANIMATIONS (A REAÇÃO DA PÁGINA)
    // =========================================

    // A Tese: Entrada dos Sintomas em Cascata
    gsap.fromTo(".symptom-card", 
        { opacity: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: ".symptoms-grid",
                start: "top 90%", // Dispara quando tocar nos 10% finais do ecrã
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }
    );

    gsap.fromTo(".the-fact-box", 
        { opacity: 0, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: ".the-fact-box",
                start: "top 95%",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }
    );

    // A Auditoria: O Laser da Linha do Tempo
    gsap.to(".timeline-laser-fill", {
        scrollTrigger: {
            trigger: ".process-timeline",
            start: "top center",
            end: "bottom center",
            scrub: 0.5 
        },
        height: "100%",
        ease: "none"
    });

    // A Auditoria: Acender os Nós do processo
    const processNodes = document.querySelectorAll(".process-node");
    processNodes.forEach((node) => {
        gsap.fromTo(node, 
            { opacity: 0, x: -20 },
            {
                scrollTrigger: {
                    trigger: node,
                    start: "top 85%", 
                    toggleClass: "active" 
                },
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }
        );
    });

    // O Mapa de Batalha & Filtro
    gsap.fromTo(".battlemap-content", 
        { opacity: 0, x: -30 },
        {
            scrollTrigger: { trigger: ".split-layout", start: "top 85%" },
            x: 0, opacity: 1, duration: 1, ease: "power3.out"
        }
    );
    
    gsap.fromTo(".filter-box", 
        { opacity: 0, x: 30 },
        {
            scrollTrigger: { trigger: ".split-layout", start: "top 85%" },
            x: 0, opacity: 1, duration: 1, ease: "power3.out"
        }
    );

    // O Formulário de Aplicação (Ultimato - Rodapé)
    gsap.fromTo(".application-box", 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: { trigger: ".consult-application", start: "top 90%" },
            y: 0, opacity: 1, duration: 1, ease: "power3.out"
        }
    );


    // =========================================
    // 5. ENGENHARIA DO MODAL (POP-UP)
    // =========================================
    const modalOverlay = document.getElementById('form-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Validação de segurança para garantir que os elementos existem na página
    if (modalOverlay && openModalBtn && closeModalBtn) {
        
        // Função universal para fechar o modal
        const fecharModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Liberta o scroll da página
        };

        // Evento: Abrir Modal
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava a página por trás
        });

        // Evento: Fechar no botão [X]
        closeModalBtn.addEventListener('click', fecharModal);

        // Evento: Fechar clicando fora da caixa (fundo escuro)
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                fecharModal();
            }
        });

        // UX Sênior: Fechar ao pressionar a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                fecharModal();
            }
        });
    }
});