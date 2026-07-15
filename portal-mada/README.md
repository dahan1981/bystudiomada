# Portal Comercial Mada

CRM interno da Studio Mada, publicado em `/portal-mada/`. O portal usa Supabase Auth, Postgres com RLS e Storage privado. O site institucional não possui link público para esta rota, mas o acesso depende sempre de autenticação individual.

## Ambientes

- `Mada Treinamento`: simulações do piloto.
- `Mada Operação`: registros comerciais reais.

Os ambientes usam o mesmo projeto Supabase, mas todos os registros possuem `organization_id` e políticas de isolamento.

## Configuração obrigatória na Vercel

Consulte `.env.example`. `SUPABASE_SECRET_KEY` e `DATABASE_URL` são segredos exclusivamente de servidor. A publishable key pode ser usada no cliente, mas o portal atual acessa o Supabase por APIs próprias.

## Comandos

```powershell
npm ci
npm run ci
npm run test:e2e
npm run portal:migrate
npm run portal:backup
node tools/portal-verify-backup.js <arquivo.json>
```

Migrations ficam em `supabase/migrations/` e são registradas em `private.portal_migrations`. Nunca altere uma migration já aplicada; crie uma nova.

## Segurança

- Contas são criadas por convite e cada funcionário define a própria senha.
- Gestor possui visão global da organização ativa.
- SDR acessa somente registros atribuídos a ela.
- O gestor usa MFA TOTP antes da liberação geral.
- Propostas e comprovantes ficam no bucket privado `portal-documents`.
- Pagamentos são somente registros informativos; o portal não processa transações.

Procedimentos de produção estão em `docs/portal-runbook.md` e o manual da equipe em `docs/portal-user-guide.md`.
