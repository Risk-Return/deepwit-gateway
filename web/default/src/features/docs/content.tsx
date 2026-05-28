import type { ReactNode } from 'react'

export interface DocSection {
  id: string
  labelEn: string
  labelZh: string
}

export const SECTIONS: DocSection[] = [
  { id: 'overview', labelEn: 'Overview', labelZh: '概览' },
  { id: 'quick-start', labelEn: 'Quick Start', labelZh: '快速开始' },
  { id: 'api-keys', labelEn: 'API Keys & Auth', labelZh: 'API 密钥与认证' },
  { id: 'api-usage', labelEn: 'OpenAI-Compatible API', labelZh: 'OpenAI 兼容 API' },
  { id: 'code-agents', labelEn: 'Code Agent Integration', labelZh: '代码助手集成' },
  { id: 'model-setup', labelEn: 'Model Setup (Admin)', labelZh: '模型配置（管理员）' },
  { id: 'faq', labelEn: 'FAQ', labelZh: '常见问题' },
]

const API_BASE = 'https://deepwitai.cn/llmapi/v1'
const CONSOLE_URL = 'https://deepwitai.cn/gateway/'

function Section(props: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={props.id} className='scroll-mt-20'>
      <h2 className='text-2xl font-semibold tracking-tight mb-6 pb-3 border-b border-border/50'>
        {props.title}
      </h2>
      <div className='space-y-4 text-sm leading-relaxed text-muted-foreground'>
        {props.children}
      </div>
    </section>
  )
}

function CodeBlock(props: { children: string; lang?: string }) {
  return (
    <pre className='bg-zinc-950 text-zinc-50 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed font-mono border border-border/20'>
      <code>{props.children}</code>
    </pre>
  )
}

function InlineCode(props: { children: string }) {
  return (
    <code className='bg-muted px-1.5 py-0.5 rounded text-[13px] font-mono text-foreground/80'>
      {props.children}
    </code>
  )
}

function P(props: { children: ReactNode }) {
  return <p className='max-w-[65ch]'>{props.children}</p>
}

function Table(props: { children: ReactNode }) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm border-collapse'>
        {props.children}
      </table>
    </div>
  )
}

function Th(props: { children: ReactNode }) {
  return (
    <th className='border-b border-border/60 px-3 py-2 text-left font-medium text-foreground/80'>
      {props.children}
    </th>
  )
}

function Td(props: { children: ReactNode }) {
  return (
    <td className='border-b border-border/30 px-3 py-2'>
      {props.children}
    </td>
  )
}

function Step(props: { num: number; title: string; children: ReactNode }) {
  return (
    <div className='flex gap-4'>
      <span className='flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5'>
        {props.num}
      </span>
      <div>
        <h4 className='text-sm font-medium text-foreground mb-1'>{props.title}</h4>
        <div className='text-muted-foreground space-y-2'>{props.children}</div>
      </div>
    </div>
  )
}

