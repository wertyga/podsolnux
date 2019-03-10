import { Link } from 'react-router-dom'
import AngleLeft from 'react-icons/lib/fa/angle-left'
import AngleRight from 'react-icons/lib/fa/angle-right'
import ArrowRight from 'react-icons/lib/fa/arrow-right'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'

import { ButtonLink } from 'shared/modules/common'

import './Slider.sass'

const TEXT = {
  learnMore: 'Узнать больше',
}

export class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.initialImagesLength = this.props.initialImagesLength || 3
    this.state = {
      images: props.images.slice(0, this.initialImagesLength),
      index: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {

    }
  }

  handleDirection = (e) => {
    const { images } = this.props;
    const { images: stateImages } = this.state;
    const isLeft = e.currentTarget.getAttribute('data-direction') === 'left';
    const index = isLeft ? this.state.index - 1 : this.state.index + 1;
    if (index < 0 || index > images.length - 1) return;

    this.setState({
      index,
      images: stateImages.length < images.length ?
        [...this.state.images, images[this.initialImagesLength - 1 + index]] :
        this.state.images,
    })
  }

  render() {
    const { images, index } = this.state;
    const { withHero } = this.props;

    return (
      <div className={cn(
        'slider',
        { 'with-hero': withHero }
      )}>
        <div className="slider__direction slider__direction_left" data-direction="left" onClick={this.handleDirection}>
          {withHero ? <ArrowLeft /> : <AngleLeft />}
        </div>

          <div
            className="slider__wrapper"
            style={{ transform: `translateX(-${index * 100}%)`}}
          >
            {images.map(({original, originalAlt, _id, textBlock}) => {
              const { title, description, href, title: linkTitle, linkText = '' } = textBlock || {};
              const hrefText = withHero ? linkText.split(',') : linkText;
              return (
                <div className="slider__inner">
                  {textBlock &&
                  <div className="slider__text-block">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {withHero ?
                      <div className="slider__text-block_with-hero">
                        <span>&#8212;</span>
                        <em>{` ${hrefText[0].trim()}, `}</em>
                        <Link to={href} title={linkTitle}>
                          {hrefText[1] || TEXT.learnMore}
                        </Link>
                      </div> :
                      <ButtonLink
                        href={href}
                        title={linkText || TEXT.learnMore}
                      />
                    }
                  </div>
                  }
                  <img key={_id} src={original} alt={originalAlt} />
                </div>
              );
            })}
          </div>

        <div className="slider__direction slider__direction_right" data-direction="right" onClick={this.handleDirection}>
          {withHero ? <ArrowRight/> : <AngleRight />}
        </div>
      </div>
    );
  }
}