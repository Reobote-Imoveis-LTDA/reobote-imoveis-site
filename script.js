const WA_NUMBER = '5511949516889';
const waLink = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const bindWa = root => root.querySelectorAll('[data-wa]').forEach(el => {
  el.href = waLink(el.dataset.wa);
  el.target = '_blank';
  el.rel = 'noopener';
});

// Imóveis. Padrão por imóvel: id, cat (Casa|Apartamento), tipo, local, cidade, end, preco,
// stats (3 itens), fotos, desc (1 frase), dif (destaques curtos) e cond (condições de pagamento).
const fts = (slug, n) => Array.from({ length: n }, (_, i) => `casas/${slug}-${String(i + 1).padStart(2, '0')}`);
const G = 'Guarulhos';
const IMOVEIS = [
  { id: 'casa-alto-padrao', cat: 'Casa', tipo: 'Casa', local: 'Alto Padrão', cidade: G, preco: 'R$ 5.500.000',
    stats: [['bed', 3, 'Suítes'], ['bath', 6, 'Banheiros'], ['car', 6, 'Vagas']],
    fotos: fts('residencia-alto-padrao', 15),
    desc: 'Exclusividade, sofisticação e conforto em cada detalhe.',
    dif: [
      ['bed', 'Suíte master com closet'], ['bed', '2 suítes com varanda'],
      ['desk', 'Escritório privativo'], ['flame', 'Sala de TV com lareira'],
      ['sofa', 'Sala de estar pé-direito duplo'], ['utensils', 'Jantar integrado e cozinha com ilha'],
      ['grill', 'Área gourmet com churrasqueira'], ['pool', 'Piscina com aquecimento solar'],
      ['sauna', 'Sauna'], ['leaf', 'Jardim planejado'],
      ['cabinet', 'Móveis planejados'], ['user', 'Suíte de funcionários'],
      ['box', '2 despensas e depósito'], ['car', 'Garagem: 3 cobertas + 3 descobertas']
    ] },
  { id: 'apto-vila-augusta', cat: 'Apartamento', tipo: 'Apartamento', local: 'Vila Augusta', cidade: G,
    end: 'Rua Professor Ferreira Paulino – Vila Augusta', preco: 'R$ 498.000',
    stats: [['bed', 2, 'Quartos'], ['car', 1, 'Vaga'], ['building', 'Lazer', 'Completo']],
    fotos: fts('casa-a-venda-vila-augusta', 10),
    desc: 'Sacada envidraçada com vista livre e condomínio fechado com lazer completo.',
    dif: [['cabinet', 'Armários e cozinha planejados'], ['sofa', 'Sala 2 ambientes e sanca de gesso'], ['pool', 'Piscina, academia e mini quadra'], ['building', 'Salão de festas, jogos e playground'], ['shield', 'Portaria 24h e 2 elevadores'], ['bath', 'Banheiro com box de vidro']],
    cond: ['Aceita financiamento bancário'] },
  { id: 'apto-residencial-taruma', cat: 'Apartamento', tipo: 'Apartamento', local: 'Residencial Tarumã', cidade: G,
    end: 'Rua Turvolândia, 839 – Vila Nova Bonsucesso', preco: 'Entrada R$ 90.000',
    stats: [['bed', 2, 'Quartos'], ['bath', 1, 'Banheiro'], ['building', '17º', 'Andar']],
    fotos: fts('residencial-taruma', 5),
    desc: 'Apartamento no 17º andar: entrada de R$ 90 mil e você assume o financiamento.',
    dif: [['sofa', 'Sala, cozinha e lavanderia'], ['building', '17º andar com elevador'], ['building', 'Salão e área de festas'], ['leaf', 'Playground e academia ao ar livre'], ['shield', 'Portaria 24h'], ['box', 'Mercado no condomínio']],
    cond: ['Assume o financiamento', 'Parcelas de R$ 1.017'] },
  { id: 'apto-amantikir', cat: 'Apartamento', tipo: 'Apartamento', local: 'Amantikir', cidade: G,
    end: 'Rua Turvolândia, 867 – Vila Nova Bonsucesso', preco: 'Entrada R$ 90.000',
    stats: [['bed', 2, 'Quartos'], ['bath', 1, 'Banheiro'], ['building', 'Lazer', 'Condomínio']],
    fotos: fts('ap-a-venda-turvolandia', 6),
    desc: 'Entrada de R$ 90 mil e você assume o financiamento existente.',
    dif: [['sofa', 'Sala e cozinha'], ['box', 'Lavanderia'], ['building', 'Área de festas'], ['leaf', 'Playground e academia ao ar livre'], ['shield', 'Portaria 24h'], ['box', 'Mercado no condomínio']],
    cond: ['Assume o financiamento', 'Parcelas de aprox. R$ 622'] },
  { id: 'casa-parque-alvorada', cat: 'Casa', tipo: 'Casa', local: 'Parque Alvorada', cidade: G,
    end: 'Parque Alvorada', preco: 'R$ 630.000',
    stats: [['bed', 2, 'Quartos'], ['car', 2, 'Vagas'], ['area', '73,9 m²', 'Construída']],
    fotos: fts('casa-a-venda-parque-alvorada', 13),
    desc: 'Casa ampla com cozinha integrada à sala de jantar e área gourmet coberta.',
    dif: [['bed', '2 dormitórios, sendo 1 suíte'], ['sofa', 'Sala ampla e bem iluminada'], ['utensils', 'Cozinha integrada à sala de jantar'], ['grill', 'Área gourmet coberta'], ['area', 'Terreno de 125 m²'], ['car', '2 vagas de garagem']],
    cond: ['Aceita financiamento e FGTS', 'Avaliamos permuta por carro'] },
  { id: 'apto-reserva-taruma-18', cat: 'Apartamento', tipo: 'Apartamento', local: 'Reserva Tarumã · 18º andar', cidade: G,
    end: 'Reserva Tarumã – Bloco 1, 18º andar', preco: 'R$ 249.900',
    stats: [['bed', 2, 'Quartos'], ['car', 1, 'Vaga'], ['area', '44 m²', 'Área']],
    fotos: fts('apartamento-a-venda-taruma', 5),
    desc: 'Novo, nunca habitado, no último andar e com vaga de garagem.',
    dif: [['key', 'Nunca habitado, pronto para morar'], ['key', 'Fechadura eletrônica'], ['cabinet', 'Armários na cozinha e no banheiro'], ['bath', 'Box de vidro e chuveiro instalado'], ['sofa', 'Piso novo e pia de mármore'], ['car', 'Vaga de garagem']],
    cond: ['Aceita financiamento bancário', 'Condomínio aprox. R$ 320', 'IPTU aprox. R$ 55/mês'] },
  { id: 'apto-reserva-taruma-9', cat: 'Apartamento', tipo: 'Apartamento', local: 'Reserva Tarumã · 9º andar', cidade: G,
    end: 'Reserva Tarumã – Bloco 2, 9º andar', preco: 'R$ 235.000',
    stats: [['bed', 2, 'Quartos'], ['car', 1, 'Vaga'], ['area', '42 m²', 'Área']],
    fotos: fts('ap-a-venda-reserva-taruma', 7),
    desc: 'Novo, nunca habitado e pronto para morar, com vaga de garagem.',
    dif: [['key', 'Nunca habitado'], ['key', 'Fechadura eletrônica'], ['cabinet', 'Armários na cozinha'], ['bath', 'Gabinete e box de vidro'], ['sofa', 'Piso laminado nos ambientes principais'], ['sun', 'Iluminação completa']],
    cond: ['Aceita financiamento'] },
  { id: 'apto-cidade-maia', cat: 'Apartamento', tipo: 'Apartamento', local: 'Cidade Maia', cidade: G,
    end: 'Condomínio Cidade Maia', preco: 'R$ 1.500.000',
    stats: [['bed', 'Suíte', 'Dormitórios'], ['sofa', 'Varanda', 'Espaçosa'], ['building', 'Alto', 'Padrão']],
    fotos: fts('ap-cidade-maia', 13),
    desc: 'Projeto moderno, ambientes amplos e acabamento de alto padrão.',
    dif: [['sofa', 'Sala ampla para vários ambientes'], ['sofa', 'Varanda espaçosa'], ['utensils', 'Cozinha funcional'], ['bed', 'Dormitórios e suíte'], ['box', 'Área de serviço independente'], ['sun', 'Boa iluminação e ventilação']] },
  { id: 'sobrado-jardim-giovana', cat: 'Casa', tipo: 'Sobrado', local: 'Jardim Giovana', cidade: G,
    end: 'Rua Garça Real – Jardim Giovana', preco: 'R$ 700.000',
    stats: [['bed', 2, 'Quartos'], ['car', 3, 'Vagas'], ['area', '268 m²', 'Construída']],
    fotos: fts('ap-jardim-giovana', 16),
    desc: 'Sobrado de esquina com salão de festas e área gourmet com forno de pizza.',
    dif: [['bed', '2 dormitórios no térreo, 1 suíte'], ['sofa', 'Salas de estar e jantar integradas'], ['utensils', 'Cozinha moderna com ilha'], ['bath', '2 banheiros, um com banheira'], ['grill', 'Área gourmet com churrasqueira e forno de pizza'], ['area', 'Terreno de 288 m² (esquina)']] },
  { id: 'apto-amantikir-2', cat: 'Apartamento', tipo: 'Apartamento', local: 'Amantikir II', cidade: G,
    end: 'Rua Turvolândia, 867 – Vila Nova Bonsucesso', preco: 'Entrada R$ 115.000',
    stats: [['bed', 2, 'Quartos'], ['bath', 1, 'Banheiro'], ['building', 'Lazer', 'Condomínio']],
    fotos: fts('ap-condominio-amantikir', 8),
    desc: 'Entrada de R$ 115 mil e você assume o financiamento.',
    dif: [['sofa', 'Sala e cozinha'], ['box', 'Lavanderia'], ['building', 'Área de festas'], ['leaf', 'Playground e academia ao ar livre'], ['shield', 'Portaria 24h'], ['box', 'Mercado interno']],
    cond: ['Assume o financiamento', 'Parcela: R$ 860', 'Parcela Tenda: R$ 550 (até 2030)'] },
  { id: 'apto-santa-beatriz', cat: 'Apartamento', tipo: 'Apartamento', local: 'Santa Beatriz', cidade: G,
    end: 'Av. José Brumatti, 2374 – Lavras', preco: 'R$ 210.000',
    stats: [['bed', 2, 'Quartos'], ['bath', 1, 'Banheiro'], ['car', 'Sem', 'Vaga']],
    fotos: fts('ap-santa-beatriz', 8),
    desc: 'Apartamento aconchegante com ITBI e registro inclusos.',
    dif: [['bed', '2 dormitórios'], ['sofa', 'Sala aconchegante'], ['utensils', 'Cozinha'], ['bath', '1 banheiro'], ['check', 'ITBI e registro inclusos']],
    cond: ['Condomínio R$ 382'] },
  { id: 'sobrado-jardim-triunfo', cat: 'Casa', tipo: 'Sobrado', local: 'Jardim Triunfo', cidade: G,
    end: 'Rua Santa Izabel do Pará – Jardim Triunfo', preco: 'R$ 679.000',
    stats: [['bed', 3, 'Suítes'], ['car', 3, 'Vagas'], ['area', '102–107 m²', 'Construída']],
    fotos: fts('sobrado-em-guarulhos', 13),
    desc: 'Rua sem saída, de frente para o bosque da Zoonoses, a 5 min do CEU Bonsucesso.',
    dif: [['bed', '3 suítes, com box em todas'], ['sofa', 'Suíte presidencial com sacada'], ['utensils', 'Sala, copa e cozinha integradas'], ['grill', 'Quintal com churrasqueira e coifa'], ['car', 'Garagem para 3 carros, portões eletrônicos'], ['key', 'Documentos em mãos']],
    cond: ['Aceita financiamento bancário'] },
  { id: 'apto-santa-beatriz-2', cat: 'Apartamento', tipo: 'Apartamento', local: 'Santa Beatriz II', cidade: G,
    end: 'Av. José Brumatti, 2374 – Lavras', preco: 'R$ 280.000',
    stats: [['bed', 2, 'Quartos'], ['bath', 1, 'Banheiro'], ['snow', 'Ar', 'Condicionado']],
    fotos: fts('ap-santa-beatriz-2', 11),
    desc: 'Apartamento com ar-condicionado e churrasqueira individual.',
    dif: [['snow', 'Ar-condicionado'], ['grill', 'Churrasqueira individual'], ['grill', 'Salão com churrasqueira'], ['building', 'Área de festas'], ['leaf', 'Playground'], ['shield', 'Portaria 24h']],
    cond: ['Aceita financiamento bancário', 'Ou R$ 160 mil em mãos e transfere a dívida'] },
  { id: 'casa-parque-alvorada-2', cat: 'Casa', tipo: 'Casa', local: 'Parque Alvorada II', cidade: G,
    end: 'Rua Inimutaba, 79 e 85 – Parque Alvorada', preco: 'R$ 650.000',
    stats: [['bed', 3, 'Quartos'], ['car', 2, 'Vagas'], ['area', '85 m²', 'Construída']],
    fotos: fts('casa-parque-alvorada', 5),
    desc: 'Casa com jardim de inverno e espaço para jacuzzi.',
    dif: [['bed', '3 dormitórios, sendo 1 suíte'], ['sofa', 'Sala ampla e bem iluminada'], ['utensils', 'Cozinha integrada à sala de jantar'], ['grill', 'Área gourmet coberta'], ['leaf', 'Jardim de inverno para jacuzzi'], ['area', 'Terreno de 125 m²']],
    cond: ['Aceita financiamento com FGTS', 'Avaliamos permuta de carro ou imóvel menor'] },
  { id: 'casa-nova-bonsucesso', cat: 'Casa', tipo: 'Casa', local: 'Nova Bonsucesso', cidade: G,
    end: 'Rua Senador José Bento – Vila Nova Bonsucesso', preco: 'R$ 480.000',
    stats: [['bed', 2, 'Quartos'], ['car', 2, 'Vagas'], ['area', '67 m²', 'Construída']],
    fotos: fts('casa-nova-bonsucesso', 13),
    desc: 'Casa com quintal com espaço para piscina e 2 vagas cobertas.',
    dif: [['bed', '2 dormitórios'], ['sofa', 'Sala ampla e iluminada'], ['utensils', 'Cozinha ampla'], ['bath', '1 banheiro e lavabo'], ['pool', 'Quintal com espaço para piscina'], ['area', 'Terreno de 130 m²']],
    cond: ['Aceita financiamento bancário', 'Avaliamos permuta de carro'] },
  { id: 'apto-cidade-maia-2', cat: 'Apartamento', tipo: 'Apartamento', local: 'Cidade Maia · Torre Orquídea', cidade: G,
    end: 'Torre Orquídea, apto 202 – Jardim Cidade Maia', preco: 'R$ 1.300.000',
    stats: [['bed', 3, 'Suítes'], ['car', 2, 'Vagas'], ['area', '122,5 m²', 'Privativa']],
    fotos: fts('ap-cidade-maia-2', 19),
    desc: 'Alto padrão, completo e com móveis planejados em todos os cômodos.',
    dif: [['bed', '3 suítes amplas e lavabo'], ['sofa', 'Sala integrada de jantar e TV'], ['grill', 'Sacada grande com área gourmet'], ['cabinet', 'Móveis planejados'], ['shield', 'Portas principais blindadas'], ['box', 'Lavanderia e dispensa']],
    cond: ['Condomínio R$ 1.550', 'IPTU R$ 258/mês'] }
];
// Imóveis para alugar. Mesmo padrão dos de venda; `preco` já é o valor mensal e `cond` diz o que está incluso.
const ftsA = (slug, n) => Array.from({ length: n }, (_, i) => `alugueis/${slug}-${String(i + 1).padStart(2, '0')}`);
const ALUGUEIS = [
  { id: 'alug-apto-parque-do-sol', alug: true, cat: 'Apartamento', tipo: 'Apartamento', local: 'Condomínio Parque do Sol', cidade: G,
    end: 'Rua Cabo João Teruel Fregoni, 124 – Ponte Grande', preco: 'R$ 2.872/mês',
    stats: [['bed', 2, 'Dormitórios'], ['car', 1, 'Vaga'], ['area', '50 m²', 'Área']],
    fotos: ftsA('apto-parque-do-sol', 11),
    desc: 'Apartamento de 50 m² com móveis planejados e sacada telada.',
    dif: [['sofa', 'Sala, cozinha e lavanderia'], ['cabinet', 'Planejados no dormitório, cozinha, banheiro e área de serviço'], ['sun', 'Sacada telada'], ['box', 'Dois depósitos']],
    cond: ['Condomínio e IPTU inclusos', 'Água e luz à parte'] },
  { id: 'alug-apto-vida-plena', alug: true, cat: 'Apartamento', tipo: 'Apartamento mobiliado', local: 'Condomínio Vida Plena', cidade: G,
    end: 'Av. Benjamin Harris Hunicutt, 430 – Portal dos Gramados', preco: 'R$ 4.500/mês',
    stats: [['bed', 2, 'Dormitórios'], ['car', 1, 'Vaga coberta'], ['area', '59 m²', 'Área']],
    fotos: ftsA('apto-vida-plena', 8),
    desc: 'Apartamento mobiliado em frente ao Parque Shopping Maia, com lazer completo.',
    dif: [['sofa', 'Mobiliado'], ['sun', 'Varanda'], ['key', 'Fechadura eletrônica'], ['pool', '3 piscinas, churrasqueiras e salões de festas'], ['building', 'Cinema, brinquedoteca, coworking e sauna'], ['pin', 'Em frente ao Parque Shopping Maia e Carrefour']],
    cond: ['Água, luz, IPTU e condomínio inclusos'] },
  { id: 'alug-casa-jardim-angelica-2', alug: true, cat: 'Casa', tipo: 'Casa', local: 'Jardim Angélica 2', cidade: G,
    end: 'Rua Telha, 268 – Jardim Angélica 2', preco: 'R$ 2.500/mês',
    stats: [['bed', 3, 'Quartos'], ['car', 4, 'Vagas'], ['bath', 1, 'Banheiro']],
    fotos: ftsA('casa-jardim-angelica-2', 10),
    desc: 'Casa com quintal amplo e salão independente acima, aceita pet.',
    dif: [['sofa', 'Sala, cozinha e lavanderia'], ['bed', '3 quartos (1 de serviço)'], ['leaf', 'Quintal amplo'], ['building', 'Salão independente acima da casa'], ['user', 'Aceita pet (exceto pitbull)'], ['box', 'Dois depósitos']],
    cond: ['Água e luz à parte'] },
  { id: 'alug-apto-ouro-verde', alug: true, cat: 'Apartamento', tipo: 'Apartamento', local: 'Condomínio Ouro Verde', cidade: G,
    end: 'Av. Marechal Rondon, 424 – Ponte Grande', preco: 'R$ 2.300/mês',
    stats: [['bed', 2, 'Dormitórios'], ['car', 1, 'Vaga'], ['area', '56 m²', 'Área']],
    fotos: ftsA('apto-ouro-verde', 10),
    desc: 'Apartamento com sacada, salão de festas e churrasqueira, perto das principais vias.',
    dif: [['sofa', 'Sala para 2 ambientes'], ['sun', 'Sacada'], ['user', 'Aceita pet de pequeno porte'], ['building', 'Salão de festas'], ['grill', 'Churrasqueira'], ['pin', 'Próximo à Av. Guarulhos, Dutra, Marginal e Fernão Dias'], ['box', 'Dois depósitos']],
    cond: ['Condomínio e IPTU inclusos', 'Água e luz à parte'] }
];
const todosImoveis = [...IMOVEIS, ...ALUGUEIS];
const CATEGORIAS = [['todos', 'Todos'], ['Casa', 'Casas'], ['Apartamento', 'Apartamentos']];
const LIMITE = 8;
const titulo = p => `${p.tipo}, ${p.local}`;

