import { useRouter } from 'next/router';
import { UsersEdit } from '../../views/users/new-edit';

const UsersEditPage = () => {
    const router = useRouter();

    const lastPart = router.asPath.split("/").filter(f => f.trim().length > 0).pop() || "";
    const isNew = lastPart === "new";
    const userId = isNew ? 0 : parseInt(lastPart);

    if (!router.isReady) {
        return null;
    }

    return (
        <UsersEdit userId={userId} isNew={isNew} />
    );
}

export default UsersEditPage;