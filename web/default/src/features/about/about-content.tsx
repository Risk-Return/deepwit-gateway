import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { PublicLayout } from '@/components/layout'

function Section(props: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={props.id} className='scroll-mt-20'>
      <h2 className='text-xl font-semibold tracking-tight mb-4 pb-2.5 border-b border-border/50'>
        {props.title}
      </h2>
      <div className='space-y-3 text-sm leading-relaxed text-muted-foreground'>
        {props.children}
      </div>
    </section>
  )
}

function P(props: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[65ch] ${props.className ?? ''}`}>{props.children}</p>
}

function BulletList(props: { items: string[] }) {
  return (
    <ul className='space-y-1.5 list-disc pl-5 max-w-[65ch]'>
      {props.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function AboutContent() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language?.startsWith('zh') ?? false
  const currentYear = new Date().getFullYear()

  return (
    <PublicLayout>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-10'>
          <h1 className='text-3xl font-bold tracking-tight'>
            {isZh ? '关于我们' : 'About'}
          </h1>
          <p className='text-muted-foreground mt-2 max-w-2xl'>
            {isZh
              ? '成都市云枢智元科技有限责任公司 · DeepWit AI Gateway'
              : 'Chengdu Yunshu Zhiyuan Technology Co., Ltd. · DeepWit AI Gateway'}
          </p>
        </div>

        <div className='space-y-12'>
          {/* Privacy & Data Processing */}
          <Section title={isZh ? '隐私与数据处理' : 'Privacy & Data Processing'}>
            <h3 className='text-base font-medium text-foreground mb-2'>
              {isZh ? '数据最小化原则' : 'Data Minimization'}
            </h3>
            <P>
              {isZh
                ? '本平台严格遵循数据最小化原则。LLM 模型的响应内容和用户查询不会存储在我们的服务器上。所有对话内容仅在请求处理期间暂存于内存中，请求完成后立即清除。'
                : 'This platform strictly follows the data minimization principle. LLM response content and user queries are not stored on our servers. All conversation content is temporarily held in memory only during request processing and cleared immediately upon completion.'}
            </P>

            <h3 className='text-base font-medium text-foreground mt-6 mb-2'>
              {isZh ? '审计日志' : 'Audit Logs'}
            </h3>
            <P>
              {isZh
                ? '仅保留必要的审计日志用于系统运维和合规要求，包含以下最小信息集：'
                : 'Only necessary audit logs are retained for system operations and compliance, containing the following minimal information:'}
            </P>
            <BulletList
              items={
                isZh
                  ? [
                      '请求时间戳',
                      '用户标识（不含个人身份信息）',
                      '模型名称',
                      'Token 消耗量',
                      '请求状态（成功/失败/错误类型）',
                    ]
                  : [
                      'Request timestamp',
                      'User identifier (without personally identifiable information)',
                      'Model name',
                      'Token consumption',
                      'Request status (success/failure/error type)',
                    ]
              }
            />
            <P className='mt-3'>
              {isZh
                ? '审计日志不包含对话内容、用户输入文本或模型输出文本。日志保留期限依据相关法律法规要求执行。'
                : 'Audit logs do not contain conversation content, user input text, or model output text. Log retention periods comply with applicable laws and regulations.'}
            </P>

            <h3 className='text-base font-medium text-foreground mt-6 mb-2'>
              {isZh ? '用户隐私保护' : 'User Privacy Protection'}
            </h3>
            <BulletList
              items={
                isZh
                  ? [
                      '所有 API 通信通过 HTTPS 加密传输',
                      '用户密码使用行业标准哈希算法存储，不可逆',
                      'API 密钥仅在创建时显示一次，后续不可查看，仅可重置',
                      '支持 IP 白名单限制，增强密钥安全性',
                      '不收集或存储非必要的个人信息',
                      '数据存储于境内服务器，符合数据本地化要求',
                    ]
                  : [
                      'All API communication is encrypted via HTTPS',
                      'User passwords are stored using industry-standard hashing algorithms (irreversible)',
                      'API keys are displayed only once at creation; they cannot be retrieved later, only reset',
                      'IP whitelist restrictions are supported for enhanced key security',
                      'No unnecessary personal information is collected or stored',
                      'Data is stored on servers within the jurisdiction of operation',
                    ]
              }
            />

            <h3 className='text-base font-medium text-foreground mt-6 mb-2'>
              {isZh ? '用户权利' : 'User Rights'}
            </h3>
            <BulletList
              items={
                isZh
                  ? [
                      '用户有权随时查看自己的使用记录和 Token 消耗',
                      '用户有权请求删除账户及相关数据',
                      '用户有权获取其个人数据的副本',
                      '如有隐私相关问题，请联系 info@tiangongtech.cn',
                    ]
                  : [
                      'Users may view their usage records and token consumption at any time',
                      'Users may request account deletion and associated data removal',
                      'Users may request a copy of their personal data',
                      'For privacy-related inquiries, contact info@tiangongtech.cn',
                    ]
              }
            />
          </Section>

          {/* China-specific legal statements */}
          {isZh && (
            <Section id='china-legal' title='法律声明'>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-base font-medium text-foreground mb-2'>1. 代币销售声明</h3>
                  <P>
                    本平台在中国境内不向个人销售或提供 Token（代币、积分、额度等虚拟计费单位）。
                    平台所涉及的任何 Token 或额度均为企业内部使用或面向企业合作伙伴的内部管理工具，
                    不构成面向公众的销售行为。
                  </P>
                </div>

                <div>
                  <h3 className='text-base font-medium text-foreground mb-2'>2. 平台用途声明</h3>
                  <P>
                    本平台提供的管理控制台仅供成都市云枢智元科技有限责任公司
                    （DeepWit）的合作伙伴用于企业内部 AI 接口的统一管理和调度，
                    不用于 Token 销售或转售目的。
                  </P>
                </div>

                <div>
                  <h3 className='text-base font-medium text-foreground mb-2'>3. 内部控制声明</h3>
                  <P>
                    本平台为成都市云枢智元科技有限责任公司（DeepWit）内部控制系统的一部分，
                    用于统一管理公司及合作方对 AI 模型接口的访问和使用。
                  </P>
                </div>

                <div>
                  <h3 className='text-base font-medium text-foreground mb-2'>4. 模型登记与使用声明</h3>
                  <P>
                    平台中配置的所有 AI 模型均已在中国境内完成相关登记和备案。
                    平台中可能包含的境外 AI 模型（包括但不限于 OpenAI、Anthropic、Google 等
                    提供的模型）仅用于技术对比和研究目的，不面向中国境内公众提供服务。
                  </P>
                </div>
              </div>
            </Section>
          )}

          {/* Contact */}
          <Section title={isZh ? '联系我们' : 'Contact'}>
            <div className='space-y-2'>
              <P>
                <strong>{isZh ? '公司名称：' : 'Company: '}</strong>
                {isZh
                  ? '成都市云枢智元科技有限责任公司'
                  : 'Chengdu Yunshu Zhiyuan Technology Co., Ltd.'}
              </P>
              <P>
                <strong>{isZh ? '地址：' : 'Address: '}</strong>
                {isZh
                  ? '四川省成都市高新区天府软件园 D 区'
                  : 'Tianfu Software Park, Zone D, High-Tech Zone, Chengdu, Sichuan, China'}
              </P>
              <P>
                <strong>{isZh ? '邮箱：' : 'Email: '}</strong>
                info@tiangongtech.cn
              </P>
              <P>
                <strong>ICP: </strong>
                <a
                  href='http://beian.miit.gov.cn/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  蜀ICP备2026000758号
                </a>
              </P>
            </div>
          </Section>

          {/* Footer attribution */}
          <div className='text-muted-foreground/40 text-xs pt-6 border-t border-border/30'>
            <P>
              &copy; {currentYear}{' '}
              {isZh
                ? '成都市云枢智元科技有限责任公司'
                : 'Chengdu Yunshu Zhiyuan Technology Co., Ltd.'}
              . {isZh ? '保留所有权利。' : 'All rights reserved.'}
            </P>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
