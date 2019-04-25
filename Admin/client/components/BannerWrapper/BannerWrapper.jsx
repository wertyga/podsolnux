import { inject } from 'mobx-react'

import { Loader } from 'semantic-ui-react'
import { Slider } from 'shared/modules/common/Slider'

const bannersList = {
  mainBanner: {
    images: [
      '',
    ],
    title: 'Title',
    subtitle: 'Subtitle',
    href: '/',
  },
}

@inject('bannersStore')
export class BannerWrapper extends React.Component {
  componentDidMount() {
    const { bannersStore: { fetchBannersCategories } } = this.props;

    fetchBannersCategories();
  }

  render() {
    const { bannersStore: { fetchStatus } } = this.props;
    if (fetchStatus === 'pending') return <Loader active />;

    return (
      <div className="banner-wrapper">
        {Object.entries(bannersList).map(([key, { title, images, subtitle, href } ]) => (
          <div className="banner-wrapper__item" key={key}>
            <h2>{key}</h2>
            <Slider/>
          </div>
        ))}
      </div>
    );
  }
}