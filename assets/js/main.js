/**
 * VRTICE | RELATÓRIO ESTRATÉGICO
 * Engenharia de Front-End: Hard-Code Performance
 * Arquivo Principal: SPA, GSAP e Motor de Sincronia Determinística (Time Engine)
 */

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. BANCO DE DADOS DOS PRODUTOS (SPA)
// ==========================================
const productData = {
    partnership: {
        badge: "DIRETORIA DE CRESCIMENTO (C-LEVEL AS A SERVICE)",
        title: "THE PARTNERSHIP",
        description: "Substituímos a incerteza pela alta gestão. Atuamos como seus sócios operacionais por 6 meses, liderando uma ofensiva de dominação de mercado sem diluir o seu Equity.",
        features: [
            "Omnichannel Tático: Expansão coordenada para Rádio, TV e Mídia Offline.",
            "Engenharia de Reputação (PR): Assessoria de imprensa para transformar seu CNPJ em uma Instituição.",
            "Auditoria de Eficiência: Reestruturação de processos para estancar vazamentos de lucro.",
            "Gestão de BI: Compra de mídia baseada estritamente em LTV e ROAS."
        ],
        target: "Organizações robustas que precisam romper seu teto histórico de faturamento com governança.",
        cta: "REQUISITAR CONSELHO ESTRATÉGICO"
    },
    outsourcing: {
        badge: "OPERAÇÃO MILITAR (OUTSOURCING DE ELITE)",
        title: "INTELIGÊNCIA & GESTÃO",
        description: "A eliminação sumária do passivo trabalhista amador. Injetamos uma célula de especialistas em sua operação para garantir constância industrial.",
        features: [
            "Sistema de Scout: Monitoramento de KPIs e metas em tempo real.",
            "Produção Cinematográfica: Conteúdo High-End que cria um abismo estético entre você e a concorrência.",
            "Pacote Gráfico: Identidade visual que transmite status imediato.",
            "Editorial Racional: Roteirização técnica focada na dor e conversão, exterminando métricas de vaidade."
        ],
        target: "Sócios e Diretores que precisam recuperar de 15 a 20 horas semanais de gestão operacional.",
        cta: "INICIAR OPERAÇÃO DE ELITE"
    },
    sovereignty: {
        badge: "ENGENHARIA EM HARD-CODE",
        title: "DIGITAL SOVEREIGNTY",
        description: "A erradicação de plataformas de terceiros. Sua sede digital construída em Código Puro, livre de mensalidades e vulnerabilidades.",
        features: [
            "Performance Absoluta: Carregamento instantâneo desenhado para maximizar o ROI.",
            "Rastreamento Militar: Controle absoluto dos dados e bibliotecas de tracking proprietárias.",
            "Proteção de Ativo: Código 100% seu. Um ativo imobilizado digital que valoriza o Valuation.",
            "Design Proprietário: Estética exclusiva impossível de copiar."
        ],
        target: "Marcas que exigem que o primeiro clique do cliente transborde exclusividade e tecnologia.",
        cta: "SOLICITAR PROJETO DE ENGENHARIA"
    }
};

// ==========================================
// 2. INICIALIZAÇÃO DO SISTEMA BLINDADA
// ==========================================
window.addEventListener('load', () => {
    // 1. Prioridade Máxima: O Menu deve carregar primeiro
    try { initMenuSystem(); } catch(e) { console.error("Alerta: Falha ao carregar Menu.", e); }
    
    // 2. Carrega o restante do Ecossistema independentemente
    try { switchProduct('partnership'); } catch(e) {}
    try { runPreloaderSequence(); } catch(e) {}
    try { initScrollAnimations(); } catch(e) {}
    try { initFaqSystem(); } catch(e) {}
    try { initEcosystemTerminal(); } catch(e) {}
    
    setTimeout(() => { ScrollTrigger.refresh(); }, 500);
});

