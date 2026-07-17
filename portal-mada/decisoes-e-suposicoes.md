# Decisões do Portal Mada

- Perfis iniciais: `admin_manager` e `sdr`.
- Ambientes lógicos: `Mada Operação` e `Mada Treinamento` no mesmo Supabase.
- Autenticação: Supabase Auth com convite, recuperação e MFA para gestores.
- Dados: tabelas relacionais com UUID, `organization_id`, versão e auditoria.
- Arquivos: Storage privado, PDF/JPG/PNG, até 10 MB, URLs assinadas por cinco minutos.
- Concorrência: controle por versão em cada registro; nenhuma gravação global de JSON.
- Financeiro: pagamentos apenas informativos e comissões lançadas manualmente pelo gestor.
- Comissão: opções de 5% ou 10%; divergências são alertadas, mas a decisão permanece com o gestor.
- Deploy definitivo: `https://bystudiomada.vercel.app/portal-mada/`.
- Escopo inicial: financeiro e projetos continuam sob o perfil Gestor.
