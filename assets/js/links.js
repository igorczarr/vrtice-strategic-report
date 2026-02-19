/**
 * VRTICE | LINKPAGE SYSTEM
 * Motor de Animação de Entrada e Micro-interações
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuração inicial do GSAP
    const tl = gsap.timeline();

    // 2. Sequência de Orquestração
    tl.to("body", { 
        opacity: 1, 
        duration: 0.5 
    })
    
    // Entrada do Header (Logo e Tagline)
    .from(".links-header", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })

    // Efeito de Varredura nos Botões (Stagger)
    .from(".link-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Cada botão entra 0.15s depois do anterior
        ease: "power3.out"
    }, "-=0.6") // Começa um pouco antes do header terminar

    // Surgimento do Status Bar no Rodapé
    .from(".system-status", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.7)"
    }, "-=0.4");

    // 3. Efeito de Flicker Ocasional (Estética High-Tech)
    // Simula uma interface de terminal de elite
    const glitchElements = document.querySelectorAll('.links-tagline, .status-text');
    
    setInterval(() => {
        const target = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        gsap.to(target, {
            opacity: 0.5,
            duration: 0.05,
            repeat: 1,
            yoyo: true,
            onComplete: () => gsap.to(target, { opacity: 1, duration: 0.5 })
        });
    }, 4000);

    // 4. Feedback Tátil para Mobile
    // Como definimos no Fluid-Touch Protocol
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            gsap.to(card, { scale: 0.97, duration: 0.1 });
        });
        card.addEventListener('touchend', () => {
            gsap.to(card, { scale: 1, duration: 0.2, ease: "power2.out" });
        });
    });
});