// ==========================================
// 3. MÓDULO: ECOSSISTEMA & MOTOR DE RELATOS
// ==========================================
function initEcosystemTerminal() {
    
    // --- A. ANIMAÇÃO DE NÚMEROS (GATILHO IMEDIATO) ---
    const counters = document.querySelectorAll('.metric-val');
    counters.forEach(counter => {
        const targetValue = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = targetValue % 1 !== 0;
        let proxy = { val: 0 }; 

        gsap.to(proxy, {
            val: targetValue,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: { trigger: counter, start: "top 90%", toggleActions: "play none none none" },
            onUpdate: function() {
                counter.innerText = isDecimal ? proxy.val.toFixed(1) : Math.round(proxy.val);
            }
        });
    });

    // --- B. BANCO DE DADOS DE RELATOS REAIS (SEM NÚMEROS FALSOS) ---
    // Adicionamos 'timestamp' apenas para o código saber ordenar a aba "Recentes". A exibição é o texto 'dataStr'.
    const dbRelatos = [
        { id: "b1", iniciais: "CM", nome: "Carlos M.", verificado: true, cargo: "CEO | Fintech", dataStr: "12 Fev 2026", timestamp: 1739318400000, texto: "A VRTICE reestruturou nossa aquisição de clientes. Saímos de uma dependência amadora de anúncios para uma máquina de vendas previsível e escalável." },
        { id: "b2", iniciais: "JV", nome: "Dra. Juliana V.", verificado: true, cargo: "Sócia | Clínica Premium", dataStr: "08 Fev 2026", timestamp: 1738972800000, texto: "Ter a VRTICE assumindo nossa produção e tráfego me devolveu horas valiosas. O fluxo de agendamentos dobrou em três meses." },
        { id: "b3", iniciais: "RS", nome: "Ricardo S.", verificado: true, cargo: "Fundador | E-commerce B2B", dataStr: "29 Jan 2026", timestamp: 1738108800000, texto: "O desenvolvimento da infraestrutura própria em Hard-Code reduziu nosso custo por aquisição em 40%." },
        { id: "b4", iniciais: "AL", nome: "Ana Lúcia", verificado: true, cargo: "Diretora | Tech", dataStr: "15 Jan 2026", timestamp: 1736899200000, texto: "Governança pura. O impacto no balanço da empresa após os primeiros 6 meses de partnership é inegável." },
        { id: "b5", iniciais: "FB", nome: "Felipe B.", verificado: true, cargo: "Fundador | SaaS", dataStr: "10 Jan 2026", timestamp: 1736467200000, texto: "A inteligência de dados aplicada à compra de mídia deles é cirúrgica. Foco em LTV e lucro real." },
        { id: "b6", iniciais: "CL", nome: "Carla L.", verificado: false, cargo: "CEO | Varejo", dataStr: "02 Jan 2026", timestamp: 1735776000000, texto: "A estratégia Omnichannel finalmente nos tirou da dependência exclusiva do Instagram." }
    ];

    let userLikes = JSON.parse(localStorage.getItem('vrtice_likes')) || [];
    let userSaves = JSON.parse(localStorage.getItem('vrtice_saves')) || [];

    // --- C. CONTROLE DE INTERFACE (ABAS/FILTROS) ---
    const feedTimeline = document.getElementById('feed-timeline');
    let currentFilter = 'relevantes';

    if (feedTimeline) { applyFilterAndRender(); }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            applyFilterAndRender();
        });
    });

    function applyFilterAndRender() {
        let finalRenderArray = [];

        if (currentFilter === 'relevantes') {
            finalRenderArray = [...dbRelatos]; // Ordem padrão inserida no Array
        } 
        else if (currentFilter === 'recentes') {
            finalRenderArray = [...dbRelatos].sort((a, b) => b.timestamp - a.timestamp); // Ordem por data
        } 
        else if (currentFilter === 'salvos') {
            finalRenderArray = dbRelatos.filter(r => userSaves.includes(String(r.id))); // Apenas guardados
        }

        renderFeed(finalRenderArray);
    }

    function renderFeed(relatosArray) {
        feedTimeline.innerHTML = '';
        if(relatosArray.length === 0) {
            feedTimeline.innerHTML = '<p style="color:#666; padding: 30px; text-align:center; font-family: Montserrat;">Nenhum relato encontrado nesta secção.</p>';
            return;
        }

        relatosArray.forEach(relato => {
            const isLiked = userLikes.includes(String(relato.id));
            const isSaved = userSaves.includes(String(relato.id));
            const cardHTML = createCardHTML(relato, isLiked, isSaved);
            feedTimeline.insertAdjacentHTML('beforeend', cardHTML);
        });
        
        attachInteractionEvents();
    }

    function createCardHTML(relato, isLiked, isSaved) {
        const verifiedTag = relato.verificado ? `<i class="ph-fill ph-seal-check verified-icon" style="color: var(--gold-base); font-size: 0.9rem;"></i>` : '';
        const likeColor = isLiked ? 'color: var(--gold-base);' : 'color: #777;';
        const likeIcon = isLiked ? 'ph-fill' : 'ph';
        const saveColor = isSaved ? 'color: var(--gold-base);' : 'color: #777;';
        const saveIcon = isSaved ? 'ph-fill' : 'ph';

        return `
            <div class="terminal-card" style="padding: 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                <div class="t-card-header" style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div class="t-avatar" style="width: 40px; height: 40px; background: #141d33; color: var(--gold-base); display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 2px;">${relato.iniciais}</div>
                    <div class="t-meta" style="flex: 1;">
                        <span class="t-name" style="color: #fff; font-weight: bold; display: flex; gap: 5px; align-items: center;">${relato.nome} ${verifiedTag}</span>
                        <span class="t-role" style="color: #888; font-size: 0.75rem;">${relato.cargo}</span>
                    </div>
                    <span class="t-time" style="color: #555; font-size: 0.75rem;">${relato.dataStr}</span>
                </div>
                <div class="t-card-body">
                    <p style="color: #ccc; font-size: 0.95rem; line-height: 1.6;">${relato.texto}</p>
                </div>
                <div class="t-card-footer" style="display: flex; gap: 20px; margin-top: 15px;">
                    <button class="t-action like-btn" data-id="${relato.id}" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; ${likeColor} transition: 0.3s;"><i class="${likeIcon} ph-heart" style="font-size: 1.2rem;"></i></button>
                    <button class="t-action save-btn" data-id="${relato.id}" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; ${saveColor} transition: 0.3s;"><i class="${saveIcon} ph-bookmark-simple" style="font-size: 1.2rem;"></i></button>
                </div>
            </div>
        `;
    }

    // --- D. SISTEMA DE CURTIDAS E SALVAMENTOS (SEM NÚMEROS) ---
    function attachInteractionEvents() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = String(this.getAttribute('data-id'));
                const icon = this.querySelector('i');

                if (userLikes.includes(id)) {
                    userLikes = userLikes.filter(lId => lId !== id);
                    this.style.color = "#777";
                    icon.className = "ph ph-heart";
                } else {
                    userLikes.push(id);
                    this.style.color = "var(--gold-base)";
                    icon.className = "ph-fill ph-heart";
                }
                localStorage.setItem('vrtice_likes', JSON.stringify(userLikes));
            });
        });

        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = String(this.getAttribute('data-id'));
                const icon = this.querySelector('i');

                if (userSaves.includes(id)) {
                    userSaves = userSaves.filter(sId => sId !== id);
                    this.style.color = "#777";
                    icon.className = "ph ph-bookmark-simple";
                    
                    if(currentFilter === 'salvos') {
                        this.closest('.terminal-card').remove();
                        if(userSaves.length === 0) feedTimeline.innerHTML = '<p style="color:#666; padding: 30px; text-align:center; font-family: Montserrat;">Nenhum relato salvo em seu registro.</p>';
                    }
                } else {
                    userSaves.push(id);
                    this.style.color = "var(--gold-base)";
                    icon.className = "ph-fill ph-bookmark-simple";
                }
                localStorage.setItem('vrtice_saves', JSON.stringify(userSaves));
            });
        });
    }

    // --- E. ENVIO DE FORMULÁRIO ASSÍNCRONO (AJAX PARA FORMSPREE) ---
    const relatoForm = document.getElementById('relato-form');
    if(relatoForm) {
        relatoForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            const btnSubmit = document.getElementById('btn-submit-relato');
            const originalText = btnSubmit.innerText;
            
            // Feedback visual imediato
            btnSubmit.innerText = "ENVIANDO...";
            btnSubmit.style.opacity = "0.7";
            btnSubmit.style.pointerEvents = "none";

            try {
                const response = await fetch(relatoForm.action, {
                    method: 'POST',
                    body: new FormData(relatoForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    relatoForm.reset();
                    if (typeof showToast === "function") {
                        showToast("Relato enviado com sucesso. Agendado para moderação.", "ph-shield-check", "var(--gold-base)");
                    }
                } else {
                    if (typeof showToast === "function") {
                        showToast("Ocorreu um erro no envio. Tente novamente.", "ph-warning-circle", "#ff5252");
                    }
                }
            } catch (error) {
                if (typeof showToast === "function") {
                    showToast("Erro de conexão.", "ph-warning-circle", "#ff5252");
                }
            } finally {
                // Restaura o botão
                btnSubmit.innerText = originalText;
                btnSubmit.style.opacity = "1";
                btnSubmit.style.pointerEvents = "auto";
            }
        });
    }
}

