begin;

delete from public.notifications
where id = '0282eebd-35e6-45b5-80a3-bb2d222dc5a1'
  and title = 'Notifica??es por e-mail ativadas';

insert into public.notifications (
  organization_id,
  recipient_role,
  created_by,
  kind,
  title,
  message,
  entity_type
)
select
  organization.id,
  'admin_manager',
  null,
  'info',
  U&'Notifica\00E7\00F5es por e-mail ativadas',
  U&'O Portal Mada agora tamb\00E9m envia por e-mail as notifica\00E7\00F5es de oportunidades, aprova\00E7\00F5es, andamento, projetos, pagamentos e comiss\00F5es.',
  'portal'
from public.organizations organization
where organization.slug = 'mada-operacao'
  and not exists (
    select 1
    from public.notifications notification
    where notification.organization_id = organization.id
      and notification.title = U&'Notifica\00E7\00F5es por e-mail ativadas'
  );

commit;
