# Portal Comercial Mada

MVP estatico e interno do Portal Comercial Mada. Esta versao usa `localStorage`
para validar telas, fluxo e regras antes da integracao com Supabase.

## Como abrir

Abra `portal-mada/index.html` no navegador ou sirva a raiz do site e acesse:

```txt
/portal-mada/
```

O portal nao foi linkado no site publico. Ele fica acessivel apenas por URL
direta enquanto estiver nessa estrutura.

## Perfis de teste

- Gestor: `gestor@bystudiomada.com.br`
- SDR: `sdr@bystudiomada.com.br`
- Senha visual de demo: `portal-mada`

## O que ja funciona

- Login local por papel `admin_manager` ou `sdr`.
- Dashboard com indicadores comerciais, financeiros, comissoes e projetos.
- Cadastro de oportunidade em rascunho ou envio para aprovacao.
- Fila de aprovacao do gestor.
- Aprovar sem alteracao, aprovar com alteracoes, pedir informacao ou recusar.
- Condicao comercial aprovada fica versionada e bloqueada para contrato.
- SDR registra apresentacao, aceite, recusa ou pedido de revisao do cliente.
- Contrato nasce apenas de condicao aprovada vigente.
- Assinatura, pagamento inicial e validacao de venda.
- Venda validada gera uma unica comissao de 10%.
- A cada cinco comissoes disponiveis, cria lote de pagamento.
- Venda validada cria um unico projeto com template de etapas.
- Timeline e auditoria append-only no estado local.
- Registro de arquivos e interacoes internas de projeto.
- Relatorios com exportacao CSV.

## Limites desta rodada

- Nao ha Supabase Auth, Database, Storage ou RLS ainda.
- A seguranca real de backend ainda nao existe; as regras estao simuladas no
  frontend para validar produto e navegacao.
- Upload de arquivo e comprovante ficam como registros textuais.
- Dados mockados sao apenas para ambiente local e devem sair antes de producao.

## Proxima etapa recomendada

1. Criar projeto Supabase.
2. Implementar schema versionado com `organization_id`.
3. Aplicar RLS por papel e titularidade.
4. Migrar funcoes de dominio do `app.js` para endpoints/server actions.
5. Trocar `localStorage` por queries reais e Storage privado com URLs assinadas.
