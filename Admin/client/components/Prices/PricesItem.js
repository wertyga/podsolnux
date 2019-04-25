import cn from 'classnames'
import { List, Segment } from 'semantic-ui-react'

import { ChangableInputWrapper } from 'shared/modules/common/ChangableInputWrapper'

export class PricesItem extends React.Component {
  static propTypes = {
    editPrice: PropTypes.func,
    deletePrice: PropTypes.func,
  }

  state = {
    isOpen: false,
  }

  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onConfirm = async (id, data) => {
    const { editPrice } = this.props;

    try {
      await editPrice(id, data)
    } catch (e) {
      throw (e)
    }
  }

  onDelete = async (id) => {
    try {
      await this.props.deletePrice(id)
    } catch (e) {
      throw e;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { title, list } = this.props;

    return (
      <Segment>
        <h3
          onClick={this.handleOpen}
        >
          {title}
        </h3>
        <List
          divided
          className={cn(
            'prices-wrapper__inner-list',
            { show: isOpen }
          )}
        >
          {list.map(({ name, value, _id }) => (
            <List.Item
              className="prices-wrapper__inner-list__item"
              key={_id}
            >
              <ChangableInputWrapper
                values={[
                  {
                    name: 'articleName',
                    value: name,
                  },
                  {
                    name: 'value',
                    value,
                  }
                ]}
                onConfirm={(data) => this.onConfirm(_id, data)}
                onDelete={() => this.onDelete(_id)}
              />
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }
}