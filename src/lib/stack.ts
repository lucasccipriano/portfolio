/**
 * Item de uma StackList (cards que se empilham ao rolar, só no desktop):
 * sticky perto do topo da tela, com fundo opaco para cobrir o anterior.
 * A StackList ajusta o `top` para o bloco ficar centralizado na altura da tela.
 */
// lg:pt-4 (16px): faixa branca acima do conteúdo, para o card que sobe cobrir o anterior com respiro.
// Quem usa compensa no espaçamento da lista (gap/margem 16px menores no lg), para o layout não mudar.
export const stackItemClass = "bg-white lg:sticky lg:top-6 lg:pt-4";
