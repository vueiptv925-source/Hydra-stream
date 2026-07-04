import { providers, buildUrl } from './providers.js';

export const getStreams = async (params) => {
  return providers.map((provider) => ({
    id: provider.id,
    label: provider.label,
    url: buildUrl(provider, params),
    status: 'ready'
  }));
};
