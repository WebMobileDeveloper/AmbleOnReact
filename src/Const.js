export const DEV_ENV = false;
export const DEV_DEVICE = false;
export const DEV_HOST_ADDRESS = 'http://192.168.1.114:3000';
// export const PROD_HOST_ADDRESS = 'http://ec2-3-14-143-176.us-east-2.compute.amazonaws.com:3000';
export const PROD_HOST_ADDRESS = 'http://ec2-18-221-40-16.us-east-2.compute.amazonaws.com:3000';
export const HOST_ADDRESS = DEV_ENV ? DEV_HOST_ADDRESS : PROD_HOST_ADDRESS;
export const DEV_LAT = 33.77969214331703
export const DEV_LONG = 84.37278885394335
export const DEV_USER_ID = "f1d06b27-5db7-4a84-81ac-fe38589da1be";
export const DEV_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMWQwNmIyNy01ZGI3LTRhODQtODFhYy1mZTM4NTg5ZGExYmUiLCJpYXQiOjE1NTk1ODcxMjN9.fExz8NMdA1TyCJi5Vc-m02ov_6xLK4jf7xZO8y_JA_Q";

export const pad = (num) => {
    return ('0' + num).slice(-2);
};
export const mmss = (secs) => {
    secs = Math.round(secs);
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;
    minutes = minutes % 60;
    // minutes = ('0' + minutes).slice(-2);
    // secs = ('0' + secs).slice(-2);
    return pad(minutes) + ':' + pad(secs);
}

export const mmssss = (milisecs) => {
    const secs = Math.floor(milisecs / 1000);
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    const miliseconds = Math.floor((milisecs % 1000) / 10);
    return pad(minutes) + ':' + pad(seconds) + ':' + pad(miliseconds);
};