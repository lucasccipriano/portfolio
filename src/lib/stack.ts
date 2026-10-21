/**
 * Item de uma StackList (cards que se empilham ao rolar, só no desktop):
 * sticky abaixo do header, com fundo opaco para cobrir o anterior.
 * A StackList ajusta o `top` para o bloco ficar centralizado na altura da tela.
 */
export const stackItemClass = "bg-white lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]";
