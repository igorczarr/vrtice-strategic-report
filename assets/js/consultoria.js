/**
 * VRTICE | CONSULTORIA TÁTICA (JS)
 * Motor de Animação e ScrollTrigger High-Ticket (Motor Corrigido)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Registra o Plugin de Scroll do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. TIMELINE DO PRELOADER (A Assinatura da Marca)
    const tl = gsap.timeline({
        onComplete: () => {
            // A Tática de Sênior: Recalcular todas as posições da página 
            // no exato milissegundo em que o preloader desaparece. 
            // Isso previne que seções fiquem invisíveis por erro matemático do navegador.
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

    // 3. ENTRADA DO HERO (A Pós-Cortina)
    .from(".vrtice-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
    .from(".hero-title", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7")
    .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7")
    .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7")
    .from(".hero-btn", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7") // CTA Seguro
    .from(".btn-disclaimer", { opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");


    // =========================================
    // 4. SCROLL ANIMATIONS (A REAÇÃO DA PÁGINA)
    // =========================================

    // A Tese: Entrada dos Sintomas em Cascata (Gatilho de 90% para segurança em mobile)
    gsap.from(".symptom-card", {
        scrollTrigger: {
            trigger: ".symptoms-grid",
            start: "top 90%", 
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.from(".the-fact-box", {
        scrollTrigger: {
            trigger: ".the-fact-box",
            start: "top 95%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

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

    // A Auditoria: Acendendo os Nós (Usando fromTo para controle absoluto da opacidade)
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
    gsap.from(".battlemap-content", {
        scrollTrigger: { trigger: ".split-layout", start: "top 85%" },
        x: -30, opacity: 0, duration: 1, ease: "power3.out"
    });
    
    gsap.from(".filter-box", {
        scrollTrigger: { trigger: ".split-layout", start: "top 85%" },
        x: 30, opacity: 0, duration: 1, ease: "power3.out"
    });

    // O Formulário de Aplicação (Ultimato)
    gsap.from(".application-box", {
        scrollTrigger: { trigger: ".consult-application", start: "top 90%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
    });
});