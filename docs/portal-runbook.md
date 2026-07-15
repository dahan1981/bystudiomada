# Runbook de Produção do Portal Mada

## Gate de deploy

1. Executar `npm ci`, `npm run ci` e `npm run test:e2e`.
2. Executar migrations pendentes e o teste de integração com `DATABASE_URL` de homologação/produção.
3. Gerar backup com `npm run portal:backup` e validar o checksum.
4. Conferir `/api/portal-health`: banco, Storage e migrations devem retornar `ok`.
5. Publicar na Vercel e repetir o health check.

## Variáveis e segredos

- Nunca salvar `DATABASE_URL` ou `SUPABASE_SECRET_KEY` no Git.
- A secret key é usada somente no servidor para convites, desativação e rotinas administrativas.
- Ao trocar a senha do banco, atualizar a variável sensível na Vercel e validar a conexão antes de encerrar a janela de manutenção.
- A conexão Pooler não deve ser usada para `ALTER ROLE` quando o Supabase recusar a operação; nesse caso, fazer a rotação pelo painel ou Management API e então atualizar `DATABASE_URL`.
- Rotacionar imediatamente qualquer segredo compartilhado por chat, e-mail ou arquivo não protegido.

## Backup

- RPO: até 24 horas. RTO alvo: 4 horas.
- Gerar backup lógico semanal e antes de toda migration.
- Guardar o JSON, checksum e a pasta `.storage` em armazenamento externo privado.
- O gate de produção deve usar `node tools/portal-backup.js --require-storage` com `SUPABASE_SECRET_KEY` disponível somente no ambiente seguro.
- Validar o conjunto com `node tools/portal-verify-backup.js <backup.json>`; o comando confere também os hashes dos objetos privados.

## Recuperação

1. Suspender gravações e registrar o horário do incidente.
2. Restaurar o backup do Postgres pelo painel Supabase ou `pg_restore` em projeto isolado.
3. Executar `npm run portal:migrate` para completar migrations posteriores ao backup.
4. Restaurar os objetos do bucket `portal-documents` preservando os caminhos originais.
5. Comparar oportunidades, contratos, pagamentos, comissões e arquivos com os totais do backup.
6. Validar Gestor e SDR antes de liberar novamente a Operação.

## Contas

1. O gestor envia o convite em Configurações.
2. A SDR define a própria senha pelo e-mail.
3. Desativar uma conta bloqueia perfil, memberships e Auth.
4. Recuperações são enviadas somente ao e-mail cadastrado.
5. O gestor deve configurar MFA pelo aplicativo autenticador.

## Piloto

- Um gestor e duas SDRs usam `Mada Treinamento` por cinco dias úteis.
- Não iniciar Operação se houver vazamento entre SDRs, conflito silencioso, backup inválido ou falha crítica.
- Após uma semana estável em Operação, convidar o restante da equipe.
