# DGBox Site (Template Profissional + SEO)

Este template é um site **estático** (HTML/CSS/JS) já pronto para:
- SEO avançado (Schema LocalBusiness/MovingCompany + FAQPage, canonical, OpenGraph)
- Arquitetura por **Região → Cidade** (links internos prontos)
- Botões de **WhatsApp** e **Chamada** (sem formulário)

## Configurações rápidas (antes de publicar)
1. Troque o domínio placeholder `https://www.seudominio.pt` no ficheiro `sitemap.xml` e (opcional) nos canonicals dentro das páginas.
   - Para automatizar depois, pode-se migrar para um gerador (Next.js / Astro / WordPress).
2. Ajuste redes sociais no JSON-LD (nas páginas) quando tiver os links oficiais.

## Publicação
Pode publicar em qualquer host estático:
- Netlify / Vercel / Cloudflare Pages
- cPanel (public_html)
- GitHub Pages

## Estrutura de SEO Local
- `/locais/portugal/` (hub)
- `/locais/<regiao>/` (hubs: lisboa, porto, norte, centro, alentejo, algarve, madeira, acores)
- `/locais/<regiao>/<cidade>/` (páginas locais)

## Contato
Telefone principal: +351939560546
WhatsApp: https://wa.me/351939560546