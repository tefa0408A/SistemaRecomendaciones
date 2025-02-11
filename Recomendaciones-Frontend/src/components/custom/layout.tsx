import { withLayout } from "../../HOC/withLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Root = ({ children }: Props) => {
  return <>{children}</>;
};

const RootLayout = withLayout(Root);

export default RootLayout;
