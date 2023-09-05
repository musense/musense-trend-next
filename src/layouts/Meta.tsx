import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { AppConfig } from '@utils/AppConfig'

type IMetaProps = {
  title: string
  description: string
  keywords: string
  canonical?: string
  mainImagePath?: string
}

const Meta = (props: IMetaProps) => {
  const router = useRouter()
  console.log('🚀 ~ file: Meta.tsx:15 ~ Meta ~ router:', router)

  const openGraphImage = [
    {
      url: props.mainImagePath || '',
      width: 1200,
      height: 550,
      alt: props.title,
    },
    {
      url: `${router.basePath}/fb_musense_image.jpg`,
      width: 1200,
      height: 628,
      alt: props.title,
    },
  ]

  return (
    <>
      <Head>
        <meta
          charSet='UTF-8'
          key='charset'
        />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
          key='viewport'
        />
        <link
          rel='apple-touch-icon'
          href={`${router.basePath}/apple-touch-icon.png`}
          key='apple'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`${router.basePath}/favicon-32x32.png`}
          key='icon32'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`${router.basePath}/favicon-16x16.png`}
          key='icon16'
        />
        <link
          rel='icon'
          href={`${router.basePath}/favicon.ico`}
          key='favicon'
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          type: 'website',
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          images: openGraphImage,
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: AppConfig.twitter_handle,
          site: AppConfig.site_name,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: props.keywords,
          },
        ]}
      />
    </>
  )
}

export { Meta }