const stat = (icon, val, label) =>
  `<li><svg><use href="#i-${icon}"/></svg><b>${val}</b><small>${label}</small></li>`;
const stats = p => p.stats.map(s => stat(...s)).join('');
const interesse = p => p.alug
  ? `Olá! Tenho interesse em alugar: ${titulo(p)}, ${p.cidade} (${p.preco}).`
  : `Olá! Tenho interesse em visitar: ${titulo(p)}, ${p.cidade} (${p.preco}).`;

const card = p => `
  <article class="prop has-more" data-id="${p.id}" data-i="${(p.alug ? ALUGUEIS : IMOVEIS).indexOf(p)}" data-cat="${p.cat}" data-q="${[p.tipo, p.local, p.cidade, p.end || ''].join(' ')}">
    <div class="ph"><img src="img/${p.fotos[0]}.jpg" alt="${titulo(p)}" loading="lazy"><i class="tag">${p.alug ? 'Aluguel' : 'Venda'}</i><button type="button" class="more">Ver detalhes</button></div>
    <div class="prop-body">
      <h3>${p.tipo},<br>${p.local}</h3>
      <b class="price">${p.preco}</b>
      <ul class="stats">${stats(p)}</ul>
      <a class="btn-line" data-wa="${interesse(p)}">Quero visitar</a>
    </div>
  </article>`;