function BulletList(props: { items: string[] }) {
  return (
    <ul className='space-y-1 list-disc pl-5'>
      {props.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function DocsEn() {
  return (
    <div className='space-y-16'>
      <Section id='overview' title='Overview'>
        <P>
          DeepWit AI API Gateway is a unified API proxy for 40+ AI providers —
          OpenAI, Claude, Gemini, Azure, DeepSeek, and more. It provides a single
          OpenAI-compatible endpoint with built-in user management, quota control,
          rate limiting, and usage analytics.
        </P>
        <P>
          Think of it as your team's AI access layer: one API key, all models,
          full visibility and control.
        </P>
      </Section>

      <Section id='quick-start' title='Quick Start'>
        <div className='space-y-6'>
          <Step num={1} title='Register an account'>
            <P>
              Visit the <a href={CONSOLE_URL} className='text-primary hover:underline'>Gateway Console</a> and
              sign up. After registration you'll have access to the dashboard.
            </P>
          </Step>
          <Step num={2} title='Create an API key'>
            <P>
              Go to <strong>API Keys</strong> in the sidebar and click <strong>Create Key</strong>.
              Configure quota limits, model access, and optional expiration.
            </P>
          </Step>
          <Step num={3} title='Make your first API call'>
            <P>Use the base URL and your key to send requests:</P>
            <CodeBlock lang='bash'>{`curl ${API_BASE}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}</CodeBlock>
          </Step>
        </div>
      </Section>

      <Section id='api-keys' title='API Keys & Authentication'>
        <P>All API requests require authentication via the <InlineCode>Authorization</InlineCode> header:</P>
        <CodeBlock>{'Authorization: Bearer sk-YOUR_API_KEY'}</CodeBlock>
        <P className='mt-4'>
          Keys can be scoped to specific models, have quota limits, and optional IP restrictions —
          all configurable from the dashboard.
        </P>
      </Section>

      <Section id='api-usage' title='OpenAI-Compatible API'>
        <P className='mb-4'>
          The gateway is fully compatible with the OpenAI API format. Any OpenAI SDK works by changing
          the base URL to <InlineCode>{API_BASE}</InlineCode>.
        </P>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Python</h3>
        <CodeBlock lang='python'>{`from openai import OpenAI

client = OpenAI(
    base_url="${API_BASE}",
    api_key="sk-YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain quantum computing."}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Node.js</h3>
        <CodeBlock lang='javascript'>{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${API_BASE}",
  apiKey: "sk-YOUR_API_KEY"
});

const stream = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Tell me a story." }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Supported Endpoints</h3>
        <Table>
          <thead><tr><Th>Endpoint</Th><Th>Description</Th></tr></thead>
          <tbody>
            <tr><Td><InlineCode>POST /v1/chat/completions</InlineCode></Td><Td>Chat completion with streaming</Td></tr>
            <tr><Td><InlineCode>GET /v1/models</InlineCode></Td><Td>List available models</Td></tr>
            <tr><Td><InlineCode>POST /v1/embeddings</InlineCode></Td><Td>Text embeddings</Td></tr>
            <tr><Td><InlineCode>POST /v1/images/generations</InlineCode></Td><Td>Image generation</Td></tr>
            <tr><Td><InlineCode>POST /v1/audio/transcriptions</InlineCode></Td><Td>Audio transcription</Td></tr>
            <tr><Td><InlineCode>POST /v1/audio/speech</InlineCode></Td><Td>Text-to-speech</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section id='code-agents' title='Code Agent Integration'>
        <P className='mb-4'>
          All major AI coding assistants can connect to DeepWit AI Gateway.
          Configure with <InlineCode>{API_BASE}</InlineCode> as the endpoint.
        </P>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>General Setup</h3>
        <P>Most OpenAI-compatible tools accept these environment variables:</P>
        <CodeBlock>{`export OPENAI_API_KEY="sk-YOUR_API_KEY"
export OPENAI_BASE_URL="${API_BASE}"`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Claude Code</h3>
        <CodeBlock lang='bash'>{`claude config set openai_base_url "${API_BASE}"`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Cursor</h3>
        <BulletList items={[
          'Open Settings (Cmd+Shift+J / Ctrl+Shift+J)',
          'Go to Models tab',
          'Enable "Override OpenAI Base URL"',
          `Set base URL: ${API_BASE}`,
          'Enter your API key and verify',
        ]} />

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Windsurf</h3>
        <BulletList items={[
          'Open Windsurf settings',
          'Select "Custom" or "OpenAI Compatible" provider',
          `Set base URL: ${API_BASE}`,
          'Enter your API key',
        ]} />

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>OpenCode</h3>
        <CodeBlock lang='json'>{`{
  "providers": {
    "deepwit": {
      "base_url": "${API_BASE}",
      "api_key": "sk-YOUR_API_KEY",
      "models": ["gpt-4o", "claude-3-5-sonnet"]
    }
  }
}`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>OpenClaw</h3>
        <CodeBlock lang='yaml'>{`providers:
  deepwit:
    type: openai
    base_url: ${API_BASE}
    api_key: sk-YOUR_API_KEY`}</CodeBlock>
      </Section>

      <Section id='model-setup' title='Model Setup (Admin)'>
        <P>
          Administrators can add upstream AI providers (OpenAI, Claude, Gemini, etc.)
          via the <strong>Channels</strong> page in the dashboard.
        </P>
        <BulletList items={[
          'Select provider type and enter upstream credentials',
          'Map model names for transparent routing',
          'Set priority and weight for load balancing across channels',
          'Configure per-model pricing and rate limits',
          'Group models for easier key assignment',
        ]} />
      </Section>

      <Section id='faq' title='FAQ'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>How do I reset my API key?</h4>
            <P>Go to API Keys, click the key menu, and select Regenerate.</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>What happens when quota runs out?</h4>
            <P>Requests return a 429 error. Request a top-up from your administrator.</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>Does streaming work?</h4>
            <P>Yes. Set <InlineCode>"stream": true</InlineCode> in your request. All chat models support SSE streaming.</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>How do I check my usage?</h4>
            <P>Visit the Usage Logs page in the dashboard for request history and token consumption.</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>What models are available?</h4>
            <P>Call <InlineCode>GET /v1/models</InlineCode> with your API key to list accessible models.</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>Getting "Invalid token" errors?</h4>
            <BulletList items={[
              'Verify your key starts with sk- and is correct',
              'Check the key has not expired',
              'Ensure you have sufficient quota',
              'Format: Authorization: Bearer sk-YOUR_KEY',
            ]} />
          </div>
        </div>
      </Section>
    </div>
  )
}

export function DocsZh() {
  return (
    <div className='space-y-16'>
      <Section id='overview' title='概览'>
        <P>
          DeepWit AI API Gateway 是一个统一的 AI 接口网关，支持 40+ 上游 AI 服务商
          （OpenAI、Claude、Gemini、Azure、DeepSeek 等）。提供单一 OpenAI 兼容端点，
          内置用户管理、额度控制、速率限制和使用分析。
        </P>
        <P>一个 API 密钥，访问所有模型，拥有完全的可见性和控制力。</P>
      </Section>

      <Section id='quick-start' title='快速开始'>
        <div className='space-y-6'>
          <Step num={1} title='注册账号'>
            <P>
              访问 <a href={CONSOLE_URL} className='text-primary hover:underline'>网关控制台</a> 注册账号。
              注册后即可访问管理后台。
            </P>
          </Step>
          <Step num={2} title='创建 API 密钥'>
            <P>
              在侧边栏进入 <strong>API 密钥</strong> 页面，点击 <strong>创建密钥</strong>。
              可设置额度限制、模型访问范围、过期时间等。
            </P>
          </Step>
          <Step num={3} title='发起首次 API 调用'>
            <P>使用以下地址和你的密钥发送请求：</P>
            <CodeBlock lang='bash'>{`curl ${API_BASE}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "你好！"}]
  }'`}</CodeBlock>
          </Step>
        </div>
      </Section>

      <Section id='api-keys' title='API 密钥与认证'>
        <P>所有 API 请求需通过 <InlineCode>Authorization</InlineCode> 请求头进行认证：</P>
        <CodeBlock>{'Authorization: Bearer sk-YOUR_API_KEY'}</CodeBlock>
        <P className='mt-4'>
          密钥可限定模型范围、设置额度上限、配置 IP 白名单 —— 均在管理后台完成配置。
        </P>
      </Section>

      <Section id='api-usage' title='OpenAI 兼容 API'>
        <P className='mb-4'>
          网关完全兼容 OpenAI API 格式。任何 OpenAI SDK 只需将 base URL 改为
          <InlineCode>{API_BASE}</InlineCode> 即可使用。
        </P>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Python</h3>
        <CodeBlock lang='python'>{`from openai import OpenAI

client = OpenAI(
    base_url="${API_BASE}",
    api_key="sk-YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "解释量子计算"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Node.js</h3>
        <CodeBlock lang='javascript'>{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${API_BASE}",
  apiKey: "sk-YOUR_API_KEY"
});

const stream = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "讲个故事" }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>支持的端点</h3>
        <Table>
          <thead><tr><Th>端点</Th><Th>说明</Th></tr></thead>
          <tbody>
            <tr><Td><InlineCode>POST /v1/chat/completions</InlineCode></Td><Td>对话补全（支持流式）</Td></tr>
            <tr><Td><InlineCode>GET /v1/models</InlineCode></Td><Td>获取可用模型列表</Td></tr>
            <tr><Td><InlineCode>POST /v1/embeddings</InlineCode></Td><Td>文本嵌入</Td></tr>
            <tr><Td><InlineCode>POST /v1/images/generations</InlineCode></Td><Td>图片生成</Td></tr>
            <tr><Td><InlineCode>POST /v1/audio/transcriptions</InlineCode></Td><Td>语音转文字</Td></tr>
            <tr><Td><InlineCode>POST /v1/audio/speech</InlineCode></Td><Td>文字转语音</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section id='code-agents' title='代码助手集成'>
        <P className='mb-4'>
          所有主流 AI 编程助手均可接入 DeepWit AI 网关。
          统一使用 <InlineCode>{API_BASE}</InlineCode> 作为端点地址。
        </P>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>通用配置</h3>
        <P>大多数 OpenAI 兼容工具支持以下环境变量：</P>
        <CodeBlock>{`export OPENAI_API_KEY="sk-YOUR_API_KEY"
export OPENAI_BASE_URL="${API_BASE}"`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Claude Code</h3>
        <CodeBlock lang='bash'>{`claude config set openai_base_url "${API_BASE}"`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Cursor</h3>
        <BulletList items={[
          '打开设置（Cmd+Shift+J / Ctrl+Shift+J）',
          '进入 Models 标签页',
          '开启 "Override OpenAI Base URL"',
          `设置 base URL: ${API_BASE}`,
          '输入 API 密钥并验证',
        ]} />

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Windsurf</h3>
        <BulletList items={[
          '打开 Windsurf 设置',
          '选择 "Custom" 或 "OpenAI Compatible" 提供商',
          `设置 base URL: ${API_BASE}`,
          '输入 API 密钥',
        ]} />

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>OpenCode</h3>
        <CodeBlock lang='json'>{`{
  "providers": {
    "deepwit": {
      "base_url": "${API_BASE}",
      "api_key": "sk-YOUR_API_KEY",
      "models": ["gpt-4o", "claude-3-5-sonnet"]
    }
  }
}`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>OpenClaw</h3>
        <CodeBlock lang='yaml'>{`providers:
  deepwit:
    type: openai
    base_url: ${API_BASE}
    api_key: sk-YOUR_API_KEY`}</CodeBlock>
      </Section>

      <Section id='model-setup' title='模型配置（管理员）'>
        <P>
          管理员可在后台 <strong>渠道</strong> 页面添加上游 AI 服务商
          （OpenAI、Claude、Gemini 等）。
        </P>
        <BulletList items={[
          '选择服务商类型并填写上游凭证',
          '映射模型名称以实现透明路由',
          '设置优先级和权重以在多渠道间负载均衡',
          '配置各模型的定价和速率限制',
          '将模型分组便于密钥分配',
        ]} />
      </Section>

      <Section id='faq' title='常见问题'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>如何重置 API 密钥？</h4>
            <P>进入 API 密钥页面，点击密钥菜单，选择重新生成。</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>额度用完会怎样？</h4>
            <P>请求将返回 429 错误。请联系管理员申请充值。</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>支持流式输出吗？</h4>
            <P>支持。在请求中设置 <InlineCode>"stream": true</InlineCode> 即可。所有对话模型均支持 SSE 流式输出。</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>如何查看使用量？</h4>
            <P>访问后台的使用日志页面查看请求历史和 Token 消耗。</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>有哪些模型可用？</h4>
            <P>使用 API 密钥调用 <InlineCode>GET /v1/models</InlineCode> 获取可用模型列表。</P>
          </div>
          <div>
            <h4 className='text-sm font-medium text-foreground mb-1'>提示 "Invalid token" 错误？</h4>
            <BulletList items={[
              '确认密钥以 sk- 开头且内容正确',
              '检查密钥是否已过期',
              '确保额度充足',
              '格式：Authorization: Bearer sk-YOUR_KEY',
            ]} />
          </div>
        </div>
      </Section>
    </div>
  )
}
