import Block from '../tools/Block';

export default function render(query: string, block: Block) {
  const root = document.getElementById(query);
  root?.append(block.getContent()!)
  return root;
};