// Grupos por cidade (só aparecem cidades que têm imóvel) + filtro por categoria
const cidades = [...new Set(IMOVEIS.map(p => p.cidade))];
document.getElementById('grupos').innerHTML = cidades.map(c => `
  <div class="group" data-cidade="${c}">
    <p class="eyebrow">Oportunidade imóveis</p>
    <h2>Imóveis em ${c}</h2>
    ${[0, 1].map(k => `<div class="rowc" data-row="${k}"><div class="props">${k ? '' : IMOVEIS.filter(p => p.cidade === c).map(card).join('')}</div><div class="dots" aria-hidden="true"></div></div>`).join('')}
  </div>`).join('');
document.getElementById('alugar').innerHTML = `
  <div class="group alug" data-cidade="Guarulhos">
    <p class="eyebrow">Locação</p>
    <h2>Imóveis para alugar</h2>
    ${[0, 1].map(k => `<div class="rowc" data-row="${k}"><div class="props">${k ? '' : ALUGUEIS.map(card).join('')}</div><div class="dots" aria-hidden="true"></div></div>`).join('')}
  </div>`;
document.getElementById('filtros').innerHTML = CATEGORIAS.map(([k, t], i) =>
  `<button type="button" class="chip${i ? '' : ' on'}" data-cat="${k}">${t} <small>${k === 'todos' ? IMOVEIS.length : IMOVEIS.filter(p => p.cat === k).length}</small></button>`).join('');
