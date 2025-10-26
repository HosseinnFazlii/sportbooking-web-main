import { useRouter } from 'next/router';
import { PageViewComponent } from '../../views/bookings/view';
import { PageNewComponent } from '../../views/bookings/add';

const BookingsEditPage = () => {
    const router = useRouter();

    const lastPart = router.asPath.split('/').filter((segment) => segment.trim().length > 0).pop() || '';
    const isNew = lastPart === 'new';
    const bookingId = isNew ? 0 : Number.parseInt(lastPart, 10);

    if (!router.isReady) {
        return null;
    }

    return (
        <>
            {!isNew && <PageViewComponent id={bookingId} isNew={false} />}
            {isNew && <PageNewComponent id={0} isNew={true} />}
        </>
    );
};

export default BookingsEditPage;
