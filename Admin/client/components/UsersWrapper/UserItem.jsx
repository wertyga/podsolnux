import { List, Grid } from 'semantic-ui-react'

export class UserItem extends React.Component {
  render() {
    const { className, orders, email, isSubscribed, username, verified, _id } = this.props;
    const datas = { _id, email, isSubscribed, username, verified };

    return (
      <List.Item className={className}>
        <h2>{username || 'No username'}</h2>
        <Grid>
          {Object.entries(datas).map(([key, value]) => (
            <Grid.Row key={key}>
              <Grid.Column width={3}>{`${key.toUpperCase()}:`}</Grid.Column>
              <Grid.Column width={4}>{String(value)}</Grid.Column>
            </Grid.Row>
          ))}
          <Grid.Row>
            <Grid.Column width={3}>ORDERS:</Grid.Column>
            <Grid.Column width={4}>
              <List>
                {!orders.length && <List.Item>Empty list</List.Item>}
                {orders.map(item => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Item>
    );
  }
}