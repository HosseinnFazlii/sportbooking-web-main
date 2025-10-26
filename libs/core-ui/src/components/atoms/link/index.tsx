import { CSSProperties, HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy, ReactNode, forwardRef, useCallback } from 'react';
import { useRouter } from 'next/router';

export interface ILink {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    children: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    download?: any;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    style?: CSSProperties;
    className?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Link = forwardRef<HTMLAnchorElement, ILink>(({
    href,
    replace = false,
    shallow = false,
    onClick,
    children,
    className,
    ...otherProps
}, ref) => {
    const router = useRouter();

    const handleClick = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
        try {
            if (onClick) {
                await onClick(e);
            }

            if (e.isDefaultPrevented()) {
                e.preventDefault();
                return;
            }
            e.preventDefault();

            // console.log("handleClick", href);
            if (replace) {
                router.replace(href, undefined, { shallow });
            } else {
                router.push(href, undefined, { shallow });
            }
        } catch (err) {
            console.error("Error in Link's handleClick:", err);
        }
    }, [href, onClick, replace, router, shallow]);

    return (<a ref={ref} className={`core-ui-link ${className}`} href={href} onClick={handleClick} {...otherProps}>{children}</a>);
});