import { Link, withRouter } from 'react-router-dom'
import AngleLeft from 'react-icons/lib/fa/angle-left'
import AngleRight from 'react-icons/lib/fa/angle-right'
import ArrowRight from 'react-icons/lib/fa/arrow-right'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'

import _get from 'lodash/get'
import noop from 'lodash/noop'

import { ButtonLink, Loader } from 'shared/modules/common'
import { Dots } from './Dots'

import './Slider.sass'

const TEXT = {
  learnMore: 'Узнать больше',
}

@withRouter
export class Slider extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      original: PropTypes.string, // Href
      originalAlt: PropTypes.string,
      _id: PropTypes.string,
      textBlock: PropTypes.any,
    })),
    initialImagesLength: PropTypes.number,
    withHero: PropTypes.bool,
    isMobile: PropTypes.bool,
    isArrowVisible: PropTypes.bool,
    isDotsVisible: PropTypes.bool,
    loading: PropTypes.bool,
    simple: PropTypes.bool,

  }
  static defaultProps = {
    images: [],
    initialImagesLength: 3,
    isArrowVisible: true,
  }

  constructor(props) {
    super(props)

    this.initialImagesLength = this.props.initialImagesLength
    this.state = {
      images: props.images.slice(0, this.initialImagesLength),
      index: 0,
      distanceMove: 0,
    }
    this.mainRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.images.length !== prevProps.images.length) {
      this.setState({ images: this.props.images.slice(0, this.initialImagesLength) })
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

  onMouseDown = (e) => {
    const { clientX, target, touches } = e;
    const isArrows = target.getAttribute('data-direction') || target.parentElement.getAttribute('data-direction');
    const ref = this.mainRef.current;
    if (!ref || isArrows) return;
    const { isMobile } = this.props;

    this.startPosition = clientX || _get(touches, '[0].clientX', 0);
    if (!isMobile) ref.addEventListener('mousemove', this.onMouseMove)
  }
  onMouseUp = () => {
    if (this.href) return this.linkUp()

    const ref = this.mainRef.current;
    if (!ref || !this.startPosition) return;
    const { distanceMove, index } = this.state;
    const percentMove = Math.abs(distanceMove) / (window.innerWidth / 100);
    const newIndex = distanceMove > 0 ? index - 1 : index + 1;
    const { images } = this.props;

    if (newIndex < 0 || newIndex > images.length - 1 || percentMove < 10) {
      this.setState({ index, distanceMove: 0 });
    } else {
      const { images } = this.props;
      const newIndex = distanceMove > 0 ? index - 1 : index + 1;
      this.setState({
        distanceMove: 0,
        images: this.state.images.length < images.length ?
          [...this.state.images, images[this.initialImagesLength - 1 + newIndex]] :
          this.state.images,
      }, () => this.setState({ index: newIndex }));
    }
    if (!this.props.isMobile) ref.removeEventListener('mousemove', this.onMouseMove)
  }
  onMouseMove = (e) => {
    const { clientX, touches } = e
    // const { width } = this.mainRef.current.getBoundingClientRect()

    const xPosition = clientX || _get(touches, '[0].clientX', 0)
    const distanceMove = -(this.startPosition - xPosition)
    // if (clientX > width) return this.setState({ distanceMove })
    this.setState({ distanceMove })
  }

  mouseEvents = () => {
    const { isMobile } = this.props;

    if (isMobile) {
      return {
        onTouchStart: this.onMouseDown,
        onTouchEnd: this.onMouseUp,
        onTouchMove: this.onMouseMove,
      };
    } else {
      return {
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
      }
    }
  }

  redirect = (href) => {
    const { history } = this.props

    if (href) history.push(href)
  }

  render() {
    const { images, index, distanceMove } = this.state;
    const { withHero, isArrowVisible, images: propsImages, isDotsVisible, loading, simple } = this.props;

    if (!images.length && !loading) return <div className="slider" />;

    const refWidth = _get(this.mainRef, 'current.offsetWidth', 0);

    const translate = `${distanceMove !== 0 ? Math.round(-index * refWidth + distanceMove) : Math.round(-index * refWidth)}px`;

    return (
      <div
        className={cn(
          'slider',
          { 'with-hero': withHero },
        )}
        ref={this.mainRef}
        {...this.mouseEvents()}
      >
        {isArrowVisible &&
          <div className="slider__direction slider__direction_left" data-direction="left" onClick={this.handleDirection}>
            {withHero ? <ArrowLeft /> : <AngleLeft />}
          </div>
        }
        {loading && <Loader />}
          <div
            className={cn(
              'slider__wrapper',
              { isMoving: distanceMove !== 0 },
            )}
            style={{ transform: `translateX(${translate})`}}
          >
            {images.map(({ original, originalAlt, _id, textBlock, href }) => {
              const { title, description, href: buttonHref, title: linkTitle, linkText = '' } = textBlock || {};
              const hrefText = withHero ? linkText.split(',') : linkText;
              return (
                <div
                  className="slider__inner"
                  key={_id}
                >
                  {textBlock &&
                    <div className="slider__text-block">
                      <h2>{title}</h2>
                      <p>{description}</p>
                      {withHero ?
                        <div className="slider__text-block_with-hero">
                          <span>&#8212;</span>
                          <em>{` ${hrefText[0].trim()}, `}</em>
                          <Link to={buttonHref} title={linkTitle}>
                            {hrefText[1] || TEXT.learnMore}
                          </Link>
                        </div> :
                        <ButtonLink
                          href={buttonHref}
                          title={linkText || TEXT.learnMore}
                        />
                      }
                    </div>
                  }

                  {!!href && <Link to={href} className="btn accent slider-link">{TEXT.learnMore}</Link>}
                  <img key={_id} src={original} alt={originalAlt} draggable={false} onDragStart={function(e) { e.preventDefault(); return false; }} />

                </div>
              );
            })}
          </div>
          {isArrowVisible &&
            <div className="slider__direction slider__direction_right" data-direction="right"
                 onClick={this.handleDirection}>
              {withHero ? <ArrowRight/> : <AngleRight />}
            </div>
          }

        {isDotsVisible && <Dots count={propsImages.length} index={index} />}
      </div>
    );
  }
}