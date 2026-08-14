/**
 * Marks short inline `code` spans that hold a single, space-free token
 * (CLI flags like `--minimal`, paths like `op-node/v1`) with a class the
 * stylesheet renders as `white-space: nowrap`.
 *
 * A hyphen or slash is a legal line-break opportunity, so a narrow table
 * column happily splits `--minimal` into `--` / `minimal`. No wrapping
 * property fixes that — `word-break: keep-all` and `hyphens: none` leave
 * hyphen breaks alone, and only `white-space: nowrap` suppresses them.
 * Applying nowrap to every inline code span would instead force whole
 * tables to scroll whenever a cell holds a long shell command, so the
 * class is limited to tokens short enough to fit any column.
 */

const MAX_LENGTH = 24;
const BREAKABLE = /[-/]/;

function textOf(node) {
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textOf).join('');
}

function addClass(node) {
  node.properties ??= {};
  const existing = node.properties.className;
  const classes = Array.isArray(existing) ? existing : existing ? [existing] : [];
  if (!classes.includes('bh-nowrap')) classes.push('bh-nowrap');
  node.properties.className = classes;
}

export default function rehypeNowrapInlineCode() {
  return (tree) => {
    const walk = (node, inPre) => {
      if (!Array.isArray(node.children)) return;
      for (const child of node.children) {
        if (child.type !== 'element') continue;
        if (child.tagName === 'code' && !inPre) {
          const text = textOf(child);
          if (text && text.length <= MAX_LENGTH && !/\s/.test(text) && BREAKABLE.test(text)) {
            addClass(child);
          }
        }
        walk(child, inPre || child.tagName === 'pre');
      }
    };
    walk(tree, false);
  };
}
