import { Slider } from 'shared/modules/common/Slider'
import { inject, observer } from 'mobx-react'
import { ServiceHomePreview, HomeArticlesPreview } from './Components'
import { Advantages, Section, ServicePreview, ServiceTextItem } from 'shared/modules/common'

// ICONS
import Camera from 'react-icons/lib/fa/camera'
import Restore from 'react-icons/lib/fa/recycle'
import Souvenir from 'react-icons/lib/fa/gift'

import './Home.sass';

const images = [
  {
    _id: 'asdasdasd',
    original: '/images/1.jpeg',
    thumbnail: '/images/1.jpeg',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    originalAlt: 'I am a featured image',
    thumbnailAlt: 'I am the thumbnail for the featured image',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: '3213123',
    original: '/images/2.jpg',
    thumbnail: '/images/2.jpg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdas3333dasd',
    original: '/images/3.jpeg',
    thumbnail: '/images/3.jpeg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdas31231111dasd',
    original: '/images/4.jpeg',
    thumbnail: '/images/4.jpeg',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    originalAlt: 'I am a featured image',
    thumbnailAlt: 'I am the thumbnail for the featured image',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdas3333123dasd',
    original: '/images/5.jpeg',
    thumbnail: '/images/5.jpeg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdasda435345sd',
    original: '/images/6.jpg',
    thumbnail: '/images/6.jpg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
];

const imagesTestimonials = [
  {
    _id: 'asdasdsfdfdasd',
    original: '/images/7.webp',
    thumbnail: '/images/7.webp',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    originalAlt: 'I am a featured image',
    thumbnailAlt: 'I am the thumbnail for the featured image',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: '321314342423',
    original: '/images/8.webp',
    thumbnail: '/images/8.webp',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas3333dadsfsdsd',
    original: '/images/6.webp',
    thumbnail: '/images/6.webp',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas31231111daasdasd',
    original: '/images/7.webp',
    thumbnail: '/images/7.webp',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    originalAlt: 'I am a featured image',
    thumbnailAlt: 'I am the thumbnail for the featured image',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas3333123dadsadsd',
    original: '/images/8.webp',
    thumbnail: '/images/8.webp',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdasda435345sddsadd',
    original: '/images/7.webp',
    thumbnail: '/images/7.webp',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
];

const mockAdvantages = [
  {
    title: 'Фото печать',
    description: 'Всего в несколько кликов выможете заказ печать фотографий в нашем сервисе.',

    href: '/service/foto-print',
    linkDescription: 'фото печать',
    Icon: Camera,
    createdAt: new Date(),
  },
  {
    title: 'Фото сувениры',
    description: 'У нас Вы можете заказать различные услуги по фотопечати, печать на различных материалах, таких как текстиль, фарфор, керамика и другие.',

    href: '/service/foto-souvenir',
    linkDescription: 'фото сувениры',
    Icon: Souvenir,
    createdAt: new Date(),
  },
  {
    title: 'Восстановление фотографий',
    description: 'Восстановление старых фотографий, устранение царапин, заломов, трещин. Восстановление недостающий частей фотографии.',
    href: '/service/foto-restore',
    linkDescription: 'Восстановление фотографий',
    Icon: Restore,
    createdAt: new Date(),
  }
]

const mockServiceHomePreview = [
  {
    description: 'jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak',
    title: 'Write Down Your Experience',
    href: '/',
    img: '/images/steve.webp',
    alt: 'Write Down Your Experience',
    createdAt: new Date(),
  },
  {
    description: 'jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak',
    title: 'Write Down Your Experience',
    href: '/',
    img: '/images/steve.webp',
    alt: 'Write Down Your Experience',
    createdAt: new Date(),
  },
  {
    description: 'jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak',
    title: 'Write Down Your Experience',
    href: '/',
    img: '/images/steve.webp',
    alt: 'Write Down Your Experience',
    createdAt: new Date(),
  }
]

@inject('execContextStore', 'bannersStore')
@observer
export class Home extends React.Component {
  constructor(props) {
    super(props)

    const { bannersStore: { fetchBanners } } = this.props
    fetchBanners()
  }

    render() {
      const {
        execContextStore: { requestContext: { isMobile } },
        bannersStore: { pendingState, getBanners },
      } = this.props

      const images = getBanners().map(({ path, href }) => ({
        original: path,
        _id: path,
        originalAlt: path.split('/').slice(-1)[0],
        href,
      }))

        return (
            <div className="home">
              <section className="no-padding">
                <Slider
                  images={images}
                  isMobile={isMobile}
                  isDotsVisible={isMobile}
                  isArrowVisible={images.length > 1}
                  loading={pendingState === 'pending'}
                />
              </section>

              <Section
                className="services-home-preview"
                // title={<ServiceHomePreview data={mockServiceHomePreview} />}
              >
                <Advantages data={mockAdvantages} itemClassName="col-lg-4" />
              </Section>

              <Section
                className="testimonials"
                grey
                fluid
                h2="Testimonials"
              >
                <Slider
                  withHero
                  images={imagesTestimonials}
                  isMobile={isMobile}
                  isDotsVisible={isMobile}
                  isArrowVisible={!isMobile}
                />
              </Section>

              <Section
                className="destinations"
                fluid
                h2="Our Destinations"
                h5="Choose Your Next Destination"
              >
                {[...mockServiceHomePreview, ...mockServiceHomePreview].map((item, i) => (
                  <ServicePreview key={item.title} className="col-xs-12" {...item} right={i % 2}/>
                ))}
              </Section>

              <Section
                className="services"
                fluid
                grey
                h2="Our Services"
                h5="We Offer The Following Services"
              >
                {[...mockAdvantages, ...mockAdvantages].map(item => (
                  <ServiceTextItem key={item.title} {...item} className="col-lg-4" />
                ))}
              </Section>

              <HomeArticlesPreview />

            </div>
        );
    };
};