document.getElementById('mais').innerHTML = `<a class="btn-line" role="button" tabindex="0">Ver todos os imóveis (${IMOVEIS.length})</a>`;

bindWa(document);

// Botões "flow": injeta setas e círculo (visual no CSS .fb)
const ARROW = '<svg class="a %c" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const flowify = root => root.querySelectorAll('.btn, .btn-line, .top-cta').forEach(el => {
  if (el.classList.contains('fb')) return;
  el.classList.add('fb');
  el.innerHTML = ARROW.replace('%c', 'a2') + `<span class="t">${el.textContent.trim()}</span><i class="c"></i>` + ARROW.replace('%c', 'a1');
});
flowify(document);

// Pop-up de detalhes do imóvel
const modal = document.getElementById('modal');
const mBody = modal.querySelector('.m-body');
// Galeria: carrossel com arraste, setas, contador e miniaturas que expandem a ativa
const initGallery = (photo, strip) => {
  const track = photo.querySelector('.m-track');
  const prev = photo.querySelector('.prev'), next = photo.querySelector('.next');
  const count = photo.querySelector('.m-count');
  const thumbs = [...strip.children];
  const total = thumbs.length;
  let idx = 0, startX = 0, dx = 0, startT = 0, drag = false;

  const go = i => {
    idx = Math.max(0, Math.min(total - 1, i));
    track.style.transition = 'transform .35s cubic-bezier(.22,.8,.3,1)';
    track.style.transform = `translateX(${-idx * 100}%)`;
    prev.disabled = idx === 0;
    next.disabled = idx === total - 1;
    count.textContent = `${idx + 1} / ${total}`;
    thumbs.forEach((t, k) => t.classList.toggle('on', k === idx));
    requestAnimationFrame(() => {
      const t = thumbs[idx];
      strip.scrollTo({ left: t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
    });
  };
  prev.addEventListener('click', () => go(idx - 1));
  next.addEventListener('click', () => go(idx + 1));
  thumbs.forEach((t, k) => t.addEventListener('click', () => go(k)));

  photo.addEventListener('pointerdown', e => {
    if (e.target.closest('.m-nav')) return;
    drag = true; startX = e.clientX; startT = e.timeStamp; dx = 0;
    track.style.transition = 'none';
    photo.setPointerCapture(e.pointerId);
  });
  photo.addEventListener('pointermove', e => {
    if (!drag) return;
    dx = e.clientX - startX;
    track.style.transform = `translateX(calc(${-idx * 100}% + ${dx}px))`;
  });
  const end = e => {
    if (!drag) return;
    drag = false;
    const w = photo.clientWidth || 1;
    const v = dx / Math.max(e.timeStamp - startT, 1);
    go(Math.abs(dx) > w * .3 || Math.abs(v) > .5 ? idx + (dx < 0 ? 1 : -1) : idx);
  };
  photo.addEventListener('pointerup', end);
  photo.addEventListener('pointercancel', end);
  go(0);
};

const galleryHTML = (p, extra = '') => `
      <div class="m-photo">
        <div class="m-track">${p.fotos.map((f, i) => `<img src="img/${f}.jpg" alt="${titulo(p)} – foto ${i + 1}" draggable="false"${i ? ' loading="lazy"' : ''}>`).join('')}</div>
        <button type="button" class="m-nav prev" aria-label="Foto anterior"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></button>
        <button type="button" class="m-nav next" aria-label="Próxima foto"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
        <span class="m-count"></span>${extra}
      </div>
      <div class="m-thumbs">${p.fotos.map((f, i) => `<button type="button" aria-label="Foto ${i + 1}"><img src="img/${f}.jpg" alt="" draggable="false" loading="lazy"></button>`).join('')}</div>`;

const openModal = p => {
  mBody.innerHTML = `
    <div class="m-gal">
      ${galleryHTML(p)}
      <div class="m-price">
        <b class="price">${p.preco}</b>
        ${(p.cond || []).map(c => `<span>${c}</span>`).join('')}
      </div>
    </div>
    <div class="m-info">
      <p class="eyebrow">${p.alug ? 'Aluguel' : 'Venda'} · ${p.cidade} – SP</p>
      <h3>${titulo(p)}</h3>
      ${p.end ? `<p class="m-end"><svg><use href="#i-pin"/></svg>${p.end}</p>` : ''}
      <ul class="stats">${stats(p)}</ul>
      <p class="m-desc">${p.desc}</p>
      <ul class="m-dif">${p.dif.map(([i, t]) => `<li><svg><use href="#i-${i}"/></svg>${t}</li>`).join('')}</ul>
      <a class="btn" data-wa="${interesse(p)}">Quero visitar</a>
    </div>`;
  initGallery(mBody.querySelector('.m-photo'), mBody.querySelector('.m-thumbs'));
  bindWa(mBody);
  flowify(mBody);
  modal.showModal();
  modal.scrollTop = 0;
  document.body.classList.add('lock');
};
document.querySelectorAll('.prop.has-more').forEach(c => {
  const p = todosImoveis.find(x => x.id === c.dataset.id);
  c.querySelectorAll('.ph, h3').forEach(el => el.addEventListener('click', () => openModal(p)));
});
modal.querySelector('.m-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
modal.addEventListener('close', () => document.body.classList.remove('lock'));

// Busca por bairro/cidade/nome + filtro por categoria + "ver todos"
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const filtro = { q: '', cat: 'todos', todos: false };
const maisBox = document.getElementById('mais');
// Celular: duas linhas de carrossel independentes (cards alternados); cada uma tem suas bolinhas
const mobile = matchMedia('(max-width: 699px)');
const distribuir = () => document.querySelectorAll('.group').forEach(g => {
  const linhas = [...g.querySelectorAll('.rowc')];
  const cards = [...g.querySelectorAll('.prop')].sort((a, b) => a.dataset.i - b.dataset.i);
  cards.forEach((c, k) => linhas[mobile.matches ? k % 2 : 0].querySelector('.props').append(c));
  linhas[1].hidden = !mobile.matches;
});
const colunaAtiva = props => {
  const cards = [...props.children].filter(c => !c.hidden);
  if (cards.length < 2) return 0;
  if (props.scrollLeft >= props.scrollWidth - props.clientWidth - 4) return cards.length - 1;
  return Math.min(cards.length - 1, Math.round(props.scrollLeft / (cards[1].offsetLeft - cards[0].offsetLeft)));
};
const pintarDots = row => {
  const ativa = colunaAtiva(row.querySelector('.props'));
  [...row.querySelector('.dots').children].forEach((d, i) => d.classList.toggle('on', i === ativa));
};
const montarDots = row => {
  const props = row.querySelector('.props');
  const n = [...props.children].filter(c => !c.hidden).length;
  row.querySelector('.dots').innerHTML = n > 1 ? '<i></i>'.repeat(n) : '';
  props.scrollLeft = 0;
  pintarDots(row);
};
document.querySelectorAll('.rowc').forEach(r => r.querySelector('.props').addEventListener('scroll', () => pintarDots(r), { passive: true }));
const aplicarFiltro = () => {
  const limitar = !filtro.q && filtro.cat === 'todos' && !filtro.todos;
  let total = 0, ocultos = 0;
  document.querySelectorAll('.group:not(.alug)').forEach(g => {
    let vis = 0;
    [...g.querySelectorAll('.prop')].sort((a, b) => a.dataset.i - b.dataset.i).forEach(c => {
      const ok = (!filtro.q || norm(c.dataset.q).includes(filtro.q)) && (filtro.cat === 'todos' || c.dataset.cat === filtro.cat);
      const show = ok && !(limitar && vis >= LIMITE);
      if (ok && !show) ocultos++;
      c.hidden = !show;
      vis += show;
    });
    g.hidden = !vis;
    total += vis;
  });
  document.querySelector('.empty').hidden = total > 0;
  maisBox.hidden = !ocultos;
  document.querySelectorAll('.rowc').forEach(montarDots);
};
document.getElementById('busca').addEventListener('submit', e => {
  e.preventDefault();
  filtro.q = norm(new FormData(e.target).get('q').trim());
  aplicarFiltro();
  // fecha o teclado e rola por JS: o scrollIntoView suave é interrompido no celular pelo teclado e pelo palco fixo da transição
  document.activeElement?.blur();
  const sec = document.getElementById('imoveis');
  const alvo = () => sec.getBoundingClientRect().top + scrollY - 70;
  // o teclado fechando muda a altura da tela e, com ela, a altura da transição do topo: depois de chegar, reconfere a posição
  const corrigir = () => {
    let n = 0;
    const iv = setInterval(() => {
      if (Math.abs(sec.getBoundingClientRect().top - 70) > 3) scrollTo({ top: alvo(), behavior: 'instant' });
      if (++n >= 16) clearInterval(iv);
    }, 150);
  };
  setTimeout(() => {
    const a = alvo(), de = scrollY, dur = Math.min(900, 300 + Math.abs(a - de) * .25), t0 = performance.now();
    const passo = t => {
      const p = Math.min(1, (t - t0) / dur);
      scrollTo({ top: de + (a - de) * (1 - (1 - p) ** 3), behavior: 'instant' });
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
    setTimeout(corrigir, dur + 50);
  }, 450);
});
document.getElementById('filtros').addEventListener('click', e => {
  const b = e.target.closest('.chip');
  if (!b) return;
  filtro.cat = b.dataset.cat;
  document.querySelectorAll('#filtros .chip').forEach(x => x.classList.toggle('on', x === b));
  aplicarFiltro();
});
maisBox.firstElementChild.addEventListener('click', () => { filtro.todos = true; aplicarFiltro(); });
distribuir();
aplicarFiltro();
mobile.addEventListener('change', () => { distribuir(); aplicarFiltro(); });

// Imóvel em destaque: mesma galeria e mesmos detalhes do pop-up
const feat = IMOVEIS.find(p => p.id === 'casa-alto-padrao');
const featInfo = document.querySelector('.feature-info');
featInfo.innerHTML = `
  <p class="eyebrow">Imóvel em destaque</p>
  <h3>${titulo(feat)}</h3>
  <b class="price">${feat.preco}</b>
  <ul class="stats">${stats(feat)}</ul>
  <p class="f-desc">${feat.desc}</p>
  <ul class="m-dif">${feat.dif.map(([i, t]) => `<li><svg><use href="#i-${i}"/></svg>${t}</li>`).join('')}</ul>
  <a class="btn-line" data-wa="${interesse(feat)}">Quero visitar</a>`;
bindWa(featInfo);
flowify(featInfo);
const featMedia = document.querySelector('.feature-media');
featMedia.innerHTML = galleryHTML(feat, `<span class="loc">${feat.cidade} – SP</span><i class="tag">Venda</i>`);
initGallery(featMedia.querySelector('.m-photo'), featMedia.querySelector('.m-thumbs'));

// Menu translúcido -> sólido ao rolar
const header = document.getElementById('topo');
const onScroll = () => header.classList.toggle('solid', scrollY > 4);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const burger = header.querySelector('.burger');
const setMenu = open => {
  header.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
burger.addEventListener('click', () => setMenu(!header.classList.contains('open')));
header.querySelectorAll('.top-panel a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Formulário de venda
const form = document.getElementById('form-vender');
form.addEventListener('submit', e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  const err = form.querySelector('.err');
  const ok = ['nome', 'tipo', 'local'].every(k => (f[k] || '').trim());
  err.hidden = ok;
  if (!ok) return;
  const msg = [
    'Olá! Quero vender meu imóvel.',
    `Nome: ${f.nome}`,
    `Tipo: ${f.tipo}`,
    `Local: ${f.local}`,
    f.valor && `Valor pretendido: ${f.valor}`,
    f.obs && `Detalhes: ${f.obs}`
  ].filter(Boolean).join('\n');
  window.open(waLink(msg), '_blank', 'noopener');
});

// Transição hero -> segunda seção: zoom descendo a câmera + segunda seção subindo em paralaxe
const journey = document.getElementById('journey');
const heroBg = journey.querySelector('.hero-bg');
const heroEl = document.getElementById('hero');
const sala = journey.querySelector('.sala');
const fazWrap = journey.querySelector('.fazemos .wrap');
const clamp01 = v => Math.min(Math.max(v, 0), 1);
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const seg = (t, a, b) => ease(clamp01((t - a) / (b - a)));
let tAlvo = 0, tAtual = 0, rodando = false;
// Telas baixas (celular): se os cards não cabem, a seção começa abaixo do menu e sobe no fim da rolagem
const faz = journey.querySelector('.fazemos');
const TOPO = 84, BASE = 72;
let extra = 0;
const medir = () => {
  faz.classList.remove('longa');
  extra = Math.max(0, Math.ceil(fazWrap.offsetHeight + TOPO + BASE - innerHeight));
  faz.classList.toggle('longa', extra > 0);
  journey.style.height = extra ? `calc(225svh + ${extra}px)` : '';
};
const alcance = () => journey.offsetHeight - extra - innerHeight;

// Celular: sem zoom nem fade na hero (o campo de busca fica parado e o teclado não o desmonta); só o paralaxe da imagem com a segunda seção subindo
const celular = matchMedia('(max-width:1023px)');
const quadro = () => {
  const vh = innerHeight;
  const movel = celular.matches;
  const a = movel ? 0 : seg(tAtual, 0, 1);       // 1ª rolagem: zoom na hero
  const b = movel ? seg(tAtual, 0, 1.6) : seg(tAtual, .7, 1.8);     // 2ª rolagem: segunda seção sobe
  heroBg.style.transformOrigin = `50% ${a * 70}%`;
  heroBg.style.transform = movel ? `translateY(${-b * 8}%)` : `scale(${1 + a * .65})`;
  const texto = movel ? 0 : seg(tAtual, 0, .55);
  heroEl.style.opacity = 1 - texto;
  heroEl.style.transform = texto ? `scale(${1 + texto * .14})` : '';
  heroEl.style.visibility = texto >= 1 ? 'hidden' : 'visible';
  sala.style.transform = `translateY(${(1 - b) * 100}%)`;
  const c = extra ? clamp01((scrollY - alcance()) / extra) : 0;
  fazWrap.style.transform = `translateY(${(1 - b) * 1.5 * vh - c * extra}px)`;
};
const passo = () => {
  tAtual += (tAlvo - tAtual) * .14;
  if (Math.abs(tAlvo - tAtual) < .0008) tAtual = tAlvo;
  quadro();
  rodando = tAtual !== tAlvo;
  if (rodando) requestAnimationFrame(passo);
};
const campo = document.querySelector('#busca input');
const aoRolar = () => {
  if (document.activeElement === campo) return; // digitando: a transição fica parada
  tAlvo = clamp01(scrollY / alcance()) * 2;
  if (!rodando) { rodando = true; requestAnimationFrame(passo); }
};
addEventListener('scroll', aoRolar, { passive: true });
let largura = innerWidth;
addEventListener('resize', () => {
  if (innerWidth === largura) return; // teclado abrindo/fechando só muda a altura
  largura = innerWidth;
  medir(); aoRolar();
});
campo.addEventListener('blur', () => aoRolar());
addEventListener('load', () => { medir(); aoRolar(); });
medir();
tAtual = tAlvo = clamp01(scrollY / alcance()) * 2;
quadro();

// Link "Serviços": leva ao ponto em que a segunda seção está inteira na tela
document.querySelectorAll('a[href="#servicos"]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  scrollTo({ top: journey.offsetTop + alcance() * .92, behavior: 'smooth' });
}));

// Passo a passo (linha do tempo): o passo ativo marca os anteriores como concluídos
const passos = [...document.querySelectorAll('#passos li')];
const setPasso = n => passos.forEach((li, i) => {
  li.classList.toggle('done', i + 1 < n);
  li.classList.toggle('current', i + 1 === n);
});
passos.forEach((li, i) => li.addEventListener('mouseenter', () => setPasso(i + 1)));
passos.forEach((li, i) => li.addEventListener('click', () => setPasso(i + 1)));
setPasso(1);

// Rodapé: entrada escalonada ao aparecer na tela
const entra = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); entra.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.foot .enter').forEach(el => entra.observe(el));

// FAQ: abre uma pergunta por vez
document.querySelectorAll('.qa').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) document.querySelectorAll('.qa[open]').forEach(o => { if (o !== d) o.open = false; });
}));

