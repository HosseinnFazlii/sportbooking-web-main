import { useRouter } from 'next/router';
import { TicketTemplatesEdit } from '../../views/templates/new-edit';

const TicketTemplatesEditPage = () => {
    const router = useRouter();

    const lastPart = router.asPath.split("/").filter(f => f.trim().length > 0).pop() || "";
    const isNew = lastPart === "new";
    const templateId = isNew ? 0 : parseInt(lastPart);

    if (!router.isReady) {
        return null;
    }

    return (
        <TicketTemplatesEdit templateId={templateId} isNew={isNew} />
    );
}

export default TicketTemplatesEditPage;