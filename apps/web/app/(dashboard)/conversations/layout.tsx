import { ConversationsLayout } from "@/modules/dashboard/ui/layouts/conversations-layout";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";

const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return <ConversationsLayout>{children}</ConversationsLayout>;
};

export default Layout;