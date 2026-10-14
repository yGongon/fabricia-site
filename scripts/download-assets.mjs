import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = 'https://brain-metabolism-blueprint.lovable.app/__l5e/assets-v1/';
const assets = {
  'fabricia-retrato.jpg': '15343e05-2c8a-464c-84e1-8ee0bb23fbb9/fabricia-retrato.jpg',
  'fabricia-consultorio.jpg': 'adee7305-1023-4471-bd68-6880a6da2bb2/fabricia-consultorio.jpg',
  'resultado-dra-fabricia.png': '99e1c18f-fd0f-485e-8717-33fc4565960c/resultado-dra-fabricia.png',
  'resultado-01.png': '8d2b995c-91ef-4844-9ce1-f5f709ca597a/resultado-01.png',
  'resultado-02.png': 'a4549acc-0f82-47a8-a6e4-1c7e5d96d26d/resultado-02.png',
  'resultado-03.png': 'b883a7d9-b526-457d-8997-2656e8128550/resultado-03.png',
  'resultado-04.png': '4c4c9afc-2e7b-48f1-89d0-a5d5922d6289/resultado-04.png',
  'resultado-05.png': '53e057c9-8c22-4fae-84a7-b6f4f81485bf/resultado-05.png',
  'resultado-06.png': '9beadb4a-6854-4ad2-8ec0-ce908cb85773/resultado-06.png'
};
await mkdir('public/images', { recursive: true });
let failures = 0;
for (const [filename, path] of Object.entries(assets)) {
  try {
    const response = await fetch(base + path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    await writeFile(join('public/images', filename), bytes);
    console.log(`OK ${filename} (${Math.round(bytes.length / 1024)} KB)`);
  } catch (error) {
    failures++;
    console.warn(`Não foi possível baixar ${filename}: ${error.message}`);
  }
}
if (failures) console.warn(`\n${failures} arquivo(s) não foram baixados. O site tentará carregar as imagens originais online; veja README.md.`);
