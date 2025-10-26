import { useRouter } from 'next/router';
import { CompaniesEdit } from '../../views/companies/new-edit';

const CompaniesEditPage = () => {
    const router = useRouter();

    const lastPart = router.asPath.split("/").filter(f => f.trim().length > 0).pop() || "";
    const isNew = lastPart === "new";
    const companyId = isNew ? 0 : parseInt(lastPart);

    if (!router.isReady) {
        return null;
    }

    return (
        <CompaniesEdit companyId={companyId} isNew={isNew} />
    );
}

export default CompaniesEditPage;