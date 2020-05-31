const isDev = process.env.NODE_ENV === 'development'? 'http://praktikum.tk/cohort9/' : 'https://praktikum.tk/cohort9/';
export const config = {
    baseUrl: isDev,
    token: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88'
};
