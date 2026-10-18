# Beach Soccer Manager — publicação no GitHub Pages

Pacote baseado na versão **Beach_Manager_Modulo_Homologacao.html**, incluindo o simulador de homologação e as melhorias anteriores.

## Antes da mudança: proteja sua carreira

1. Abra a versão atual do jogo e **exporte um backup JSON** das carreiras.
2. Guarde uma cópia fora do navegador (Downloads, Drive ou computador).
3. **Não apague** os arquivos ou dados da versão antiga até testar a importação.
4. O jogo publicado terá **outro endereço/origem**: os dados do `localStorage` **não passam automaticamente** de `file://` para `https://`.

## Publicar

1. Acesse https://github.com, crie um repositório **público** chamado `beach-manager` (ou escolha outro nome).
2. Envie **o conteúdo desta pasta**, preservando os nomes e a subpasta `icons/`. O arquivo `index.html` deve ficar na raiz do repositório, e não dentro de uma pasta extra.
3. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Aguarde a publicação. Abra `https://SEU-USUARIO.github.io/beach-manager/` (troque usuário e nome, se necessário).
5. No Chrome Android, abra o menu ⋮ e escolha **Instalar aplicativo** ou **Adicionar à tela inicial**.
6. Dentro do jogo hospedado, **importe o backup JSON**, salve e teste reabrindo a página.

## Atualizações futuras

- Substitua `index.html` pela nova versão, **preservando a linha de registro do service worker e as referências ao manifest**.
- Recomenda-se aumentar a variável `VERSION` em `service-worker.js` a cada versão publicada para limpar recursos antigos do cache.
- Faça backup antes de alterações grandes e confirme importação de JSON em uma versão de teste.
- Evite mudar a URL do repositório, pois os saves locais são associados à origem.

## Limitações e notas importantes

- **Não é hospedagem já publicada**: você precisa enviar os arquivos à sua conta GitHub.
- O PWA tem manifest, ícones e service worker; o **modo offline ainda é parcial** porque o HTML usa Tailwind CDN, Font Awesome, Google Fonts e imagens externas. Abra e navegue pelo jogo com internet antes de testar offline. Para offline garantido, essas dependências deverão ser incluídas localmente.
- O cache do navegador não equivale a backup de save; o armazenamento pode ser apagado pelo usuário, por políticas do dispositivo ou falta de espaço.
- Este pacote **não tem sincronização de saves entre celulares**. Cada navegador mantém os seus dados.
- Na hospedagem pública, qualquer pessoa com o link poderá abrir a página. Verifique os direitos de nomes/escudos antes de divulgação ampla.
- A PWA deve ser acessada via HTTPS (GitHub Pages já usa HTTPS).
- Se a instalação não aparecer no Android, use **Adicionar à tela inicial**, confirme o manifest publicado e teste novamente após abrir o site online.

## Estrutura

- `index.html`: jogo completo
- `manifest.webmanifest`: nome, cores e ícones do aplicativo
- `service-worker.js`: atualizações e cache
- `icons/icon-192.png` e `icons/icon-512.png`: ícones
