# Protótipo Site IPIKK - Grupo 02

## Estrutura do Projecto

```
IPIKK-Site/
├── public/                     # Área Pública
│   ├── pages/                  # Todas as páginas HTML públicas
│   │   ├── index.html          # Página inicial
│   │   ├── oferta-formativa.html
│   │   ├── inscricoes.html
│   │   ├── contatos.html
│   │   └── ...
│   └── assets/
│       ├── css/                # Folhas de estilo da área pública
│       ├── js/                 # Scripts da área pública
│       ├── images/             # Imagens e fotos
│       │   └── doc/            # Documentos (.docx)
│       └── icons/              # Biblioteca FontAwesome (ESTILO-ICONS)
│           ├── css/
│           ├── svgs/
│           └── webfonts/
│
├── admin/                      # Área Restrita (Painel Admin)
│   ├── pages/                  # Todas as páginas HTML do admin
│   │   ├── admin-dashboard.html
│   │   ├── admin-noticias.html
│   │   ├── admin-inscricoes.html
│   │   └── ...
│   └── assets/
│       ├── css/                # Folhas de estilo do admin
│       └── js/                 # Scripts do admin
│
└── README.md                   # Este ficheiro
```

## Instruções de Uso

1. Abrir `public/pages/index.html` no browser para visualizar o site
2. Abrir `public/pages/area-restrita.html` para aceder ao login da área restrita
3. Após login, os painéis de administração estão em `admin/pages/`

## Tecnologias Utilizadas

- HTML5 / CSS3 / JavaScript (Vanilla)
- FontAwesome (ícones locais em `public/assets/icons/`)
