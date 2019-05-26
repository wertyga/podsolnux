import { Slider } from 'shared/modules/common/Slider'
import { inject, observer } from 'mobx-react'
import { ServiceHomePreview, HomeArticlesPreview } from './Components'
import { Advantages, Section, ServicePreview, ServiceTextItem } from 'shared/modules/common'

// ICONS
import Camera from 'react-icons/lib/ti/camera-outline'

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
    original: '/images/7.jpg',
    thumbnail: '/images/7.jpg',
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
    original: '/images/8.jpg',
    thumbnail: '/images/8.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas3333dadsfsdsd',
    original: '/images/6.jpg',
    thumbnail: '/images/6.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas31231111daasdasd',
    original: '/images/7.jpg',
    thumbnail: '/images/7.jpg',
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
    original: '/images/8.jpg',
    thumbnail: '/images/8.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdasda435345sddsadd',
    original: '/images/7.jpg',
    thumbnail: '/images/7.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
];

const mockAdvantages = [
  {
    title: 'Air Ticketing',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.',

    href: '/',
    linkDescription: 'Air Ticketing',
    Icon: Camera,
  },
  {
    title: 'Air Ticketing',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.',

    href: '/',
    linkDescription: 'Air Ticketing',
    Icon: Camera,
  },
  {
    title: 'Air Ticketing',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quis molestiae vitae eligendi at.',
    href: '/',
    linkDescription: 'Air Ticketing',
    Icon: Camera,
  }
]

const mockServiceHomePreview = [
  {
    // description: 'jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak',
    title: 'Write Down Your Experience',
    href: '/',
    img: '/images/steve.jpg',
    alt: 'Write Down Your Experience',
  },
  {
    // description: 'jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak',
    title: 'Write Down Your Experience',
    href: '/',
    img: '/images/steve.jpg',
    alt: 'Write Down Your Experience',
  },
  {
    // description: 'jkashdkjh kjdshash kjhkh hjas kjasjkdkaskjhd kashd kasdkjakjsdkkjh ak',
    title: 'Write Down Your Experience',
    href: '/',
    img: '/images/steve.jpg',
    alt: 'Write Down Your Experience',
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
                title={<ServiceHomePreview data={mockServiceHomePreview} />}
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
                {[...mockServiceHomePreview, ...mockServiceHomePreview].map(item => (
                  <ServicePreview key={item.title} className="col-lg-4 col-xs-12 col-sm-12" {...item} />
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