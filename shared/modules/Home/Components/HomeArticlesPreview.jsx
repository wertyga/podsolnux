import { ArticlePreview, Section, ButtonLink } from 'shared/modules/common'

const TEXT = {
  readBlog: 'Читать блог',
}

const mockData = [
  {
    img: '/images/articlePreview.webp',
    title: 'How to Plan Your Vacation',
    author: 'Theresa Winston',
    time: new Date().toDateString(),
    topic: 'News',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.',
    href: '/',
    topicHref: '/',
  },
  {
    img: '/images/articlePreview.webp',
    title: 'How to Plan Your Vacation',
    author: 'Theresa Winston',
    time: new Date().toDateString(),
    topic: 'News',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.',
    href: '/',
    topicHref: '/',
  },
]

export const HomeArticlesPreview = () => (
  <Section
    className="blog"
    fluid
    h2="Our Blog"
    h5="See Our Daily News & Updates"
  >
    <div className="blog__content">
      {mockData.map(item => (
        <ArticlePreview
          key={item.title}
          className="col-sm-6 col-xs-12"
          {...item}
        />
      ))}
    </div>

    <ButtonLink
      href="/static/blog"
      title={TEXT.readBlog}
    />
  </Section>
)