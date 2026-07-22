from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "manual-funcionarios-portal-mada.pdf"

BLUE = colors.HexColor("#3157D5")
BLUE_DARK = colors.HexColor("#1F3FA8")
INK = colors.HexColor("#1C1C1C")
MUTED = colors.HexColor("#5F6368")
LINE = colors.HexColor("#D9D9D9")
SOFT = colors.HexColor("#F4F4F4")
GREEN = colors.HexColor("#E4F3E0")
RED = colors.HexColor("#F7D9D9")

FONT = "SegoeUI"
FONT_BOLD = "SegoeUI-Bold"
try:
    pdfmetrics.registerFont(TTFont(FONT, r"C:\Windows\Fonts\segoeui.ttf"))
    pdfmetrics.registerFont(TTFont(FONT_BOLD, r"C:\Windows\Fonts\segoeuib.ttf"))
except OSError:
    FONT, FONT_BOLD = "Helvetica", "Helvetica-Bold"


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverTitle", fontName=FONT_BOLD, fontSize=29, leading=34, textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle(name="CoverSub", fontName=FONT, fontSize=13, leading=19, textColor=MUTED, spaceAfter=24))
styles.add(ParagraphStyle(name="H1Mada", fontName=FONT_BOLD, fontSize=21, leading=26, textColor=INK, spaceBefore=4, spaceAfter=12))
styles.add(ParagraphStyle(name="H2Mada", fontName=FONT_BOLD, fontSize=14, leading=18, textColor=BLUE_DARK, spaceBefore=11, spaceAfter=7))
styles.add(ParagraphStyle(name="BodyMada", fontName=FONT, fontSize=10.2, leading=15, textColor=INK, spaceAfter=6))
styles.add(ParagraphStyle(name="SmallMada", fontName=FONT, fontSize=8.4, leading=12, textColor=MUTED))
styles.add(ParagraphStyle(name="BulletMada", fontName=FONT, fontSize=10, leading=15, leftIndent=14, firstLineIndent=-8, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name="CalloutTitle", fontName=FONT_BOLD, fontSize=10.5, leading=14, textColor=BLUE_DARK, spaceAfter=4))
styles.add(ParagraphStyle(name="TableHead", fontName=FONT_BOLD, fontSize=8.5, leading=11, textColor=colors.white, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="TableCell", fontName=FONT, fontSize=8.4, leading=11, textColor=INK))


def P(text, style="BodyMada"):
    return Paragraph(text, styles[style])


def bullets(items):
    return [P(f"• {item}", "BulletMada") for item in items]


def callout(title, text, fill=colors.HexColor("#E9EEFF")):
    table = Table([[P(title, "CalloutTitle")], [P(text, "BodyMada")]], colWidths=[166 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 0.7, BLUE),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def section(title, intro=None):
    flow = [P(title, "H1Mada")]
    if intro:
        flow.append(P(intro))
    return flow


def numbered(items):
    return [P(f"<b>{index}.</b> {text}", "BulletMada") for index, text in enumerate(items, 1)]


def footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8 * mm, "Portal Comercial Mada | Manual dos funcionários")
    canvas.drawRightString(width - 18 * mm, 8 * mm, f"{doc.page}")
    canvas.restoreState()


class MadaDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(filename, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=18 * mm, bottomMargin=21 * mm, title="Manual dos Funcionários - Portal Mada", author="Studio Mada")
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates([PageTemplate(id="mada", frames=frame, onPage=footer)])


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = MadaDocTemplate(str(OUTPUT))
    story = []

    # Cover
    story.extend([Spacer(1, 20 * mm), P("STUDIO MADA", "SmallMada"), Spacer(1, 12 * mm)])
    story.extend([
        P("Manual dos funcionários", "CoverTitle"),
        P("Portal Comercial Mada", "CoverSub"),
        callout("Para que serve este manual", "Este guia explica como trabalhar no Portal Mada no dia a dia, desde o cadastro de um lead até aprovação, contrato, pagamentos informativos, comissões e projetos."),
        Spacer(1, 16 * mm),
        P("Acesso oficial", "H2Mada"),
        P("https://www.bystudiomada.com.br/portal-mada/", "BodyMada"),
        P("Use sempre sua conta individual. O ambiente Treinamento serve para simulações; o ambiente Operação contém os registros reais.", "SmallMada"),
        PageBreak(),
    ])

    # Common access
    story += section("1. Acesso e navegação", "O Portal Mada é um ambiente interno. Cada funcionário recebe um convite no próprio e-mail e cria sua senha individual.")
    story += numbered([
        "Abra o convite recebido no e-mail e clique no botão para criar seu acesso.",
        "Defina uma senha exclusiva e, quando solicitado, retorne à tela de login.",
        "Entre com seu e-mail corporativo e sua senha.",
        "Confira o ambiente no menu lateral: Treinamento para testes e Operação para trabalho real.",
        "Use a foto do perfil para acessar Configurações, recuperação de senha e informações da conta.",
    ])
    story += [P("O menu lateral organiza o trabalho por função. Leads concentra o relacionamento comercial; Calendário de Reuniões concentra a agenda; Contratos, Pagamentos, Comissões e Arquivos registram as etapas posteriores da venda. O sistema deve ser usado como fonte comum de informação, evitando controles paralelos que não ficam disponíveis para o restante da equipe.")]
    story.append(callout("Atenção", "Nunca compartilhe sua senha, sessão ou código do autenticador. Se perder o acesso, use a recuperação de senha ou peça ao gestor para reenviar o acesso.", RED))
    story += section("2. Rotina da SDR", "A SDR trabalha principalmente nos Leads, Calendário de Reuniões, Contratos, Projetos, Comissões e Arquivos atribuídos a ela.")
    story += numbered([
        "Cadastre o lead com os dados básicos, origem, serviços de interesse, problema, necessidade, prazo e investimento.",
        "Salve como rascunho enquanto a conversa ainda estiver em qualificação.",
        "No próprio Lead, atualize a etapa do CRM, a próxima ação, a data e as observações. Tudo fica registrado na timeline.",
        "Quando os dados estiverem completos, use Pedir aprovação. A condição aparecerá para o gestor analisar.",
        "Responda pedidos de informação e acompanhe a decisão dentro do próprio Lead.",
    ])
    story += [P("Um Lead bem preenchido não é apenas um cadastro. Ele deve permitir que outra pessoa entenda quem é o cliente, o que ele vende, qual necessidade foi identificada, qual serviço está sendo considerado, qual foi o último contato e qual é o próximo passo. Atualize essas informações sempre que a conversa evoluir.")]
    story += section("3. Etapas do Lead", "Escolha a etapa que melhor representa o momento atual da conversa comercial.")
    stage_data = [[P("Etapa", "TableHead"), P("Quando usar", "TableHead")]] + [
        [P(stage, "TableCell"), P(description, "TableCell")] for stage, description in [
            ("Lead mapeado", "Registro criado e ainda em investigação."),
            ("Primeiro contato", "A primeira abordagem foi realizada."),
            ("Em follow-up", "Há uma conversa aberta e uma próxima ação definida."),
            ("Respondeu", "O lead respondeu e demonstrou abertura para continuar."),
            ("Reunião dos gestores com o cliente", "Reunião comercial foi marcada ou realizada."),
            ("Proposta enviada", "A proposta foi enviada ao cliente."),
            ("Em negociação", "Valor, escopo ou condição estão sendo negociados."),
            ("Aguardando contrato/pagamento", "O cliente está na etapa de formalização ou pagamento."),
            ("Venda concluída", "A venda foi validada pelo gestor."),
            ("Nutrição / Perdido", "Use quando o lead deve aguardar ou quando a oportunidade foi encerrada."),
        ]
    ]
    t = Table(stage_data, colWidths=[53 * mm, 113 * mm], repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), BLUE_DARK), ("GRID", (0, 0), (-1, -1), 0.35, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, SOFT]), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    story += [t]

    # Calendar and approval
    story += section("4. Calendário de Reuniões", "Use o calendário para marcar reuniões comerciais entre um lead e um ou mais gestores.")
    story += bullets([
        "Clique no dia ou no horário desejado para abrir a criação rápida da reunião.",
        "Informe marca, lead relacionado, início, término, gestores participantes, contexto e link da reunião.",
        "Ao escolher o início, o término é sugerido automaticamente uma hora depois; ele continua editável.",
        "O sistema mostra disponibilidade dos gestores e bloqueia conflitos de agenda.",
        "Depois de salvar, atualize o status para Agendada, Confirmada, Realizada, Reagendada, Cancelada ou Lead não compareceu.",
    ])
    story += [P("A reunião deve ser marcada com tempo suficiente para que os gestores se preparem. Se houver alteração de horário, edite a reunião existente em vez de criar outra. O histórico do Lead deve permanecer coerente com a agenda e com o retorno do cliente.")]
    story.append(callout("Boa prática", "Escreva no contexto o histórico da conversa, a necessidade do lead, os serviços de interesse e o objetivo da reunião. Isso evita que o gestor precise reconstruir o histórico."))
    story += section("5. Aprovação da condição", "A aprovação acontece dentro do Lead, na área de Ações.")
    story += numbered([
        "A SDR salva a condição completa e clica em Pedir aprovação.",
        "O gestor revisa valor, desconto, serviços, escopo e forma de pagamento.",
        "O gestor pode aprovar sem alteração, aprovar com alterações, solicitar informações ou recusar.",
        "Se houver pedido de informação, a SDR responde no Lead e envia novamente para análise.",
        "Uma condição recusada é arquivada e bloqueada para alteração.",
    ])
    story += section("6. Proposta, contrato e projeto", "Depois da aprovação, o gestor conduz a formalização e o planejamento.")
    story += bullets([
        "O gestor define quanto será cobrado, a forma de pagamento e anexa a proposta em PDF.",
        "O gestor informa o link do contrato. A SDR consegue consultar os documentos do Lead atribuído a ela.",
        "Após o aceite, o contrato e o pagamento inicial são registrados no portal.",
        "A aprovação cria o caminho para o Projeto, onde o gestor acompanha etapas, responsáveis, prazos e status.",
        "A SDR registra o envio da proposta, o retorno do cliente e as informações comerciais no Lead.",
    ])
    story += [P("A SDR deve manter o cliente informado pelos canais combinados, enquanto o Portal Mada funciona como registro interno da operação. O envio para a cliente ocorre pelos meios definidos pela equipe; o portal não substitui o contato comercial nem assina contratos automaticamente.")]

    # Finance and manager
    story += section("7. Pagamentos e comissões", "O Portal Mada não processa pagamentos. Todos os lançamentos financeiros são registros de pagamentos realizados fora da plataforma.")
    story += bullets([
        "Gestor: registre cada pagamento recebido do cliente em Pagamentos, incluindo contrato, valor, data, forma e comprovante quando necessário.",
        "Gestor: lance manualmente a comissão vinculada ao pagamento confirmado, escolhendo a SDR e a taxa de 5% ou 10%.",
        "Em pagamento 50/50, a taxa da SDR é 5% do valor total do contrato, distribuída nos ciclos correspondentes.",
        "Em pagamento à vista, a taxa é 10% do valor total do contrato em um único lançamento.",
        "SDR: consulte apenas suas comissões, ciclo de pagamento, total recebido, valores disponíveis e comprovantes.",
        "Comprovantes pagos pelo gestor ficam em Arquivos e aparecem nos relatórios.",
    ])
    story.append(callout("Importante", "Se o cliente pagar uma condição diferente da prevista, o gestor deve conferir receita contratada, valor efetivamente pago e comissão lançada. O sistema registra; a decisão final é do gestor.", RED))
    story += section("8. Rotina do gestor", "O gestor possui visão global e conduz as decisões de operação.")
    story += numbered([
        "Acompanhe o Dashboard e a tabela de desempenho por SDR.",
        "Revise aprovações pendentes e responda dentro do Lead.",
        "Conclua planejamento de proposta, contrato e projeto.",
        "Registre pagamentos externos e lance comissões manualmente.",
        "Use Relatórios para conferir receita contratada, recebida, comissões e comprovantes.",
        "Use Configurações para convidar, desativar ou recuperar o acesso de uma SDR.",
    ])
    story += [P("A visão global do gestor existe para facilitar a distribuição de trabalho e a conferência dos números. Ela não elimina a responsabilidade de manter cada Lead, contrato, pagamento e comissão com dados completos e atualizados.")]
    story += section("9. Regras de segurança e uso", "Estas regras protegem os dados comerciais e evitam retrabalho.")
    story += bullets([
        "Treinamento nunca deve receber dados reais de clientes.",
        "Use somente sua conta individual e não compartilhe senhas.",
        "Não processe cobranças ou transferências pelo portal.",
        "Envie apenas PDF, JPG ou PNG nos arquivos permitidos pelo sistema.",
        "Revise o destinatário antes de anexar proposta, contrato ou comprovante.",
        "Se uma informação estiver incorreta, corrija no Lead e deixe o contexto registrado na timeline.",
    ])
    story.append(callout("Em caso de problema", "Anote o Lead, contrato ou pagamento envolvido, faça uma captura de tela e informe o gestor. Não tente contornar permissões nem editar diretamente o banco de dados."))
    story += section("10. Checklist diário", "Antes de encerrar o dia, confira:")
    story += bullets([
        "Todos os Leads trabalhados têm etapa atualizada.",
        "Cada Lead ativo tem próxima ação e data quando necessário.",
        "Reuniões do dia estão com status atualizado.",
        "Pedidos de aprovação ou informação foram respondidos.",
        "Pagamentos, comissões e comprovantes foram encaminhados ao gestor quando aplicável.",
    ])
    story.extend([Spacer(1, 10 * mm), P("Versão do manual: 22 de julho de 2026", "SmallMada")])
    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
