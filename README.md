# 🏥 HealthStop

**HealthStop** é um aplicativo móvel desenvolvido em **React Native com TypeScript**, voltado para a **marcação de consultas médicas**.  
Inspirado na ideia de “paradas de saúde”, o app oferece uma interface moderna e intuitiva para facilitar o agendamento de consultas, a navegação entre especialidades e o gerenciamento de pacientes e médicos.

---

## 📋 Funcionalidades

### ✅ Escopo Mínimo Obrigatório
- **Identidade visual do grupo**
  - Nome: **HealthStop**
  - Logotipo: Cruz vermelha em um prédio hospitalar estilizado.
  - Paleta de cores: Vermelho e branco (inspirada na área da saúde).
  - Tipografia: **Poppins**
- **Login e Cadastro**
  - Feedback visual de *loading*, *erro* e *sucesso*.
- **Tela de marcação de consultas**
  - Estados vazios, validação de campos e mensagens claras.
- **Calendário interativo**
  - Destaque para seleção de datas e horários disponíveis.
- **Imagens fixas**
  - Médicos e pacientes possuem imagens estáticas locais.
- **Arquitetura modular**
  - Estrutura em camadas: `components`, `hooks`, `styles`, `services`, `types`.
  - Uso de `styled-components` e tema centralizado (`theme.ts`).
  - Tipagem completa em TypeScript (sem `any` implícito).

---

🧱 Etapas do Desenvolvimento

Identidade visual – Nome, logo, cores e tipografia aplicadas no theme.ts.

UI Base – Cabeçalhos, botões, textos e acessibilidade.

Autenticação – Feedbacks visuais no login e cadastro.

Marcação de consultas – Validações, estados vazios e calendário funcional.

Imagens fixas – Substituição de URLs aleatórias por assets locais.

Revisão final – Testes, polimento visual e usabilidade.

