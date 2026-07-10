# Decisoes e suposicoes

## Decisoes desta rodada

- O portal foi criado dentro de `portal-mada/` para nao alterar o site
  institucional da raiz.
- A URL esperada no mesmo dominio e `/portal-mada/`, sem link no menu publico.
- A identidade visual segue as referencias fornecidas: sidebar fixa, fundo
  claro, cards brancos, marrom como acento principal, chips de status e layout
  administrativo leve.
- Supabase fica para depois, conforme solicitado. Nesta rodada o estado fica em
  `localStorage`.
- O MVP implementa regras de negocio no frontend apenas para testar fluxo. Na
  integracao real, elas devem ir para banco/backend.

## Suposicoes

- O papel `admin_manager` concentra comercial, financeiro e projetos.
- O papel `sdr` ve apenas oportunidades, contratos, comissoes e projetos
  originados por ela.
- A comissao padrao e 10% sobre o valor final aprovado do contrato.
- O pagamento inicial padrao de demo e 50% do contrato.
- A validade padrao da condicao aprovada e 30 dias.
- O template padrao de projeto e o fluxo de identidade visual descrito no PDF.

## Rotas/telas planejadas no MVP

- `dashboard`
- `approvals`
- `opportunities`
- `contracts`
- `payments`
- `commissions`
- `projects`
- `files`
- `services`
- `reports`
- `audit`
- `settings`

## Maquinas de estado usadas nesta rodada

Oportunidade:

- `draft`
- `pending_approval`
- `needs_information`
- `commercial_condition_approved`
- `awaiting_client_response`
- `client_requested_revision`
- `client_accepted`
- `client_declined`

Contrato:

- `draft_contract`
- `sent`
- `signed`

Pagamento:

- `pending`
- `confirmed`

Comissao:

- `available`
- `batched`
- `paid`

Projeto:

- `active`
- `completed`

Etapa:

- `locked`
- `ready`
- `in_progress`
- `awaiting_client`
- `completed`
