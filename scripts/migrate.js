import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/app');
const PAGES = path.join(ROOT, 'src/pages');

function walk(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function replaceImports(content) {
  // Remove next/font imports and their usage
  content = content.replace(/import\s+\{\s*Geist(?:_Mono)?\s*\}\s+from\s+["']next\/font\/google["'];?\n?/g, '');
  content = content.replace(/const\s+geist\w+\s*=\s*Geist\([^)]*\);?\n?/g, '');
  content = content.replace(/const\s+geist\w+\s*=\s*Geist_Mono\([^)]*\);?\n?/g, '');

  // Replace next/script with script
  content = content.replace(/import\s+Script\s+from\s+["']next\/script["'];?\n?/g, '');
  content = content.replace(/<Script\s+([^>]*?)\/>/g, '<script $1/>');
  content = content.replace(/<Script\s+([^>]*?)>/g, '<script $1>');
  content = content.replace(/<\/Script>/g, '</script>');
  content = content.replace(/strategy=["']afterInteractive["']/g, '');
  content = content.replace(/dangerouslySetInnerHTML=\{\{\s*__html:\s*([^}]+)\s*\}\}/g, 'set:html={$1}');

  // Replace next/link with anchor
  content = content.replace(/import\s+Link\s+from\s+["']next\/link["'];?\n?/g, '');
  content = content.replace(/<Link\s+href=\{([^}]+)\}([^>]*)>/g, '<a href={$1}$2>');
  content = content.replace(/<Link\s+href=["']([^"']+)["']([^>]*)>/g, '<a href="$1"$2>');
  content = content.replace(/<\/Link>/g, '</a>');

  // Replace next/dynamic with normal imports
  content = content.replace(/import\s+dynamic\s+from\s+["']next\/dynamic["'];?\n?/g, '');
  content = content.replace(/const\s+(\w+)\s*=\s*dynamic\(\(\)\s*=>\s*import\(["']([^"']+)["']\),\s*\{\s*ssr:\s*false\s*\}\);?\n?/g, "import $1 from '$2';\n");
  content = content.replace(/const\s+(\w+)\s*=\s*dynamic\(\(\)\s*=>\s*import\(["']([^"']+)["']\)\);?\n?/g, "import $1 from '$2';\n");

  // Replace next/navigation usePathname with custom hook
  content = content.replace(/import\s+\{\s*usePathname\s*\}\s+from\s+["']next\/navigation["'];?\n?/g, "import { usePathname } from '@/hooks/usePathname';\n");

  // Replace next/image with img
  content = content.replace(/import\s+Image\s+from\s+["']next\/image["'];?\n?/g, '');

  return content;
}

function replacePageFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = replaceImports(content);
  // Remove metadata export
  content = content.replace(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{[\s\S]*?\};\n?/g, '');
  content = content.replace(/import\s+type\s*\{\s*Metadata\s*\}\s*from\s+["']next["'];?\n?/g, '');
  // Remove type import from next
  content = content.replace(/import\s+type\s*\{\s*Metadata(?:,\s*Viewport)?\s*\}\s*from\s+["']next["'];?\n?/g, '');
  fs.writeFileSync(filePath, content);
}

function createAstroPage(tsxPath) {
  const rel = path.relative(SRC, tsxPath);
  const dirName = path.dirname(rel);
  const baseName = path.basename(rel, '.tsx');
  const astroDir = path.join(PAGES, dirName);
  fs.mkdirSync(astroDir, { recursive: true });

  const importPath = rel.replace(/\\/g, '/').replace(/\.tsx$/, '');
  const rawName = baseName.replace(/[^a-zA-Z0-9]/g, '');
  const componentName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const astroFileName = baseName === 'page' ? 'index.astro' : `${baseName}.astro`;
  const astroPath = path.join(astroDir, astroFileName);

  const astroContent = `---
import ${componentName} from '@/app/${importPath}';
import Layout from '@/layouts/Layout.astro';
---

<Layout>
  <${componentName} client:load />
</Layout>
`;

  fs.writeFileSync(astroPath, astroContent);
}

function main() {
  // Transform all .tsx files in src/app
  walk(SRC, (filePath) => {
    if (filePath.endsWith('.tsx')) {
      replacePageFile(filePath);
    }
  });

  // Create Astro pages for each page.tsx
  walk(SRC, (filePath) => {
    if (filePath.endsWith('page.tsx')) {
      createAstroPage(filePath);
    }
  });

  console.log('Migration complete');
}

main();
