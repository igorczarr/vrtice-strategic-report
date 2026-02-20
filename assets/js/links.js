/**
 * VRTICE | THE EXECUTIVE MONOLITH (LINKPAGE JS)
 * Motor de Animação GSAP e Fluid-Touch Protocol
 */

document.addEventListener('DOMContentLoaded', () => {
    // Registra a Timeline Mestre
    const tl = gsap.timeline();

    // =========================================
    // FASE 1: O PRELOADER (BRASÃO & FILOSOFIA)
    // =========================================
    
    // 1. O Canvas se revela
    tl.to(".logo-anim-wrapper", {
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out"
    })
    
    // 2. O Laser desenha a geometria do Brasão e as letras do Lema simultaneamente
    .to([".vrtice-vector", ".vrtice-motto-vector"], {
        strokeDashoffset: 0, 
        duration: 2.5, 
        ease: "power3.inOut" // Acelera no meio e pousa suavemente
    })
    
    // 3. Preenchimento de Cor (A "tinta" entra antes do traço terminar)
    .to([".vrtice-vector", ".vrtice-motto-vector"], {
        fill: "var(--white-off)", 
        stroke: "transparent", 
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6") 
    
    // 4. Efeito de energia (Brilho dourado sutil no SVG)
    .to(["#vrtice-loader-svg", "#motto-loader-svg"], {
        filter: "drop-shadow(0 0 15px rgba(200, 169, 112, 0.4))",
        duration: 0.5
    }, "<")
    
    // Pausa dramática para leitura e fixação da marca
    .to(".logo-anim-wrapper", { duration: 0.8 }) 
    
    // 5. Saída Cinematográfica (A logo afunda e some)
    .to(".logo-anim-wrapper", { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power2.in" 
    })
    
    // 6. A cortina de aço (Preloader) sobe e revela o Monolito
    .to("#preloader", { 
        y: "-100%", 
        duration: 1.2, 
        ease: "expo.inOut" 
    }, "-=0.2")

    // =========================================
    // FASE 2: A REVELAÇÃO DO MONOLITO
    // =========================================
    
    // 1. O Cabeçalho (Logo e Textos) desce para a posição final
    .to(".monolith-header", {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out"
    }, "-=0.6") // Começa enquanto a cortina ainda está subindo
    
    // 2. Os Módulos de Elite entram em Cascata (Efeito Dominó)
    .to(".elite-module", {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, // Cada botão espera 0.15s para entrar
        ease: "power2.out"
    }, "-=0.7")
    
    // 3. O Rodapé sela a base da página
    .to(".monolith-footer", {
        opacity: 1, 
        duration: 1, 
        ease: "power2.out"
    }, "-=0.4");

    // =========================================
    // FASE 3: FLUID-TOUCH PROTOCOL (MOBILE)
    // =========================================
    // Garante que o usuário sinta o peso do clique no celular
    const modules = document.querySelectorAll('.elite-module');
    
    modules.forEach(mod => {
        mod.addEventListener('touchstart', () => {
            gsap.to(mod, { scale: 0.96, duration: 0.1, ease: "power1.out" });
        }, { passive: true });
        
        mod.addEventListener('touchend', () => {
            gsap.to(mod, { scale: 1, duration: 0.3, ease: "back.out(1.5)" }); // Efeito mola no retorno
        }, { passive: true });
    });
});