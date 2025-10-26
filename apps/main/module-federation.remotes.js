const remotePorts = process.env.REMOTE_PORTS || "auth:*,sportbooking:*,management:*";
const domainURL = process.env.DOMAIN_URL || "/";

const getRemoteAppsAsObject = (isServer) => {
    const location = isServer ? 'ssr' : 'chunks';
    const remoteDelegates = {};

    remotePorts.split(",").forEach(remotePort => {
        const [scope, port] = remotePort.split(":");
        if (domainURL && port === "*") {
            remoteDelegates[scope] = `/apps/${scope}/_next/static/${location}/remoteEntry.js`;
        } else {
            remoteDelegates[scope] = `${scope}@${domainURL}:${port}/_next/static/${location}/remoteEntry.js`;
        }
    });
    return remoteDelegates;
};

const getRemoteApps = (isServer) => {
    const location = isServer ? 'ssr' : 'chunks';

    return remotePorts.split(",").map(remotePort => {
        const [scope, port] = remotePort.split(":");
        return {
            name: scope,
            url: (domainURL && port === "*") ? `/apps/${scope}/_next/static/${location}/remoteEntry.js` : `${domainURL}:${port}/_next/static/${location}/remoteEntry.js`
        }
    });
}

const remoteApps = getRemoteApps(false);

module.exports = {
    remotePorts,
    domainURL,
    getRemoteAppsAsObject,
    getRemoteApps,
    remoteApps
};