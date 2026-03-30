# IPIKK Website (Laravel)

Este repositório foi convertido de protótipo estático para uma base Laravel, preservando a identidade visual (HTML/CSS/JS e assets originais) e adicionando endpoints para funcionamento real.

## O que foi convertido

- As páginas públicas continuam em `public/pages/*.html`.
- As páginas administrativas continuam em `admin/pages/*.html`.
- O Laravel agora serve essas páginas por rotas:
  - `/` -> redireciona para `/pages/index.html`
  - `/pages/{pagina}.html`
  - `/admin/pages/{pagina}.html`
- Funcionalidades implementadas no backend:
  - Envio de contactos (`POST /api/contactos`)
  - Login da área restrita (`POST /api/login`)
  - Notícias dinâmicas com fallback local (`GET /api/noticias`)
  - Resumo admin (`GET /api/admin/resumo`)

## Estrutura principal

- `app/Http/Controllers/PageController.php` – renderização das páginas legadas.
- `app/Http/Controllers/ApiController.php` – endpoints funcionais.
- `app/Models/` – modelos `ContactMessage` e `NewsItem`.
- `database/migrations/` – estrutura de dados para contactos e notícias.
- `routes/web.php` – rotas web e API.

## Setup local

1. Instalar dependências:
   ```bash
   composer install
   ```
2. Configurar ambiente:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
3. Criar base SQLite (já incluída) e migrar:
   ```bash
   php artisan migrate
   ```
4. Arrancar servidor:
   ```bash
   php artisan serve
   ```

## Credenciais padrão da área restrita

- Email: `admin@ipikk.ao`
- Password: `admin123`

Pode alterar em `.env` com:

```env
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
```


## Integração completa Área Restrita + Base de Dados + Área Pública

Foram adicionados endpoints CRUD para sincronização completa:

- Notícias: `GET/POST/PUT/DELETE /api/admin/noticias` e `GET /api/public/noticias`
- Cursos e Áreas: `GET/POST/PUT/DELETE /api/admin/cursos`, `GET/POST/PUT/DELETE /api/admin/areas` e `GET /api/public/cursos`
- Galeria: `GET/POST/PUT/DELETE /api/admin/galeria` e `GET /api/public/galeria` (somente imagens publicadas)

Com isso, os dados cadastrados na área restrita passam a alimentar as páginas públicas automaticamente.
