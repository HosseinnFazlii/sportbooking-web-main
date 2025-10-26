// libs/core-ui/src/components/organisms/micro-app/micro-app.tsx
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorPage } from '../../pages';
import { DynamicFederation } from './dynamic-federation';

interface MicroAppProps {
  scope: string;
  module: string;
  requestPath: string;
}

const MicroAppComponent: FC<MicroAppProps> = ({ scope, module, requestPath }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  // const dynamicFederation = useMemo(() => DynamicFederation.getInstance(), []);

  const fetchComponent = useCallback(async () => {
    const remoteComponent = await DynamicFederation.getInstance().loadRemoteModule(scope, module);

    if (remoteComponent !== Component) {
      await setComponent(remoteComponent);
    }
  }, [scope, module, Component]);

  useEffect(() => {
    if (error !== null) {
      setError(null);
    }

    fetchComponent()
      .catch((error: Error) => {
        console.error(error);
        setError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, module]);

  if (error) {
    return <ErrorPage code={404} message={error.message} />;
  }

  if (!Component) {
    return null;
  }

  return <Component key={`Page_${requestPath}`} />;
};
export const MicroApp = React.memo(MicroAppComponent);