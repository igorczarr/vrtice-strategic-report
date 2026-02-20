/**
 * VRTICE | CONSULTORIA TÁTICA (JS)
 * Motor de Animação e ScrollTrigger High-Ticket
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Registra o Plugin de Scroll do GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. TIMELINE DO PRELOADER (A Assinatura da Marca)
    const tl = gsap.timeline();

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
    .from(".hero-btn", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.7");


    // =========================================
    // 4. SCROLL ANIMATIONS (A REAÇÃO DA PÁGINA)
    // =========================================

    // A Tese: Entrada dos Sintomas em Cascata
    gsap.from(".symptom-card", {
        scrollTrigger: {
            trigger: ".symptoms-grid",
            start: "top 80%", // Dispara quando o topo da grid atinge 80% da tela
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Efeito dominó
        ease: "power3.out"
    });

    gsap.from(".the-fact-box", {
        scrollTrigger: {
            trigger: ".the-fact-box",
            start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // A Auditoria: O Laser da Linha do Tempo
    // A altura do laser preenche conforme o usuário rola o mouse (scrub)
    gsap.to(".timeline-laser-fill", {
        scrollTrigger: {
            trigger: ".process-timeline",
            start: "top center",
            end: "bottom center",
            scrub: 0.5 // Suavidade matemática ao acompanhar o scroll
        },
        height: "100%",
        ease: "none"
    });

    // A Auditoria: Acendendo os Nós (Nodes)
    const processNodes = document.querySelectorAll(".process-node");
    processNodes.forEach((node) => {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: "top 65%", // Dispara quando a bolinha cruza 65% da tela
                toggleClass: "active" // Adiciona a classe CSS que acende a borda em dourado
            },
            x: 0, // Desliza da esquerda para a posição original
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
        });
    });

    // O Mapa de Batalha & Filtro
    gsap.from(".battlemap-content", {
        scrollTrigger: { trigger: ".split-layout", start: "top 75%" },
        x: -30, opacity: 0, duration: 1, ease: "power3.out"
    });
    
    gsap.from(".filter-box", {
        scrollTrigger: { trigger: ".split-layout", start: "top 75%" },
        x: 30, opacity: 0, duration: 1, ease: "power3.out"
    });

    // O Formulário de Aplicação (Ultimato)
    gsap.from(".application-box", {
        scrollTrigger: { trigger: ".consult-application", start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
    });
});