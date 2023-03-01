export enum PROVIDER {
    BACKBLAZE = 'backblaze',
    BUNNY = 'bunny',
    SCALEWAY = 'scaleway',
    VULTR = 'vultr'
};

export enum COLOR {
    BACKBLAZE = 'red',
    BUNNY = 'orange',
    SCALEWAY = 'purple',
    VULTR = 'blue',
    NO_COLOR = 'grey'
};

export const PROVIDERS_COLOROS = {
    [PROVIDER.BACKBLAZE]: COLOR.BACKBLAZE,
    [PROVIDER.BUNNY]: COLOR.BUNNY,
    [PROVIDER.SCALEWAY]: COLOR.SCALEWAY,
    [PROVIDER.VULTR]: COLOR.VULTR
}
