import React from 'react';
import {
    Rocket, Calendar, CheckCircle, Zap, Trophy,
    BarChart2, Shield, Database, Target
} from 'lucide-react';

export const RETROSPECTIVA_GAMIFICADA_MOBILE_DATA = {
    intro: {
        title: "Retrospectiva 2025",
        subtitle: "Ciclo 2 • Julho - Dezembro",
        briefing: "Um ano de entregas com foco em evolução do PDV, otimizações de performance e novas funcionalidades que impactam diretamente a experiência das REs."
    },
    levels: [
        {
            id: 'level-1',
            type: 'habilitadores',
            title: "Ciclo 1/2025 - Habilitadores",
            items: [
                { title: "O que aprendemos com o Motor Transacional?", desc: "Acompanhamos os impactos na operação causados pelo Motor Transacional e mapeamos oportunidades de melhoria que foram executadas no Ciclo 2." },
                { title: "Pix Parcelado pronto para a RE", desc: "Trabalhamos para estabilizar e concluir as entregas da funcionalidade de Pix Parcelado, garantindo a experiência de pagamento das REs." },
                { title: "Da crise às melhorias: Hyper Trend", desc: "A partir de uma sala de guerra para tratar a crise relacionada ao Hyper Trend, implementamos otimizações de índices e de banco de dados propostas pela equipe." },
                { title: "Parceria com Backoffice: Usuário Teste", desc: "Realizamos ajustes para estabilizar e viabilizar o funcionamento do usuário teste, atendendo à demanda do squad de Backoffice." },
                { title: "Consulta de Preço: o primeiro passo para modernizar o PDV", desc: "A demanda nos levou a desbravar e pavimentar a arquitetura de referência do VD+, apresentada no Ciclo 2 e que guiará nossa primeira entrega de modernização no Ciclo 1/2026." }
            ]
        },
        {
            id: 'level-2',
            type: 'timeline',
            title: "Linha do Tempo - Ciclo 2",
            items: [
                { month: "Jul-Ago", title: "💳 Parcelamento por SKU", tag: "App/Portal", desc: "Habilitamos o parcelamento por SKU no App e Portal. Expectativa de crescimento relevante de receita." },
                { month: "Ago", title: "🚀 Piloto Pedido Expresso", tag: "PDV", desc: "Lançamento no PDV: a RE faz o pedido pelo App e retira na loja com conferência rápida." },
                { month: "Set", title: "🔧 Evoluções do Pedido Expresso", tag: "Melhorias", desc: "Ajustes na experiência do operador: correções no leitor, melhorias no fluxo de conferência e dashboards." },
                { month: "Out", title: "☁️ Migração Azure Managed Redis", tag: "Saving", desc: "68% de economia em custos de infraestrutura. Mais escalabilidade e menos carga operacional." },
                { month: "Out-Nov", title: "🔐 Motor Transacional: Evoluções", tag: "Antifraude", desc: "Parametrização de CD por Estado e repasse para Backoffice (documentação e capacitação)." },
                { month: "Nov", title: "⚡ Performance -85,6% timeouts", tag: "Performance", desc: "Correção crítica no Parcelamento por SKU. Redução de 2min para 7s em casos críticos." },
                { month: "Nov", title: "🔍 Validação Consulta de Preço", tag: "Discovery", desc: "Validação em ER piloto positiva para consulta rápida com tablet e leitor de código de barras." },
                { month: "Dez", title: "🔐 Motor Transacional: Capacidades", tag: "Tech", desc: "Nova fila dedicada e rastreabilidade. Regra para pagamentos 'a definir' em desenvolvimento." },
                { month: "Dez", title: "🎄 Entregas de Fechamento", tag: "Infra", desc: "Resolução de issues de segurança, migração de servidor e otimizações de performance." }
            ]
        },
        {
            id: 'level-3',
            type: 'wins',
            title: "Principais Entregas",
            items: [
                { title: "Pedido Expresso", icon: <Rocket />, stat: "Pendente conf.", desc: "17+ cards • Retirada rápida no ER para pedidos do App" },
                { title: "Azure Managed Redis", icon: <Database />, stat: "68% Saving", desc: "Infraestrutura • Alta disponibilidade e menor carga operacional" },
                { title: "Motor Transacional", icon: <Shield />, stat: "Antifraude", desc: "12 cards • Análise de Risco, Fila dedicada e Repasse" },
                { title: "Parcelamento por SKU", icon: <Zap />, stat: "-85,6% Erros", desc: "Performance • Correção crítica de timeouts (2min -> 7s)" }
            ]
        },
        {
            id: 'level-final',
            type: 'boss',
            title: "Impacto Total 2025",
            stats: [
                { label: "Lead Time", val: "41d" },
                { label: "Cycle Time", val: "20d" },
                { label: "Bugs", val: "19" },
                { label: "Cards", val: "120" }
            ]
        }
    ]
};
