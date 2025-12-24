export const GAME_DATA = {
  hero: {
    title: "Retrospectiva 2025",
    subtitle: "Ciclo 2 • Julho - Dezembro",
    description:
      "Um ano de entregas com foco em evolução do PDV, otimizações de performance e novas funcionalidades que impactam diretamente a experiência das REs.",
    stats: [
      { label: "Cards Entregues", value: "120", icon: "box" },
      { label: "Stories de Valor", value: "36", icon: "star" },
      { label: "Tickets Resolvidos", value: "48", icon: "check" }
    ],
    highlights: [
      "175 cards no Ciclo 1 (Jan-Jun)",
      "295 cards no ano (C1 + C2)",
      "68% de economia em infraestrutura após migração para Redis gerenciado"
    ]
  },
  cerimonias: {
    totalHours: 123,
    breakdown: [
      { label: "Dailies", hours: 26, color: "bg-indigo-600", icon: "calendar" },
      { label: "Weekly", hours: 39, color: "bg-emerald-500", icon: "bar" },
      { label: "Refinamentos", hours: 30, color: "bg-amber-500", icon: "target" },
      { label: "Outras", hours: 28, color: "bg-purple-600", icon: "clock" }
    ]
  },
  ciclo1: {
    title: "Ciclo 1/2025 - Habilitadores",
    subtitle: "175 Cards entregues (Janeiro - Junho) • Foco em estabilização e preparação",
    items: [
      {
        title: "O que aprendemos com o Motor Transacional?",
        desc: "Acompanhamos os impactos na operação causados pelo Motor Transacional e mapeamos oportunidades de melhoria que foram executadas no Ciclo 2."
      },
      {
        title: "Pix Parcelado pronto para a RE",
        desc: "Trabalhamos para estabilizar e concluir as entregas da funcionalidade de Pix Parcelado, garantindo a experiência de pagamento das REs."
      },
      {
        title: "Da crise às melhorias: Hyper Trend",
        desc: "A partir de uma sala de guerra para tratar a crise relacionada ao Hyper Trend, implementamos otimizações de índices e de banco de dados propostas pela equipe."
      },
      {
        title: "Parceria com Backoffice: Usuário Teste",
        desc: "Realizamos ajustes para estabilizar e viabilizar o funcionamento do usuário teste, atendendo à demanda do squad de Backoffice."
      },
      {
        title: "Consulta de Preço: o primeiro passo para modernizar o PDV",
        desc: "A demanda nos levou a desbravar e pavimentar a arquitetura de referência do VD+, apresentada no Ciclo 2 e que guiará nossa primeira entrega de modernização no Ciclo 1/2026."
      }
    ]
  },
  timeline: [
    {
      month: "Jul-Ago 2025",
      title: "💳 Parcelamento por SKU nos Canais Digitais",
      desc: "Habilitamos o parcelamento por SKU no App e Portal, permitindo condições especiais em datas sazonais. Expectativa de crescimento relevante de receita com a base elegível.",
      type: "biz",
      tags: ["App/Portal", "Receita"]
    },
    {
      month: "Ago 2025",
      title: "🚀 Piloto Pedido Expresso",
      desc: "Lançamento no PDV: a RE faz o pedido pelo App e retira na loja com conferência rápida. Uma nova experiência omnichannel para agilizar a jornada.",
      type: "biz",
      tags: ["PDV", "Omnichannel"]
    },
    {
      month: "Set 2025",
      title: "🔧 Evoluções do Pedido Expresso",
      desc: "Ajustes na experiência do operador: correções no leitor, melhorias no fluxo de conferência e criação de dashboard no Grafana para acompanhamento em tempo real.",
      type: "tech",
      tags: ["Melhorias", "Monitoramento"]
    },
    {
      month: "Out 2025",
      title: "☁️ Migração Azure Managed Redis",
      desc: "Concluímos a migração para Azure Managed Redis, alcançando 68% de economia em custos de infraestrutura. Além disso, ganhamos escalabilidade e reduzimos carga operacional.",
      type: "tech",
      tags: ["Saving", "Cloud"]
    },
    {
      month: "Out-Nov 2025",
      title: "🔐 Motor Transacional: Evoluções e Repasse",
      desc: "Implementamos parametrização de CD por Estado e inversão de lógica de plano de pagamento. Realizamos repasse para Backoffice (assume em Jan/2026), com documentação e sessões de capacitação.",
      type: "process",
      tags: ["Antifraude", "Knowledge Transfer"]
    },
    {
      month: "Nov 2025",
      title: "⚡ Performance do Parcelamento por SKU",
      desc: "Correção crítica que reduziu 85,6% dos erros de timeout. Casos críticos: 2min → 7s, garantindo finalização sem interrupções.",
      type: "tech",
      tags: ["Performance", "-85,6% erros"]
    },
    {
      month: "Nov 2025",
      title: "🔍 Validação Consulta de Preço nos ERs",
      desc: "Validação em ER piloto: a percepção das REs foi muito positiva para consulta rápida com tablet e leitor de código de barras.",
      type: "discovery",
      tags: ["Discovery", "Campo"]
    },
    {
      month: "Dez 2025",
      title: "🔐 Motor Transacional: Novas Capacidades",
      desc: "Nova fila dedicada para processamento isolado e rastreabilidade. Regra de envio ao Motor para pedidos com pagamento “a definir na retirada” em desenvolvimento (previsão Jan/2026).",
      type: "tech",
      tags: ["Antifraude", "Jan/2026"]
    },
    {
      month: "Dez 2025",
      title: "🎄 Entregas de Fechamento",
      desc: "Resolução de issues de segurança, migração de versão de servidor e otimizações de performance em consultas de banco.",
      type: "tech",
      tags: ["Segurança", "Infra", "Performance"]
    }
  ],
  entregas: [
    {
      title: "Pedido Expresso",
      subtitle: "17+ cards • Retirada rápida no ER para pedidos do App",
      stats: ["Status: Pendente conferência", "Dashboard Grafana", "Onboarding + UX"],
      bullets: [
        "Novo status “Pendente conferência” para diferenciar pedidos aguardando retirada.",
        "Monitoramento em tempo real com dashboard no Grafana.",
        "Onboarding/tutoriais para operadores do ER.",
        "Correções de UX: foco do leitor, scroll automático e mensagens de erro."
      ]
    },
    {
      title: "Migração Azure Managed Redis",
      subtitle: "Infraestrutura • 68% de economia em custos de servidor",
      stats: ["68% de economia", "Alta disponibilidade", "Menor carga operacional"],
      bullets: [
        "Migração do Azure Cache for Redis + Réplica DR para Azure Managed Redis.",
        "Alta disponibilidade e escalabilidade com menor carga operacional.",
        "Economia de 68% em custos de infraestrutura após a migração.",
        "Redução de custos sem perder estabilidade."
      ]
    },
    {
      title: "Motor Transacional",
      subtitle: "12 cards • Análise de Risco e Fraude",
      stats: ["CD por Estado", "Fila dedicada", "Repasse Backoffice"],
      bullets: [
        "Parametrização de CD por Estado e ajustes regionais.",
        "Inversão de lógica de plano de pagamento.",
        "Nova fila dedicada para controle de gargalos e rastreabilidade.",
        "Repasse com documentação e sessões de knowledge transfer (Jan/2026)."
      ]
    },
    {
      title: "Parcelamento por SKU (Performance)",
      subtitle: "Correção crítica • -85,6% de timeouts",
      stats: ["85,6% menos erros", "P99 −50%", "2min → 7s"],
      bullets: [
        "Identificação e correção de gargalo crítico de performance no checkout.",
        "Redução de 85,6% dos erros de timeout.",
        "Melhoria de P99 em ~50%.",
        "Casos críticos passaram de 2min para ~7s, reduzindo abandono."
      ]
    }
  ],
  metricas: {
    leadTime: { value: "41,03", unit: "dias", label: "Lead Time Média" },
    leadTimeP85: "70,07",
    cycleTime: { value: "19,70", unit: "dias", label: "Cycle Time Média" },
    cycleTimeP85: "32,30",
    previsibilidade: { value: "4,24", unit: "índice", label: "Previsibilidade (Meta < 5,6)" },
    throughput: { value: "6-10", unit: "itens/mês", label: "Throughput" },
    quality: [
      { val: "19", label: "Bugs" },
      { val: "53", label: "Incidentes" },
      { val: "48", label: "Tickets" },
      { val: "120", label: "Cards" }
    ]
  },
  impacto: {
    highlight: "Impacto Total do Ciclo 2",
    cards: [
      { val: 120, label: "Cards Entregues C2" },
      { val: 16, label: "Stories de Negócio" },
      { val: 20, label: "Tech Stories" },
      { val: 19, label: "Bugs Resolvidos" },
      { val: 48, label: "Tickets Atendidos" }
    ],
    tags: [
      "✨ Pedido Expresso em produção",
      "💰 68% de economia em infraestrutura",
      "⚡ Performance SKU otimizada",
      "🔐 Motor Transacional evoluído",
      "🎯 Previsibilidade dentro da meta"
    ]
  }
};
