import { inject, observer } from 'mobx-react'

import { Loader } from 'semantic-ui-react'

import { AddBannerItem } from './AddBannerItem'

@inject('bannersStore')
@observer
export class AddBanner extends React.Component {
  render() {
    const { bannersStore: { fetchStatus, items } } = this.props;

    if (fetchStatus === 'pending') return <Loader active />;

    return (
      <div className="add-banner">
        {items.map(item => (
          <AddBannerItem
            key={item._id}
          />
        ))}
      </div>
    );
  }
}