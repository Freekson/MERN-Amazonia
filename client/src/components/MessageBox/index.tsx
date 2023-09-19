import { Alert } from "react-bootstrap";

interface IMessageBoxProps {
  variant: "info" | string;
  children: React.ReactNode;
}

const MessageBox: React.FC<IMessageBoxProps> = (props) => {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
};

export default MessageBox;
