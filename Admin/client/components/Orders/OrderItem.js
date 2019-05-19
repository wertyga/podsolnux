import { List, Segment, Button } from 'semantic-ui-react'

export const OrderItem = ({ orderNumber, createdAt, comment, phone, files, totalPrice, user, deleteOrder }) => {
  const download = () => {
    window.location.href = `api/order/${orderNumber}`
  }
  return (
    <Segment>
      <List.List className="orders__item">
        <List.Item>
          <span>Order number:</span>
          <span>{orderNumber}</span>
        </List.Item>
        <List.Item>
          <span>Date:</span>
          <span>{createdAt}</span>
        </List.Item>
        <List.Item>
          <span>Phone:</span>
          <span>{phone}</span>
        </List.Item>
        <List.Item>
          <span>User:</span>
          <span>{user}</span>
        </List.Item>
        <List.Item>
          <span>Comment:</span>
          <span>{comment}</span>
        </List.Item>
        <List.Item>
          <span>Files:</span>
          <span className="orders__item__files">{Object.entries(files).map(([format, amount]) => <span key={format}>{`${format}: ${amount} шт.;`}</span>)}</span>
        </List.Item>

        <List.Item>
          <span className="orders__item__total-price">Total Price:</span>
          <span>{totalPrice}</span>
        </List.Item>
      </List.List>

      <div className="orders__item__buttons">
        <Button onClick={download} color="green">Download</Button>
        <Button onClick={() => deleteOrder(orderNumber)} color="red">Delete order</Button>
      </div>
    </Segment>
  );
}