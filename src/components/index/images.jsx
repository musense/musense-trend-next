const bg = new Map([
    ['pc', import('@assets/index/bg.webp')],
    ['mobile', import('@assets/mobile/about/top_bg_decorate.webp')],
])

const welcome = new Map([
    ['pc', import('@assets/index/welcome.webp')],
    ['mobile', import('@assets/mobile/about/welcome.webp')],
])

const top = new Map([
    ['pc', import('@assets/index/topImage.webp')],
    ['mobile', import('@assets/mobile/about/topImage.webp')],
])

const musenseCanHelp = new Map([
    ['pc', import('@assets/index/musenseCanHelp.webp')],
    ['mobile', new Promise((resolve) => {
        resolve({
            default: import('@assets/mobile/about/musenseCanHelp_ch.webp'),
            after: import('@assets/mobile/about/musenseCanHelp_en.webp'),
        })
    })],
])

const reply = new Map([
    ['pc', import('@assets/index/reply.webp')],
    ['mobile', new Promise((resolve) => {
        resolve({
            default: import('@assets/mobile/about/reply.webp'),
            before: import('@assets/mobile/about/deco_orange.webp'),
            after: import('@assets/mobile/about/reply_sub.webp'),
        })
    })],
])

const triangleBox = new Map([
    ['pc', import('@assets/mobile/about/deco_blue.webp')],
    ['mobile', import('@assets/mobile/about/deco_blue.webp')],
])

const triangleRangeOrange_right = new Map([
    ['pc', import('@assets/index/triangleRangeOrange_right.webp')],
    ['mobile', import('@assets/index/triangleRangeOrange_right.webp')],
])

const triangleRangeOrange_left = new Map([
    ['pc', import('@assets/index/triangleRangeOrange_left.webp')],
    ['mobile', import('@assets/index/triangleRangeOrange_left.webp')],
])

const ourService = new Map([
    ['pc', import('@assets/index/ourService.webp')],
    ['mobile', import('@assets/mobile/service/ourService.webp')],
])

const contactUs = new Map([
    ['pc', import('@assets/index/contactUs_big.webp')],
    ['mobile', import('@assets/mobile/contact/contactUs.webp')],
])

const imageDown = new Map([
    ['pc', import('@assets/index/image_down.webp')],
    ['mobile', import('@assets/mobile/contact/image_down.webp')],
])

const triangleRangeOrange = new Map([
    ['pc', import('@assets/content/triangleRangeOrange.webp')],
    ['mobile', import('@assets/mobile/content/flower.webp')],
])

const marketingBanner = new Map([
    ['pc', import('@assets/marketing/banner.webp')],
    ['mobile', import('@assets/marketing/banner.webp')],
])

export {
    bg,
    welcome,
    top,
    musenseCanHelp,
    reply,
    triangleBox,
    triangleRangeOrange_right,
    triangleRangeOrange_left,
    ourService,
    contactUs,
    imageDown,
    triangleRangeOrange,
    marketingBanner
} 