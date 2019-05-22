import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Loader, List, Message, Button } from 'semantic-ui-react'

import { AddBanner } from './AddBanner'

import './banners.sass'

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
@observer
export class BannerWrapper extends React.Component {
  static propTypes = {
    bannersStore: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    props.bannersStore.fetchCategories()
  }

  deleteCategory = slug => () => this.props.bannersStore.deleteCategory(slug)


  render() {
    const { bannersStore: { pendingState, bannerCategories, error } } = this.props;

    if (pendingState === 'pending') return <Loader active>Loading...</Loader>;

    return (
      <List className="banner-wrapper">
        <AddBanner />

        {error && <Message error content={error.message} />}

        {bannerCategories.map(({ slug, count }) => (
          <List.Item key={slug} className="banner-wrapper__category">
            <Link to={`/banners/${slug}`}>
              <span>{slug}</span>
              <span>{`(${count})`}</span>
            </Link>
            <Button color="red" onClick={this.deleteCategory(slug)}>X</Button>
          </List.Item>
        ))}
      </List>
    );
  }
}