/**
 * VRTICE | THE EXECUTIVE MONOLITH (LINKPAGE)
 * Motor de Sincronia: Preloader Filosófico e GSAP Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
    // Registra a Timeline mestre
    const tl = gsap.timeline();

    // =========================================
    // FASE 1: O PRELOADER ("Ordem gera progresso")
    // =========================================
    
    // Aparece o Canvas
    tl.to(".logo-anim-wrapper", {
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out"
    })
    
    // O Laser desenha o contorno dourado da fonte
    .to(".vrtice-motto-vector", {
        strokeDashoffset: 0,
        duration: 2.5, 
        ease: "power3.inOut" // Acelera e desacelera suavemente
    })
    
    // A letra ganha peso (Preenchimento)
    .to(".vrtice-motto-vector", {
        fill: "var(--white-off)",
        stroke: "transparent",
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5") // Começa antes de terminar o contorno
    
    // Segura 1 segundo para leitura e absorção da mensagem
    .to(".logo-anim-wrapper", { duration: 1 })
    
    // A cortina preta sobe (Saída do Preloader)
    .to("#preloader", {
        y: "-100%", 
        duration: 1.2, 
        ease: "expo.inOut"
    })

    // =========================================
    // FASE 2: A REVELAÇÃO DO MONOLITO
    // =========================================
    
    // Desce a Logo
    .to(".monolith-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6") // Executa ainda com a cortina subindo
    
    // As Lajes (Slabs) sobem em Cascata (0.15s de delay entre elas)
    .to(".access-slab", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    }, "-=0.8")
    
    // Rodapé surge sutilmente no final
    .to(".monolith-footer", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.4");

    // =========================================
    // FASE 3: HAPTIC FEEDBACK (Fluid-Touch)
    // =========================================
    const slabs = document.querySelectorAll('.access-slab');
    slabs.forEach(slab => {
        slab.addEventListener('touchstart', () => {
            gsap.to(slab, { scale: 0.96, duration: 0.1 });
        });
        slab.addEventListener('touchend', () => {
            gsap.to(slab, { scale: 1, duration: 0.2, ease: "power2.out" });
        });
    });
});