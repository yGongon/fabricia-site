# Site da Dra. Fabrícia Celestina — React

Projeto novo em React + Vite, com layout responsivo e conteúdo baseado no documento de especificação fornecido. Não depende de banco de dados ou serviços pagos para funcionar como landing page.

## Requisitos

- Node.js 20.19+ ou 22.12+ (recomendado Node 22 LTS)
- npm
- Internet na primeira instalação das dependências. O site pode usar imagens remotas se os arquivos locais ainda não estiverem disponíveis.

## Publicar no Netlify

O projeto já inclui `netlify.toml`, regras de fallback para a rota `/privacidade` e cabeçalhos HTTP de segurança em `public/_headers`.

1. Envie a pasta do projeto para um repositório Git (GitHub, GitLab ou Bitbucket).
2. No Netlify, escolha **Add new site → Import an existing project** e conecte o repositório.
3. Confira os parâmetros: **Build command:** `npm run build`; **Publish directory:** `dist`; **Node:** 22 (já declarado em `netlify.toml`).
4. Faça o deploy e teste a página inicial, `/privacidade`, os links de WhatsApp/Instagram e a versão mobile.
5. Configure o domínio próprio no Netlify, se houver, e confirme que HTTPS está ativo antes de divulgar o endereço.

O arquivo `public/_headers` aplica Content Security Policy, proteção contra MIME sniffing e enquadramento, política de referência, restrições de permissões e HSTS. A política CSP permite os recursos necessários a fontes do Google e embeds do Instagram. Se no futuro adicionar analytics, outros embeds ou novos domínios de imagens, revise a CSP deliberadamente — não remova a política inteira apenas para corrigir um recurso bloqueado.

## Executar localmente

1. Extraia o ZIP.
2. Abra a pasta `fabricia-site` no terminal.
3. Execute:

   ```bash
   npm install
   npm run assets:download
   npm run dev
   ```

4. Abra a URL local indicada pelo Vite, normalmente `http://localhost:5173`.
5. Para gerar a versão de produção: `npm run build`. Para testar o build: `npm run preview`.

O script de download tenta guardar as fotos existentes do site original em `public/images/`. Se o host bloquear o download, a página tenta carregar as mesmas imagens a partir da URL pública original. As fotos de pacientes ficam no projeto, mas não são exibidas por padrão.

## Configuração obrigatória antes de publicar

Edite `src/config.js`:

- `whatsappNumber`: número oficial no formato internacional, apenas dígitos (ex.: `55DDDNUMERO`). Enquanto estiver vazio, os botões mostram um aviso e não iniciam um agendamento falso.
- `city`, `address`, `appointmentFormat`, `officeHours`: preencha somente após confirmação.
- `rqe`: preencha apenas se confirmado.
- `googleReviewsUrl`, `googleRating`, `googleReviewCount`: use somente dados atuais e verificados.
- `privacyUrl`: rota `/privacidade` incluída; confirme se a política corresponde às práticas reais da clínica e revise-a com orientação jurídica, se necessário.
- `showPatientStories` e `showDoctorStory`: permanecem desativados por padrão. Antes de publicar qualquer imagem de evolução, confirme autorização específica, privacidade, contexto educativo e conformidade com as regras vigentes de publicidade médica. Não ative apenas para preencher espaço visual.

## Estrutura

- `src/main.jsx`: componentes e conteúdo das 11 seções.
- `src/styles.css`: identidade visual, responsividade e acessibilidade visual.
- `src/config.js`: informações profissionais, contatos, localização e referências das imagens.
- `scripts/download-assets.mjs`: download das imagens públicas do site original.
- `public/images/`: pasta onde as fotos podem ser armazenadas localmente.

## SEO e conteúdo

- `index.html` contém título, descrição, Open Graph, Twitter Card e dados estruturados básicos de `Physician`.
- Não foi configurada URL canônica nem cidade no SEO local, porque o domínio definitivo e a cidade de atendimento ainda precisam ser confirmados.
- Os textos da página foram reescritos para evitar reproduzir frases promocionais do site de referência.
- O aviso promocional que ficava acima do cabeçalho foi removido.

