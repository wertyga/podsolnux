import { inject, observer } from 'mobx-react'

import { Input, Button } from 'semantic-ui-react'

import { AddBannerItem } from './AddBannerItem'

@inject('bannersStore')
export class AddBanner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  componentDidUpdate(prevProps) {
    const thisPending = this.props.bannersStore.pendingState
    const prevPending = prevProps.bannersStore.pendingState
    if ((thisPending !== prevPending) && thisPending === 'fulfilled') {
      this.setState({ value: '' })
    }
  }

  onChange = ({ target: { value } }) => this.setState({ value })

  onSubmit = async (e) => {
    e.preventDefault()
    const { value, } = this.state
    const { bannersStore: { addCategory } } = this.props
    if (!value) return;

    await addCategory(value)
  }

  render() {
    const { value } = this.state
    // const { bannersStore: { pendingItemState, items } } = this.props;

    // if (fetchStatus === 'pending') return <Loader active />;

    return (
      <div className="add-banner">
        <h4>Add banner category</h4>

        <form className="add-banner__content" onSubmit={this.onSubmit}>
          <Input
            label="Type category name"
            placeholder="Category name..."
            value={value}
            onChange={this.onChange}
          />
          <Button type="submit" color="green">Add</Button>
        </form>
      </div>
    );
  }
}