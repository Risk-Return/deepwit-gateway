import type { ReactNode } from 'react'
import { useState } from 'react'

export interface DocSection {
  id: string
  labelEn: string
  labelZh: string
}

export const SECTIONS: DocSection[] = [
  { id: 'overview', labelEn: 'Overview', labelZh: '概览' },
  { id: 'quick-start', labelEn: 'Quick Start', labelZh: '快速开始' },
  { id: 'api-keys', labelEn: 'API Keys & Auth', labelZh: 'API 密钥与认证' },
  { id: 'api-usage', labelEn: 'Chat API', labelZh: '对话 API' },
  { id: 'video-gen', labelEn: 'Video Generation', labelZh: '视频生成' },
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
    <ul className='space-y-1 list-disc pl-5 max-w-[65ch]'>
      {props.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function CollapsibleSub(props: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='border border-border/40 rounded-lg mt-6'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/30 rounded-lg transition-colors'
      >
        <span className='text-sm font-medium text-foreground'>
          {open ? '▾' : '▸'} {props.title}
        </span>
      </button>
      {open && (
        <div className='px-4 pb-4 border-t border-border/30'>
          <div className='space-y-4 pt-4'>
            {props.children}
          </div>
        </div>
      )}
    </div>
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

      <Section id='api-usage' title='Chat API'>
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
            <tr><Td><InlineCode>POST /v1/videos</InlineCode></Td><Td>Video generation (async)</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section id='video-gen' title='Video Generation'>
        <P className='mb-4'>
          The video generation API is <strong>asynchronous</strong>. Create a task first,
          then poll for status and download the result when complete.
        </P>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Endpoints</h3>
        <BulletList items={[
          `POST ${API_BASE}/videos — Create a video generation task`,
          `GET ${API_BASE}/videos/{'{video_id}'} — Query task status and progress`,
          `GET ${API_BASE}/videos/{'{video_id}'}/content — Download the generated video`,
        ]} />

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Request Fields</h3>
        <Table>
          <thead><tr><Th>Field</Th><Th>Required</Th><Th>Description</Th></tr></thead>
          <tbody>
            <tr><Td><InlineCode>prompt</InlineCode></Td><Td>Yes</Td><Td>Video generation prompt</Td></tr>
            <tr><Td><InlineCode>model</InlineCode></Td><Td>No</Td><Td>Model name, e.g. sora-2, sora-2-pro (default: sora-2)</Td></tr>
            <tr><Td><InlineCode>seconds</InlineCode></Td><Td>No</Td><Td>Duration: 4, 8, or 12 (default: 4)</Td></tr>
            <tr><Td><InlineCode>size</InlineCode></Td><Td>No</Td><Td>Resolution: 720x1280, 1280x720, 1024x1792, 1792x1024 (default: 720x1280)</Td></tr>
          </tbody>
        </Table>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>cURL Example</h3>
        <CodeBlock lang='bash'>{`curl ${API_BASE}/videos \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -F "model=sora-2" \\
  -F "prompt=A calico cat playing a piano on stage" \\
  -F "seconds=8" \\
  -F "size=1280x720"`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Node.js Example</h3>
        <CodeBlock lang='javascript'>{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-YOUR_API_KEY",
  baseURL: "${API_BASE}",
});

const video = await client.videos.create({
  model: "sora-2",
  prompt: "A calico cat playing a piano on stage",
  seconds: "8",
  size: "1280x720",
});

console.log(video);`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Task Status</h3>
        <Table>
          <thead><tr><Th>Status</Th><Th>Description</Th></tr></thead>
          <tbody>
            <tr><Td><InlineCode>queued</InlineCode></Td><Td>Task is queued, waiting to process</Td></tr>
            <tr><Td><InlineCode>in_progress</InlineCode></Td><Td>Video is being generated</Td></tr>
            <tr><Td><InlineCode>completed</InlineCode></Td><Td>Generation complete, ready to download</Td></tr>
            <tr><Td><InlineCode>failed</InlineCode></Td><Td>Generation failed, check error field</Td></tr>
          </tbody>
        </Table>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Download Video</h3>
        <P>Once status is <InlineCode>completed</InlineCode>, download the video file:</P>
        <CodeBlock lang='bash'>{`curl ${API_BASE}/videos/{video_id}/content \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  --output video.mp4`}</CodeBlock>
        <P className='mt-3'>
          Optional variants: add <InlineCode>?variant=thumbnail</InlineCode> for a thumbnail image.
        </P>

        <CollapsibleSub title='Seedance 2.0 (Doubao Video Generation)'>
          <P>
            Seedance 2.0 is a multimodal video generation model supporting text-to-video, image-to-video,
            video-to-video, and audio-driven generation. Use the unified gateway <InlineCode>POST /v1/videos</InlineCode> endpoint
            with Seedance-specific parameters below.
          </P>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>1. Create Video Task</h4>
          <P>
            Same as the general <InlineCode>POST {API_BASE}/videos</InlineCode> endpoint above.
            Key Seedance-specific parameters:
          </P>
          <Table>
            <thead><tr><Th>Field</Th><Th>Required</Th><Th>Description</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>model</InlineCode></Td><Td>Yes</Td><Td>Model ID, e.g. doubao-seedance-2-0-250828</Td></tr>
              <tr><Td><InlineCode>content</InlineCode></Td><Td>Yes</Td><Td>Array of text, image_url, video_url, audio_url objects</Td></tr>
              <tr><Td><InlineCode>resolution</InlineCode></Td><Td>No</Td><Td>480p, 720p, 1080p (default: 720p)</Td></tr>
              <tr><Td><InlineCode>ratio</InlineCode></Td><Td>No</Td><Td>16:9, 4:3, 1:1, 3:4, 9:16, 21:9, adaptive</Td></tr>
              <tr><Td><InlineCode>duration</InlineCode></Td><Td>No</Td><Td>4-15 seconds, or -1 for auto (default: 5)</Td></tr>
              <tr><Td><InlineCode>generate_audio</InlineCode></Td><Td>No</Td><Td>Generate synchronized audio (default: true)</Td></tr>
              <tr><Td><InlineCode>callback_url</InlineCode></Td><Td>No</Td><Td>Webhook URL for task status notifications</Td></tr>
              <tr><Td><InlineCode>priority</InlineCode></Td><Td>No</Td><Td>Queue priority 0-9 (default: 0)</Td></tr>
            </tbody>
          </Table>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>cURL - Text to Video</h4>
          <CodeBlock lang='bash'>{`curl ${API_BASE}/videos \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -F "model=doubao-seedance-2-0-250828" \\
  -F "prompt=A cat playing piano on stage" \\
  -F "resolution=720p" \\
  -F "ratio=16:9" \\
  -F "duration=5"`}</CodeBlock>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>cURL - Image + Text to Video</h4>
          <CodeBlock lang='bash'>{`curl ${API_BASE}/videos \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -F "model=doubao-seedance-2-0-250828" \\
  -F "prompt=Make this person dance" \\
  -F "input_reference=@photo.jpg" \\
  -F "resolution=720p" \\
  -F "duration=5" \\
  -F "generate_audio=true"`}</CodeBlock>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>2. Query / Callback Response</h4>
          <P>
            Use the gateway endpoint <InlineCode>GET {API_BASE}/videos/{'{video_id}'}</InlineCode> to query
            task status and <InlineCode>GET {API_BASE}/videos/{'{video_id}'}/content</InlineCode> to download.
            If <InlineCode>callback_url</InlineCode> was set on creation, the POST callback body
            has the same structure as the query response below.
          </P>
          <Table>
            <thead><tr><Th>Status</Th><Th>Description</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>queued</InlineCode></Td><Td>Task is in queue</Td></tr>
              <tr><Td><InlineCode>running</InlineCode></Td><Td>Video is being generated</Td></tr>
              <tr><Td><InlineCode>succeeded</InlineCode></Td><Td>Complete, video_url in content field</Td></tr>
              <tr><Td><InlineCode>failed</InlineCode></Td><Td>Failed, check error.code and error.message</Td></tr>
              <tr><Td><InlineCode>cancelled</InlineCode></Td><Td>Task was cancelled</Td></tr>
              <tr><Td><InlineCode>expired</InlineCode></Td><Td>Task timed out</Td></tr>
            </tbody>
          </Table>
          <P className='mt-2'>
            Recommended polling interval: 10-20 seconds. Video URL expires in 24 hours.
            If <InlineCode>callback_url</InlineCode> was set on creation, the POST callback body
            has the same structure as the query response.
          </P>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>Response Fields (on succeeded)</h4>
          <Table>
            <thead><tr><Th>Field</Th><Th>Description</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>id</InlineCode></Td><Td>Task ID</Td></tr>
              <tr><Td><InlineCode>model</InlineCode></Td><Td>Model name and version used</Td></tr>
              <tr><Td><InlineCode>status</InlineCode></Td><Td>Task status string</Td></tr>
              <tr><Td><InlineCode>content.video_url</InlineCode></Td><Td>Downloadable MP4 video URL (expires in 24h)</Td></tr>
              <tr><Td><InlineCode>content.last_frame_url</InlineCode></Td><Td>Last frame PNG image URL (only if return_last_frame=true was set)</Td></tr>
              <tr><Td><InlineCode>resolution</InlineCode></Td><Td>Output resolution (480p/720p/1080p)</Td></tr>
              <tr><Td><InlineCode>ratio</InlineCode></Td><Td>Output aspect ratio</Td></tr>
              <tr><Td><InlineCode>duration</InlineCode></Td><Td>Output duration in seconds</Td></tr>
              <tr><Td><InlineCode>seed</InlineCode></Td><Td>Seed value used for generation</Td></tr>
              <tr><Td><InlineCode>generate_audio</InlineCode></Td><Td>Whether audio was generated (Seedance 2.0/1.5)</Td></tr>
              <tr><Td><InlineCode>created_at</InlineCode></Td><Td>Unix timestamp (seconds) when task was created</Td></tr>
              <tr><Td><InlineCode>updated_at</InlineCode></Td><Td>Unix timestamp (seconds) of last status change</Td></tr>
              <tr><Td><InlineCode>error.code</InlineCode></Td><Td>Error code (on failed)</Td></tr>
              <tr><Td><InlineCode>error.message</InlineCode></Td><Td>Error description (on failed)</Td></tr>
            </tbody>
          </Table>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>Billing / Token Usage</h4>
          <P>
            The <InlineCode>usage</InlineCode> object in the response contains token data for cost calculation:
          </P>
          <Table>
            <thead><tr><Th>Field</Th><Th>Description</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>usage.completion_tokens</InlineCode></Td><Td>Tokens consumed for video generation (basis for billing)</Td></tr>
              <tr><Td><InlineCode>usage.total_tokens</InlineCode></Td><Td>Total tokens (= completion_tokens, input is always 0 for video)</Td></tr>
              <tr><Td><InlineCode>usage.tool_usage.web_search</InlineCode></Td><Td>Web search call count (0 if not used, only when tools enabled)</Td></tr>
            </tbody>
          </Table>
          <P className='mt-2'>
            Seedance 2.0 has a minimum token consumption floor — if actual tokens fall below the minimum,
            <InlineCode>completion_tokens</InlineCode> reports the minimum and billing is based on that floor.
          </P>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>cURL - Query Status</h4>
          <CodeBlock lang='bash'>{`curl ${API_BASE}/videos/{video_id} \\
  -H "Authorization: Bearer sk-YOUR_API_KEY"`}</CodeBlock>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>Response Example (succeeded)</h4>
          <CodeBlock lang='json'>{`{
  "id": "cgt-20250331175019-68d9t",
  "model": "doubao-seedance-2-0-250828",
  "status": "succeeded",
  "content": {
    "video_url": "https://.../output.mp4"
  },
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 5,
  "seed": 42,
  "generate_audio": true,
  "created_at": 1712697600,
  "updated_at": 1712697815,
  "usage": {
    "completion_tokens": 12500,
    "total_tokens": 12500
  }
}`}</CodeBlock>

        </CollapsibleSub>
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

      <Section id='api-usage' title='对话 API'>
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
            <tr><Td><InlineCode>POST /v1/videos</InlineCode></Td><Td>视频生成（异步）</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section id='video-gen' title='视频生成'>
        <P className='mb-4'>
          视频生成接口为 <strong>异步</strong> 模式。先创建任务，再轮询进度，完成后下载视频文件。
        </P>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>接口地址</h3>
        <BulletList items={[
          `POST ${API_BASE}/videos — 创建视频生成任务`,
          `GET ${API_BASE}/videos/{'{video_id}'} — 查询任务状态和进度`,
          `GET ${API_BASE}/videos/{'{video_id}'}/content — 下载生成的视频`,
        ]} />

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>请求参数</h3>
        <Table>
          <thead><tr><Th>参数</Th><Th>必填</Th><Th>说明</Th></tr></thead>
          <tbody>
            <tr><Td><InlineCode>prompt</InlineCode></Td><Td>是</Td><Td>视频生成提示词</Td></tr>
            <tr><Td><InlineCode>model</InlineCode></Td><Td>否</Td><Td>视频模型，常用 sora-2 或 sora-2-pro（默认 sora-2）</Td></tr>
            <tr><Td><InlineCode>seconds</InlineCode></Td><Td>否</Td><Td>视频时长：4、8、12（默认 4）</Td></tr>
            <tr><Td><InlineCode>size</InlineCode></Td><Td>否</Td><Td>分辨率：720x1280、1280x720、1024x1792、1792x1024（默认 720x1280）</Td></tr>
          </tbody>
        </Table>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>cURL 示例</h3>
        <CodeBlock lang='bash'>{`curl ${API_BASE}/videos \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -F "model=sora-2" \\
  -F "prompt=A calico cat playing a piano on stage" \\
  -F "seconds=8" \\
  -F "size=1280x720"`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>Node.js 示例</h3>
        <CodeBlock lang='javascript'>{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-YOUR_API_KEY",
  baseURL: "${API_BASE}",
});

const video = await client.videos.create({
  model: "sora-2",
  prompt: "A calico cat playing a piano on stage",
  seconds: "8",
  size: "1280x720",
});

console.log(video);`}</CodeBlock>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>任务状态</h3>
        <Table>
          <thead><tr><Th>状态</Th><Th>说明</Th></tr></thead>
          <tbody>
            <tr><Td><InlineCode>queued</InlineCode></Td><Td>任务排队中，等待处理</Td></tr>
            <tr><Td><InlineCode>in_progress</InlineCode></Td><Td>视频生成中</Td></tr>
            <tr><Td><InlineCode>completed</InlineCode></Td><Td>生成完成，可下载</Td></tr>
            <tr><Td><InlineCode>failed</InlineCode></Td><Td>生成失败，查看 error 字段</Td></tr>
          </tbody>
        </Table>

        <h3 className='text-base font-semibold text-foreground mt-6 mb-3'>下载视频</h3>
        <P>任务状态为 <InlineCode>completed</InlineCode> 后即可下载：</P>
        <CodeBlock lang='bash'>{`curl ${API_BASE}/videos/{video_id}/content \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  --output video.mp4`}</CodeBlock>
        <P className='mt-3'>
          可选参数：添加 <InlineCode>?variant=thumbnail</InlineCode> 可下载缩略图。
        </P>

        <CollapsibleSub title='Seedance 2.0（豆包视频生成）'>
          <P>
            Seedance 2.0 是火山引擎方舟平台的多模态视频生成模型，支持文生视频、图生视频、
            视频生视频和音频驱动生成。使用网关统一的 <InlineCode>POST /v1/videos</InlineCode> 端点，
            传入 Seedance 专属参数即可。
          </P>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>1. 创建视频任务</h4>
          <P>
            与上方通用视频接口 <InlineCode>POST {API_BASE}/videos</InlineCode> 相同，Seedance 专属参数如下：
          </P>
          <Table>
            <thead><tr><Th>参数</Th><Th>必填</Th><Th>说明</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>model</InlineCode></Td><Td>是</Td><Td>模型 ID，如 doubao-seedance-2-0-250828</Td></tr>
              <tr><Td><InlineCode>content</InlineCode></Td><Td>是</Td><Td>数组，可包含 text、image_url、video_url、audio_url 对象</Td></tr>
              <tr><Td><InlineCode>resolution</InlineCode></Td><Td>否</Td><Td>480p、720p、1080p（默认 720p）</Td></tr>
              <tr><Td><InlineCode>ratio</InlineCode></Td><Td>否</Td><Td>16:9、4:3、1:1、3:4、9:16、21:9、adaptive</Td></tr>
              <tr><Td><InlineCode>duration</InlineCode></Td><Td>否</Td><Td>4-15 秒，或设为 -1 自动选择（默认 5）</Td></tr>
              <tr><Td><InlineCode>generate_audio</InlineCode></Td><Td>否</Td><Td>是否生成同步音频（默认 true）</Td></tr>
              <tr><Td><InlineCode>callback_url</InlineCode></Td><Td>否</Td><Td>任务状态变化时的回调地址</Td></tr>
              <tr><Td><InlineCode>priority</InlineCode></Td><Td>否</Td><Td>队列优先级 0-9（默认 0，数值越大越优先）</Td></tr>
            </tbody>
          </Table>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>cURL - 文生视频</h4>
          <CodeBlock lang='bash'>{`curl ${API_BASE}/videos \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -F "model=doubao-seedance-2-0-250828" \\
  -F "prompt=一只猫在舞台上弹钢琴" \\
  -F "resolution=720p" \\
  -F "ratio=16:9" \\
  -F "duration=5"`}</CodeBlock>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>cURL - 图+文生视频</h4>
          <CodeBlock lang='bash'>{`curl ${API_BASE}/videos \\
  -H "Authorization: Bearer sk-YOUR_API_KEY" \\
  -F "model=doubao-seedance-2-0-250828" \\
  -F "prompt=让这个人跳起舞来" \\
  -F "input_reference=@photo.jpg" \\
  -F "resolution=720p" \\
  -F "duration=5" \\
  -F "generate_audio=true"`}</CodeBlock>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>2. 查询状态与回调响应</h4>
          <P>
            使用网关接口 <InlineCode>GET {API_BASE}/videos/{'{video_id}'}</InlineCode> 查询任务状态，
            <InlineCode>GET {API_BASE}/videos/{'{video_id}'}/content</InlineCode> 下载视频。
            若创建时配置了 <InlineCode>callback_url</InlineCode>，任务状态变化时方舟会向该地址发送 POST 请求，
            回调请求体结构与查询接口返回体一致。
          </P>
          <Table>
            <thead><tr><Th>状态</Th><Th>说明</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>queued</InlineCode></Td><Td>排队中</Td></tr>
              <tr><Td><InlineCode>running</InlineCode></Td><Td>生成中</Td></tr>
              <tr><Td><InlineCode>succeeded</InlineCode></Td><Td>完成，content 中包含 video_url</Td></tr>
              <tr><Td><InlineCode>failed</InlineCode></Td><Td>失败，查看 error.code 和 error.message</Td></tr>
              <tr><Td><InlineCode>cancelled</InlineCode></Td><Td>已取消</Td></tr>
              <tr><Td><InlineCode>expired</InlineCode></Td><Td>超时</Td></tr>
            </tbody>
          </Table>
          <P className='mt-2'>
            建议轮询间隔：10-20 秒。视频 URL 有效期为 24 小时，请及时下载。
            若创建时配置了 <InlineCode>callback_url</InlineCode>，任务状态变化时方舟会向该地址发送 POST 请求，
            回调请求体结构与查询接口返回体一致。
          </P>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>响应字段（succeeded 状态）</h4>
          <Table>
            <thead><tr><Th>字段</Th><Th>说明</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>id</InlineCode></Td><Td>任务 ID</Td></tr>
              <tr><Td><InlineCode>model</InlineCode></Td><Td>使用的模型名称和版本</Td></tr>
              <tr><Td><InlineCode>status</InlineCode></Td><Td>任务状态</Td></tr>
              <tr><Td><InlineCode>content.video_url</InlineCode></Td><Td>可下载的 MP4 视频 URL（24 小时有效）</Td></tr>
              <tr><Td><InlineCode>content.last_frame_url</InlineCode></Td><Td>尾帧图像 PNG URL（仅 return_last_frame=true 时有）</Td></tr>
              <tr><Td><InlineCode>resolution</InlineCode></Td><Td>输出分辨率（480p/720p/1080p）</Td></tr>
              <tr><Td><InlineCode>ratio</InlineCode></Td><Td>输出宽高比</Td></tr>
              <tr><Td><InlineCode>duration</InlineCode></Td><Td>输出视频时长（秒）</Td></tr>
              <tr><Td><InlineCode>seed</InlineCode></Td><Td>生成所使用的种子值</Td></tr>
              <tr><Td><InlineCode>generate_audio</InlineCode></Td><Td>是否生成了音频（Seedance 2.0/1.5）</Td></tr>
              <tr><Td><InlineCode>created_at</InlineCode></Td><Td>任务创建时间 Unix 时间戳（秒）</Td></tr>
              <tr><Td><InlineCode>updated_at</InlineCode></Td><Td>状态最后一次更新的 Unix 时间戳（秒）</Td></tr>
              <tr><Td><InlineCode>error.code</InlineCode></Td><Td>错误码（失败时返回）</Td></tr>
              <tr><Td><InlineCode>error.message</InlineCode></Td><Td>错误描述（失败时返回）</Td></tr>
            </tbody>
          </Table>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>计费 / Token 用量</h4>
          <P>
            响应中的 <InlineCode>usage</InlineCode> 对象包含计费所需的 Token 数据：
          </P>
          <Table>
            <thead><tr><Th>字段</Th><Th>说明</Th></tr></thead>
            <tbody>
              <tr><Td><InlineCode>usage.completion_tokens</InlineCode></Td><Td>视频生成消耗的 Token 数（计费依据）</Td></tr>
              <tr><Td><InlineCode>usage.total_tokens</InlineCode></Td><Td>总 Token 数（= completion_tokens，视频模型输入始终为 0）</Td></tr>
              <tr><Td><InlineCode>usage.tool_usage.web_search</InlineCode></Td><Td>联网搜索调用次数（未使用时为 0，仅开启 tools 时返回）</Td></tr>
            </tbody>
          </Table>
          <P className='mt-2'>
            Seedance 2.0 系列设有最低 Token 用量限制，若实际用量低于最低值，
            <InlineCode>completion_tokens</InlineCode> 将返回最低值并按此计费。
          </P>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>cURL - 查询状态</h4>
          <CodeBlock lang='bash'>{`curl ${API_BASE}/videos/{video_id} \\
  -H "Authorization: Bearer sk-YOUR_API_KEY"`}</CodeBlock>

          <h4 className='text-sm font-semibold text-foreground mt-4 mb-2'>响应示例（succeeded）</h4>
          <CodeBlock lang='json'>{`{
  "id": "cgt-20250331175019-68d9t",
  "model": "doubao-seedance-2-0-250828",
  "status": "succeeded",
  "content": {
    "video_url": "https://.../output.mp4"
  },
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 5,
  "seed": 42,
  "generate_audio": true,
  "created_at": 1712697600,
  "updated_at": 1712697815,
  "usage": {
    "completion_tokens": 12500,
    "total_tokens": 12500
  }
}`}</CodeBlock>

        </CollapsibleSub>
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
