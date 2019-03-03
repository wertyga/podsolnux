import { Slider } from 'shared/modules/common/Slider'
import { ServiceHomePreview, Advantages } from './Components'

// ICONS
import Camera from 'react-icons/lib/ti/camera-outline'

import './Home.sass';

const images = [
  {
    _id: 'asdasdasd',
    original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
    thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg',
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
    original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
    thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdas3333dasd',
    original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
    thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdas31231111dasd',
    original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
    thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg',
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
    original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
    thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
  {
    _id: 'asdasda435345sd',
    original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
    thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg',
    textBlock: {
      title: 'Never Stop Exploring',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga est inventore ducimus repudiandae.',
      href: '/',
    },
  },
];

const imagesTestimonials = [
  {
    _id: 'asdasdasd',
    original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
    thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg',
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
    _id: '3213123',
    original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
    thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas3333dasd',
    original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
    thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdas31231111dasd',
    original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
    thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg',
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
    _id: 'asdas3333123dasd',
    original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
    thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg',
    textBlock: {
      description: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique dolorem quisquam laudantium, incidunt id laborum, tempora aliquid labore minus. Nemo maxime, veniam! Fugiat odio nam eveniet ipsam atque, corrupti porro”',
      href: '/',
      linkText: 'James Martin, Traveler'
    },
  },
  {
    _id: 'asdasda435345sd',
    original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
    thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg',
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

export class Home extends React.Component {
    render() {
        return (
            <div className="home">
              <section className="no-padding">
                <Slider images={images} />
              </section>

              <section className="services-home-preview">
                <div className="container">
                  <div className="row">
                    <ServiceHomePreview data={mockServiceHomePreview} itemClassName="col-lg-4 col-xs-12 col-sm-12"/>
                  </div>

                  <div className="row">
                    <Advantages data={mockAdvantages} itemClassName="col-lg-4" />
                  </div>
                </div>
              </section>

              <section className="grey testimonials fluid">
                <div className="container">
                  <h2 className="row">Testimonials</h2>
                  <div className="row">
                    <Slider
                      withHero
                      images={imagesTestimonials}
                    />
                  </div>
                </div>
              </section>


            </div>
        );
    };
};