## Antes do lançamento

- Confirmar todas as informações profissionais e a descrição do protocolo com a médica.
- Validar o conteúdo de publicidade médica com o CRM-BA ou profissional jurídico especializado.
- Revisar a política de privacidade conforme os dados e serviços realmente usados.
- Testar links, WhatsApp, contraste, teclado, telas pequenas e performance.
- Adicionar analytics somente se necessário, com configuração de privacidade apropriada; não enviar dados de saúde a ferramentas de anúncios.

## Nota sobre imagens

As referências incluídas apontam para as imagens atualmente servidas pelo site público `brain-metabolism-blueprint.lovable.app`. O projeto não incorpora uma cópia binária dessas imagens no ZIP porque o ambiente de criação não conseguiu acessar o host para baixá-las. `npm run assets:download` tenta baixá-las no seu computador. Se o host deixar de disponibilizá-las, substitua os arquivos manualmente em `public/images/` e mantenha os nomes usados em `src/config.js`.
## Animações e movimento

A página usa animações discretas de entrada no hero, revelação progressiva das seções ao rolar, pequenos efeitos de hover em cards e botões e transições suaves nas perguntas frequentes. O movimento respeita a configuração de acessibilidade `prefers-reduced-motion`; em dispositivos móveis, os efeitos são mais contidos. As animações são feitas em CSS e com `IntersectionObserver`, sem adicionar dependências.

## Contato, avaliações, casos educativos e Instagram

- O WhatsApp informado foi configurado em `src/config.js` como `5575998081887`.
- O link das avaliações do Google fornecido foi configurado em `googleReviewsUrl`. A seção agora suporta cartões com comentários reais em `googleReviews` (autor, data, nota, texto e URL da fonte). O link compartilhado não permitiu importar o conteúdo dos comentários automaticamente; deixe a lista vazia até receber e revisar avaliações reais.
- A seção `#resultados` está preparada para uma galeria educativa. Por segurança, começa com espaços reservados e não publica automaticamente as imagens antigas. Para ativar, revise consentimento específico, anonimização, contexto educativo e regras vigentes do CFM/CRM-BA; depois preencha `resultImages` e altere `showPatientStories` somente após validação profissional.
- O perfil corporativo `https://www.instagram.com/dracelestina_fabricia/` foi configurado em `instagramProfileUrl`. A seção `#instagram` pode incorporar até cinco posts/Reels públicos via links em `instagramPostUrls`. A incorporação é manual; uma grade automática dos posts mais recentes ou mais engajados exige integração oficial com a API do Instagram e credenciais autorizadas.
- Cidade, endereço, horários e modalidade permanecem sem preenchimento porque não foram confirmados. Não publique até validar esses dados com a equipe.

## Segurança e verificação técnica

- O site é uma página estática: não há servidor de aplicação, banco de dados, credenciais ou formulário próprio no projeto.
- Cabeçalhos de segurança e fallback de SPA estão configurados para Netlify.
- Os links externos que abrem nova aba usam `rel="noopener noreferrer"`.
- Não foi possível concluir a instalação de dependências neste ambiente por falha/timeout de rede. Portanto, a compilação de produção e a auditoria de vulnerabilidades não foram verificadas aqui.
- Antes do primeiro lançamento, execute `npm install`, `npm run build` e `npm audit` localmente. Resolva vulnerabilidades de severidade alta/crítica e confirme que o build termina sem erros.
- A segurança da hospedagem não substitui revisão profissional de publicidade médica, consentimento de depoimentos, direitos de uso das imagens ou validação da política de privacidade.


## Observação importante sobre imagens

Os arquivos fotográficos não foram empacotados porque o ambiente de preparação não conseguiu baixá-los do host original. O componente tenta carregá-los a partir do endereço público original quando o arquivo local não existe. Antes de divulgar o site, confirme que as imagens carregam no deploy e que há autorização para reutilizá-las; de preferência, coloque os arquivos autorizados em `public/images/` usando os nomes definidos em `src/config.js`.
