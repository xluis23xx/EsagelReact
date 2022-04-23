export const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookieValue ? cookieValue[2] : null;
};

export const setCookie = (
  name: string,
  value: string,
  days?: number,
  domain?: string,

): void => {
    let expires = "";
    if (days) {
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `;expires=${expireDate.toUTCString()}`;
    }

    const domainValue = domain ? `;domain=${domain}` : "";

    document.cookie = `${name}=${
      typeof value === "string" ? value : JSON.stringify(value)
    };path=/;secure;${domainValue}${expires}`;
  
};

export const deleteCookie = (
  name: string,
  domain?: string
): ReturnType<typeof setCookie> => {
  setCookie(name, "", -1, domain);
};