// Revelar ao rolar (escalonado) + barra de progresso da página
const REVELAR = '#imoveis .eyebrow, #imoveis .group h2, #imoveis .prop, #imoveis .feature, #vender .wrap > .eyebrow, #vender .wrap > h2, #vender .sell-txt, #vender .form, .faq-head, .qa, .cta > *';
const revela = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); revela.unobserve(e.target); }
}), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll(REVELAR).forEach(el => {
  const irmaos = [...el.parentElement.children].filter(c => c.matches(REVELAR));
  el.style.setProperty('--i', Math.min(irmaos.indexOf(el), 5));
  el.classList.add('rv');
  revela.observe(el);
});
const barra = document.createElement('div');
barra.className = 'progress';
barra.setAttribute('aria-hidden', 'true');
document.body.prepend(barra);
const progresso = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  barra.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
};
addEventListener('scroll', progresso, { passive: true });
progresso();

/* contato: mensagem livre vai para o WhatsApp */
document.querySelectorAll('.cta-form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const msg = f.querySelector('input').value.trim();
  window.open(waLink(msg ? `Olá! Vim pelo site da Reobote Imóveis. ${msg}` : 'Olá! Vim pelo site da Reobote Imóveis e gostaria de atendimento.'), '_blank', 'noopener');
}));
