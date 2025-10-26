// apps/main/src/pages/[[...all]].tsx
import { MicroApp, publicRoutes, useAuth } from '@mf-core/core-ui';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BaseLayout } from '../layouts/base-layout';
import { NextPage } from 'next';
import Home from './home';

const allPossibleRoutes: string[] = [
  "",
];

export const getStaticPaths = async () => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      paths: [],
      fallback: true
    };
  }
  return {
    paths: allPossibleRoutes.map(route => ({ params: { all: route.split('/') } })),
    fallback: false, // or 'blocking' if you want to generate on-demand
  };
};

export const getStaticProps = async ({ params }: { params?: { all?: string[] } }) => {
  if (process.env.NODE_ENV !== 'production') {
    return { props: {} };
  }

  const scope = params && params.all && params.all[0] ? params.all[0] : 'main';
  const moduleName = params && params.all && params.all.length > 1 ? `/${params.all.slice(1).join('/')}` : '/home';

  return {
    props: {
      initialScope: scope,
      initialModuleName: moduleName
    }
  };
};

const AllRoutes: NextPage = () => {
  const { user, loading: isUserLoading } = useAuth();
  const { isReady, asPath, push } = useRouter();

  const normalizedPath = `/${asPath}`.replace(/\/\//g, '/');
  const pathSegments = normalizedPath.split('/');

  const scope = pathSegments[1] || "main";
  const moduleName =
    pathSegments.length > 2 ? `/${pathSegments.slice(2).join('/')}` : "/home";

  useEffect(() => {
    if (isReady) {
      if (!publicRoutes.includes(normalizedPath) && (!user || !user.id) && !isUserLoading) {
        push("/auth/login");
      }
    }
  }, [isReady, isUserLoading, normalizedPath, push, user]);

  if (!isReady || (!publicRoutes.includes(normalizedPath) && (!user || !user.id))) {
    return null;
  }

  if (normalizedPath === "/" || normalizedPath === "/home" || normalizedPath === "/main/home") {
    return (<Home />);
  }

  const microApp = <MicroApp key="micro-app" scope={scope} module={moduleName} requestPath={normalizedPath} />;

  if (publicRoutes.includes(normalizedPath)) {
    return microApp;
  }

  return (
    <BaseLayout key="AllRoutes">
      {microApp}
    </BaseLayout>
  );
}

export default React.memo(AllRoutes);