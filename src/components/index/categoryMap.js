const categoryMap = [
  {
    className: 'advertising',
    zn_title: '廣告投放代理',
    en_title: 'Advertising\nAgency',
    content: `數位媒禮採購\n專業廣告投放\n行銷宣傳企劃\n成效執行分析`,
    sitemapUrl: process.env.NEXT_PUBLIC_ADVERTISING || '#'
  },
  {
    //! className should be changed
    className: 'event-planning',
    zn_title: '企業活動規劃',
    en_title: 'Event Planning',
    content: `論壇研討會\n創意行銷活動\n企業尾牙春酒\n會場佈置與策展`,
    sitemapUrl: process.env.NEXT_PUBLIC_EVENT_PLANNING || '#'
  },
  {
    className: 'social-media',
    zn_title: '社群口碑行銷',
    en_title: 'Social Media',
    content: `市場輿情分析\n社群平台代操\n宣傳議題規劃\nＫＯＬ網紅宣傳`,
    sitemapUrl: process.env.NEXT_PUBLIC_SOCIAL_MEDIA || '#'
  },
  {
    className: 'cis',
    zn_title: '數位形象設計',
    en_title: 'Digital Image\nDesign',
    content: `品牌視覺設計\nＲＷＤ網頁設計\n平面設計包裝\n行銷宣傳圖像`,
    sitemapUrl: process.env.NEXT_PUBLIC_CIS || '#'
  },
]

export default categoryMap