// ==========================================
// 4. FUNÇÕES GERAIS E ANIMAÇÕES RESTANTES
// ==========================================
function showToast(message, iconClass = "ph-info", color = "var(--white-off)") {
    const container = document.getElementById('vrtice-toast-container');
    if(!container) return;

    const toast = document.createElement('div');
    toast.className = 'vrtice-toast';
    toast.innerHTML = `<i class="ph ${iconClass}" style="color: ${color}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('show'); }, 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 400); 
    }, 5000); 
}

function runPreloaderSequence() {
    const tl = gsap.timeline();
    
    tl.to(".logo-anim-wrapper", {
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out"
    })
    .to(".vrtice-vector", {
        strokeDashoffset: 0,
        duration: 2, 
        ease: "power3.inOut"
    })
    .to(".vrtice-vector", {
        fill: "#F1ECE2",
        stroke: "transparent",
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5")
    .to("#vrtice-loader-svg", {
        filter: "drop-shadow(0 0 20px rgba(200, 169, 112, 0.4))",
        duration: 0.5
    }, "<")
    .to(".logo-anim-wrapper", { duration: 0.4 })
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
    .from(".vrtice-badge-hero", { y: -20, opacity: 0, duration: 1 }, "-=0.6")
    .from(".hero-title", { y: 50, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.8")
    .from(".hero-separator", { scaleY: 0, duration: 1, ease: "power2.out" }, "-=1")
    .from(".hero-desc-text", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
    .from(".hero-subtitle", { opacity: 0, letterSpacing: "0em", duration: 1.5 }, "-=0.8");
}

function switchProduct(productId) {
    const displayArea = document.getElementById('dynamic-content-area');
    const data = productData[productId];
    
    document.querySelectorAll('.product-tab').forEach(tab => {
        tab.classList.remove('active');
        if(tab.getAttribute('onclick').includes(productId)) tab.classList.add('active');
    });

    gsap.to(displayArea, {
        opacity: 0, y: 20, duration: 0.3,
        onComplete: () => {
            displayArea.innerHTML = `
                <span class="vrtice-badge">${data.badge}</span>
                <h3 class="product-title-display" style="font-family: 'Abhaya Libre'; font-size: 2.5rem; margin: 15px 0; color: var(--white-off);">${data.title}</h3>
                <p style="color: #a0a0a0; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6;">${data.description}</p>
                <ul style="list-style: none; padding: 0; margin-bottom: 40px;">
                    ${data.features.map(f => `
                        <li style="margin-bottom: 15px; display: flex; align-items: start; gap: 10px; color: #d0d0d0;"><span style="color: var(--gold-base); font-size: 1.2rem;">/</span> ${f}</li>
                    `).join('')}
                </ul>
                <a href="#" class="btn-vrtice">${data.cta}</a>
            `;
            gsap.to(displayArea, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        }
    });
}

function initFaqSystem() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        trigger.addEventListener('click', () => {
            faqItems.forEach(other => {
                if(other !== item) {
                    other.querySelector('.faq-content').style.maxHeight = null;
                    other.querySelector('.faq-trigger').style.color = "#ddd";
                    other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                }
            });
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                trigger.style.color = "#ddd";
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                trigger.style.color = "var(--gold-base)";
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ==========================================
// 5. ANIMAÇÕES DE ROLAGEM (FLUID-TOUCH PROTOCOL)
// ==========================================
function initScrollAnimations() {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 969px)", () => {
        gsap.from(".thesis-content", { scrollTrigger: { trigger: ".section-thesis", start: "top 80%" }, x: -50, opacity: 0, duration: 1 });
        gsap.from(".thesis-visual", { scrollTrigger: { trigger: ".section-thesis", start: "top 80%" }, scale: 0.9, opacity: 0, duration: 1, delay: 0.2 });
        
        const proofCards = document.querySelectorAll(".proof-card");
        if(proofCards.length > 0) {
            gsap.from(proofCards, { scrollTrigger: { trigger: ".section-proof", start: "top 75%" }, y: 50, opacity: 0, duration: 0.8, stagger: 0.15 });
        }
    });

    mm.add("(max-width: 968px)", () => {
        gsap.from(".thesis-content", { scrollTrigger: { trigger: ".section-thesis", start: "top 90%" }, y: 30, opacity: 0, duration: 0.8, ease: "power2.out" });
        gsap.from(".thesis-visual", { scrollTrigger: { trigger: ".section-thesis", start: "top 90%" }, scale: 0.95, opacity: 0, duration: 0.8, delay: 0.1, ease: "power2.out" });
        
        const proofCards = document.querySelectorAll(".proof-card");
        if(proofCards.length > 0) {
            gsap.from(proofCards, { scrollTrigger: { trigger: ".section-proof", start: "top 90%" }, y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        }
    });
}

// ==========================================
// 6. MOTOR DO MENU OVERLAY (HIGH-TICKET)
// ==========================================
function initMenuSystem() {
    // CORREÇÃO DE SELETORES: Busca o botão pela Classe que você usa no HTML original
    const triggerBtn = document.querySelector('.menu-trigger');
    const menuOverlay = document.getElementById('v-menu-overlay');
    const menuIcon = document.querySelector('.menu-trigger i'); // Busca o ícone dentro do botão
    const menuLabel = document.querySelector('.menu-label');
    const submenuTrigger = document.querySelector('.has-submenu .menu-item-title');
    const submenuParent = document.querySelector('.has-submenu');

    if (triggerBtn && menuOverlay) {
        triggerBtn.addEventListener('click', () => {
            const isOpen = menuOverlay.classList.contains('is-open');
            
            if (isOpen) {
                closeMenu();
            } else {
                menuOverlay.classList.add('is-open');
                if(menuIcon) menuIcon.className = 'ph-bold ph-x'; // Troca o ícone para fechar
                if(menuLabel) menuLabel.innerText = "FECHAR";
                document.body.style.overflow = 'hidden'; 
            }
        });
    }

    if (submenuTrigger) {
        submenuTrigger.addEventListener('click', () => {
            submenuParent.classList.toggle('open');
        });
    }
}

window.closeMenu = function() {
    const menuOverlay = document.getElementById('v-menu-overlay');
    const menuIcon = document.querySelector('.menu-trigger i'); // Busca pela classe
    const menuLabel = document.querySelector('.menu-label');
    
    if(menuOverlay) {
        menuOverlay.classList.remove('is-open');
        if(menuIcon) menuIcon.className = 'ph ph-list'; // Restaura o ícone padrão
        if(menuLabel) menuLabel.innerText = "MENU";
        document.body.style.overflow = ''; 
    }
}