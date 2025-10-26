import { useRouter } from 'next/router';
import { GroupsEdit } from '../../views/groups/new-edit';

const UsersEditPage = () => {
    const router = useRouter();

    const lastPart = router.asPath.split("/").filter(f => f.trim().length > 0).pop() || "";
    const isNew = lastPart === "new";
    const groupId = isNew ? 0 : parseInt(lastPart);

    if (!router.isReady) {
        return null;
    }

    return (
        <GroupsEdit groupId={groupId} isNew={isNew} />
    );
}

export default UsersEditPage;